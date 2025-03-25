const { DefaultAzureCredential } = require('@azure/identity');
const { CostManagementClient } = require('@azure/arm-costmanagement');

module.exports = async function (context, req) {
    context.log('Azure API call test function triggered');
    
    let result = {
        steps: {
            credentialCreation: 'Not attempted',
            clientCreation: 'Not attempted',
            queryPreparation: 'Not attempted',
            apiCall: 'Not attempted'
        },
        subscriptionId: process.env.AZURE_SUBSCRIPTION_ID ? 'Available' : 'Missing',
        error: null,
        data: null
    };
    
    try {
        // Step 1: Create credential
        result.steps.credentialCreation = 'Attempting...';
        const credential = new DefaultAzureCredential();
        result.steps.credentialCreation = 'Success';
        
        // Step 2: Create client
        result.steps.clientCreation = 'Attempting...';
        const client = new CostManagementClient(credential);
        result.steps.clientCreation = 'Success';
        
        // Step 3: Prepare a simple query
        result.steps.queryPreparation = 'Attempting...';
        const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
        const scope = `subscriptions/${subscriptionId}`;
        
        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - 30);
        
        const query = {
            type: 'ActualCost',
            timeframe: 'Custom',
            timePeriod: {
                from: startDate.toISOString().split('T')[0],
                to: today.toISOString().split('T')[0]
            },
            dataSet: {
                granularity: 'None',
                aggregation: {
                    totalCost: {
                        name: 'PreTaxCost',
                        function: 'Sum'
                    }
                }
            }
        };
        result.steps.queryPreparation = 'Success';
        
        // Step 4: Make the API call
        result.steps.apiCall = 'Attempting...';
        const response = await client.query.usage(scope, query);
        result.steps.apiCall = 'Success';
        
        // Step 5: Process the response
        result.data = {
            columns: response.columns,
            rows: response.rows
        };
    } catch (error) {
        result.error = {
            message: error.message,
            name: error.name,
            code: error.code,
            statusCode: error.statusCode,
            details: error.details
        };
    }
    
    context.res = {
        status: 200,
        body: result
    };
};