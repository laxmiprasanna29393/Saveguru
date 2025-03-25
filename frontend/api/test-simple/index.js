module.exports = async function (context, req) {
    context.log('Simple test function triggered');
    
    // Return environment variable info (but mask the actual value)
    const hasSubscriptionId = process.env.AZURE_SUBSCRIPTION_ID ? 'Yes' : 'No';
    
    context.res = {
        status: 200,
        body: {
            message: "This is a simple test function",
            environmentVariables: {
                hasAzureSubscriptionId: hasSubscriptionId
            },
            requestInfo: {
                method: req.method,
                query: req.query,
                timestamp: new Date().toISOString()
            }
        }
    };
};