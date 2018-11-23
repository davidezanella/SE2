let pg = require('pg');
pg.defaults.ssl = true;
let Client = pg.Client;
let connectionString = process.env.DATABASE_URL;

let db = {
    getConnectionString: function () {
        if (!connectionString) {
            connectionString = require('../db_config');
        }

        return connectionString;
    },
    getClient: async function () {
        let client = new Client(this.getConnectionString());
        await client.connect();
        return client;
    },
    executeQuery: async function (query, values) {
        let client = await this.getClient();
        let res = await client.query(query, values);

        await client.end();
        return res;
    }
};

module.exports = db;