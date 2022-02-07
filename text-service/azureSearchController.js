const AzureSearch = require('./azureSearchSDK')

const apiKey = process.env.REACT_APP_GSA_TEXT_ADMIN_kEY || "";
const endpoint = process.env.REACT_APP_GSA_TEXT_searchApiEndpoint || "";
const GsaTextConnectionString = process.env.REACT_APP_GSA_TEXT_connectionString || "";

const azureSearch = new AzureSearch(endpoint, apiKey, GsaTextConnectionString)

// arr is equal {name : string, key: boolean}
function createIndexDefinition(indexName, arr) {
    const fields = arr.map(field => {
        return {
            type: "Edm.String",
            name: field.name,
            key: field.key,
            sortable: true,
            filterable: true,
            facetable: true,
            retrievable: true,
            searchable: true,
            analyzerName: "de.lucene"
        }
    })
    const indexDef = {
        name: indexName,
        fields: [...fields],
        corsOptions: {
            allowedOrigins: ['*']
        }
    }
    console.log(indexDef)

    return indexDef
}

async function removeTextSearch(indexName, indexerName, dataSourceName) {
    await azureSearch.deleteIndexIfExists(indexName)
    await azureSearch.deleteIndexer(indexerName)
    await azureSearch.deleteDataSource(dataSourceName)
}

async function createIndexIndexerDatasource(appName, searchAttributes, containerName) {
    const indexName = `${appName}`
    const indexerName = `${appName}`
    const dataSourceName = `${appName}`

    const indexDef = createIndexDefinition(indexName, searchAttributes)
    await removeTextSearch(indexName, indexerName, dataSourceName)
    await azureSearch.createSearchIndex(indexDef)
    await azureSearch.createBlobDataSource(dataSourceName, containerName)
    await azureSearch.createCSVSearchIndexer(indexerName, dataSourceName, indexName)
}


module.exports = {
    createIndexIndexerDatasource
}

