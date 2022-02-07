const AzureSearch = require('./azureSearchSDK')

const apiKey = process.env.REACT_APP_GSA_IMAGE_ADMIN_kEY || "";
const endpoint = process.env.REACT_APP_GSA_IMAGE_searchApiEndpoint || "";
const connectionString = process.env.REACT_APP_GSA_IMAGE_connectionString || "";

const azureSearch = new AzureSearch(endpoint, apiKey, connectionString)


function getIndexDefinition(appName) {

    var indexDefinition = require('./data/ImageSearchIndexDefinition.json')
    indexDefinition.name = appName
    return indexDefinition

}

async function removeImageSearch(indexName, indexerName, dataSourceName) {
    await azureSearch.deleteIndexIfExists(indexName)
    await azureSearch.deleteIndexer(indexerName)
    await azureSearch.deleteDataSource(dataSourceName)
}

async function createIndexIndexerDatasource(appName, containerName, folderName, indexDef) {
    const indexName = indexDef.name
    const indexerName = `${appName}`
    const dataSourceName = `${appName}`


    await removeImageSearch(indexName, indexerName, dataSourceName)
    await azureSearch.createSearchIndex(indexDef)
    await azureSearch.createBlobDataSource(dataSourceName, containerName, folderName)
    await azureSearch.createSearchIndexer(indexerName, dataSourceName, indexName)
}


async function createAzureImageSearchClient(context, appName, containerName, folderName) {
    const indexName = `${appName}-index` //don't change it -index is relevant for processing data!
    const indexDef = getIndexDefinition(indexName)
    await createIndexIndexerDatasource(appName, containerName, folderName, indexDef)
}

module.exports = {
    createAzureImageSearchClient
}

