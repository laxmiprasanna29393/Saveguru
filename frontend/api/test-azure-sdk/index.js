const { DefaultAzureCredential } = require('@azure/identity');
const { CostManagementClient } = require('@azure/arm-costmanagement');

module.exports = async function (context, req) {
    context.log('Azure SDK test function triggered');
    
    let result = {
        subscriptionId: 'Using: ' + (process.env.AZURE_SUBSCRIPTION_ID ? 'Yes' : 'No'),
        sdkInitialization: 'Not attempted',
        credentialCreation: 'Not attempted',
        clientCreation: 'Not attempted',
        error: null
    };
    
    try {
        // Step 1: Create credential
        result.credentialCreation = 'Attempting...';
        const credential = new DefaultAzureCredential();
        result.credentialCreation = 'Success';
        
        // Step 2: Create client
        result.clientCreation = 'Attempting...';
        const client = new CostManagementClient(credential);
        result.clientCreation = 'Success';
        
        // No actual API call, just testing initialization
        result.sdkInitialization = 'Success';
    } catch (error) {
        result.error = {
            message: error.message,
            stack: error.stack,
            name: error.name
        };
    }
    
    context.res = {
        status: 200,
        body: result
    };
};