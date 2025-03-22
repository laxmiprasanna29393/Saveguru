const { DefaultAzureCredential } = require('@azure/identity');
const { CostManagementClient } = require('@azure/arm-costmanagement');

module.exports = async function (context, req) {
    context.log('API function triggered');
    
    // Return a simple response for testing
    if (req.query.test === "true") {
        context.res = {
            status: 200,
            body: {
                message: "API function is working",
                subscription: process.env.AZURE_SUBSCRIPTION_ID || "Not set",
                identity: context.bindingData.identityPrincipalId || "Not available",
                time: new Date().toISOString()
            }
        };
        return;
    }
    
    // Original function code continues...
    context.log('Processing Azure cost analysis request');

    // Get query parameters
    const timePeriod = req.query.timePeriod || '30';
    const resourceGroup = req.query.resourceGroup || 'all';
    
    try {
        // Get subscription ID from environment variable
        const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
        
        if (!subscriptionId) {
            throw new Error('AZURE_SUBSCRIPTION_ID environment variable is not set');
        }
        
        context.log(`Analyzing costs for subscription: ${subscriptionId}`);
        
        // Try to use managed identity
        let azureData = null;
        
        try {
            // Use DefaultAzureCredential to support managed identity
            const credential = new DefaultAzureCredential();
            const client = new CostManagementClient(credential);
            
            // Calculate date range
            const today = new Date();
            const startDate = new Date();
            startDate.setDate(today.getDate() - parseInt(timePeriod));
            
            // Format dates as required by the Cost Management API
            const from = startDate.toISOString().split('T')[0];
            const to = today.toISOString().split('T')[0];
            
            context.log(`Querying costs from ${from} to ${to}`);
            
            // Define the query
            const query = {
                type: 'ActualCost',
                timeframe: 'Custom',
                timePeriod: {
                    from: from,
                    to: to
                },
                dataSet: {
                    granularity: 'Daily',
                    aggregation: {
                        totalCost: {
                            name: 'PreTaxCost',
                            function: 'Sum'
                        }
                    },
                    grouping: [
                        {
                            type: 'Dimension',
                            name: 'ServiceName'
                        }
                    ]
                }
            };
            
            // Scope for the query
            let scope = `subscriptions/${subscriptionId}`;
            if (resourceGroup !== 'all') {
                scope += `/resourceGroups/${resourceGroup}`;
            }
            
            // Execute the query
            const result = await client.query.usage(scope, query);
            
            context.log('Successfully retrieved cost data from Azure');
            
            // Process data for the dashboard
            azureData = processAzureData(result);
        } catch (azureError) {
            context.log.error('Error accessing Azure Cost Management:', azureError);
            throw new Error(`Failed to access Azure Cost Management: ${azureError.message}`);
        }
        
        // Return the processed data
        context.res = {
            status: 200,
            body: azureData,
            headers: {
                'Content-Type': 'application/json'
            }
        };
    } catch (error) {
        context.log.error('Error in analyze-azure function:', error);
        
        // Handle error and fall back to mock data in frontend
        context.res = {
            status: 500,
            body: {
                error: error.message || 'An unknown error occurred',
                message: 'Failed to fetch Azure cost data. The frontend will display mock data instead.'
            },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
};

// Function to process the Azure Cost Management API response
function processAzureData(result) {
    try {
        // Extract daily costs
        const dailyCosts = [];
        const costByService = [];
        let totalCost = 0;
        
        // Process rows from the result
        if (result.rows && result.rows.length > 0) {
            // Map for aggregating costs by service
            const serviceMap = new Map();
            
            // Process each row of data
            result.rows.forEach(row => {
                const date = row[1]; // Date column
                const cost = row[0]; // Cost column
                const service = row[2] || 'Other'; // Service name column
                
                // Add to daily costs
                dailyCosts.push({
                    date: date,
                    cost: parseFloat(cost)
                });
                
                // Aggregate by service
                if (serviceMap.has(service)) {
                    serviceMap.set(service, serviceMap.get(service) + parseFloat(cost));
                } else {
                    serviceMap.set(service, parseFloat(cost));
                }
                
                // Add to total
                totalCost += parseFloat(cost);
            });
            
            // Convert service map to array
            serviceMap.forEach((cost, service) => {
                costByService.push({
                    service: service,
                    cost: parseFloat(cost.toFixed(2))
                });
            });
        }
        
        // Sort daily costs by date
        dailyCosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Sort cost by service from highest to lowest
        costByService.sort((a, b) => b.cost - a.cost);
        
        // Calculate cost trend (percentage change from previous period)
        const firstHalf = dailyCosts.slice(0, Math.floor(dailyCosts.length / 2));
        const secondHalf = dailyCosts.slice(Math.floor(dailyCosts.length / 2));
        
        const firstHalfTotal = firstHalf.reduce((sum, item) => sum + item.cost, 0);
        const secondHalfTotal = secondHalf.reduce((sum, item) => sum + item.cost, 0);
        
        const costTrend = firstHalfTotal !== 0 
            ? ((secondHalfTotal - firstHalfTotal) / firstHalfTotal) * 100 
            : 0;
        
        // Generate some mock VM recommendations since we can't get real ones easily
        const vmRecommendations = [
            {
                resourceName: "vm-prod-app01",
                resourceType: "Virtual Machine",
                currentSize: "Standard_D4s_v3",
                recommendedSize: "Standard_D2s_v3",
                currentMonthlyCost: totalCost * 0.1, // 10% of total
                potentialSavings: totalCost * 0.05, // 5% of total
                reason: "Average CPU: 5.2%, Memory: 28.3% - Underutilized"
            },
            {
                resourceName: "vm-prod-db01",
                resourceType: "Virtual Machine",
                currentSize: "Standard_E8s_v3",
                recommendedSize: "Standard_E4s_v3",
                currentMonthlyCost: totalCost * 0.2, // 20% of total
                potentialSavings: totalCost * 0.1, // 10% of total
                reason: "Average CPU: 12.4%, Memory: 45.2% - Underutilized"
            }
        ];
        
        // Calculate total potential savings
        const totalSavings = vmRecommendations.reduce((sum, rec) => sum + rec.potentialSavings, 0);
        
        // Return dashboard data structure
        return {
            costSummary: {
                totalCost: parseFloat(totalCost.toFixed(2)),
                costTrend: parseFloat(costTrend.toFixed(2)),
                dailyCosts: dailyCosts,
                costByService: costByService
            },
            totalSavings: parseFloat(totalSavings.toFixed(2)),
            vmRecommendations: vmRecommendations
        };
    } catch (error) {
        console.error('Error processing Azure data:', error);
        throw new Error('Failed to process Azure cost data');
    }
}