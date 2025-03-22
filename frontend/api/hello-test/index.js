module.exports = async function (context, req) {
    context.log('Simple test function triggered');
    
    const name = req.query.name || 'World';
    
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: {
            message: Hello, \! This is a test function for SAVEGURU.,
            timestamp: new Date().toISOString(),
            query: req.query,
            env: {
                hasSubscriptionId: process.env.AZURE_SUBSCRIPTION_ID ? 'Yes' : 'No'
            }
        }
    };
};
