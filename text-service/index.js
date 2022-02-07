const { createIndexIndexerDatasource } = require("./azureSearchController");

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const appName = req.body.appName;
    const attributes = req.body.attributes
    const containerName = req.body.containerName

    createIndexIndexerDatasource(appName, attributes, containerName)

    const responseMessage =
        "Hello, " + appName + ". This HTTP triggered function executed successfully."

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}