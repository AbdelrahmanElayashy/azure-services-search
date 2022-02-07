
const
    { SearchIndexClient,
        AzureKeyCredential,
        SearchIndexerClient
    } = require("@azure/search-documents");


class AzureSearch {

    constructor(endpoint, apiKey, connectionString) {
        this.endpoint = endpoint
        this.apiKey = apiKey
        this.connectionString = connectionString
    }

    async deleteIndexIfExists(indexName) {
        const indexClient = new SearchIndexClient(this.endpoint, new AzureKeyCredential(this.apiKey));
        try {
            await indexClient.deleteIndex(indexName);
            console.log('Deleting index...');
        } catch {
            console.log('Index does not exist yet.');
        }
    }

    async createSearchIndex(indexDefinition) {
        const indexClient = new SearchIndexClient(this.endpoint, new AzureKeyCredential(this.apiKey));
        console.log('Creating index...');
        let index = await indexClient.createIndex(indexDefinition);
        console.log(`Index named ${index.name} has been created.`);
    }

    async createCSVSearchIndexer(indexerName, dataSourceName, targetIndexName) {
        console.log(`Creating Indexer Operation`);
        const client = new SearchIndexerClient(this.endpoint, new AzureKeyCredential(this.apiKey));

        const indexer = {
            name: indexerName,
            description: "Created by GUI App Customizer, implemented by Abdelrahman Elayashy",
            dataSourceName,
            targetIndexName,
            parameters: {
                configuration: {
                    firstLineContainsHeaders: true,
                    parsingMode: "delimitedText",
                    delimitedTextHeaders: ",",
                    queryTimeout: "360"
                }

            },
            isDisabled: false,
        };
        await client.createIndexer(indexer);
    }

    async createSearchIndexer(indexerName, dataSourceName, targetIndexName) {
        console.log(`Creating Indexer Operation`);
        const client = new SearchIndexerClient(this.endpoint, new AzureKeyCredential(this.apiKey));

        const indexer = {
            name: indexerName,
            description: "Created by GUI App Customizer, implemented by Abdelrahman Elayashy",
            dataSourceName,
            targetIndexName,
            isDisabled: false,
        };
        await client.createIndexer(indexer);
    }

    async createBlobDataSource(sourceName, containerName, folderName = '') {

        const client = new SearchIndexerClient(this.endpoint, new AzureKeyCredential(this.apiKey));

        const option = {
            connectionString: this.connectionString,
            name: sourceName,
            description: "Created by GUI App Customizer, implemented by Abdelrahman Elayashy",
            container: { name: containerName, query: folderName },
            type: 'azureblob'
        }
        await client.createDataSourceConnection(option)
    }


    async deleteIndexer(indexerName) {
        const client = new SearchIndexerClient(this.endpoint, new AzureKeyCredential(this.apiKey));
        try {
            await client.deleteIndexer(indexerName)
        } catch {
            console.log('indexer is not found to delete it')
        }
    }

    async deleteDataSource(sourceName) {
        const client = new SearchIndexerClient(this.endpoint, new AzureKeyCredential(this.apiKey));
        try {
            await client.deleteDataSourceConnection(sourceName)
        } catch {
            console.log('data source is not found to delete it')
        }
    }

}

module.exports = AzureSearch
