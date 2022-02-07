const { createAzureImageSearchClient } = require("./azureSearchController");


module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const appName = req.body.appName
    const containerName = req.body.containerName
    const blobFolder = req.body.blobFolder

    const responseMessage =
        "Hello, " + appName + ". This HTTP triggered function executed successfully."

    context.log(responseMessage)
    createAzureImageSearchClient(context, appName, containerName, blobFolder)

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}