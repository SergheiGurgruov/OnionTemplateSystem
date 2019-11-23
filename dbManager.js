const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const fs = require("fs");
const util = require("./util");

const dbCredentials = JSON.parse(fs.readFileSync("./assets/db_credentials.json","utf8"));

const DataBase = {

    url: dbCredentials.url,
    dbName: "OnionTemplateSystem",
    /**
     * @type {MongoClient}
     */
    MongoClient: "",
    /**
     * @type {mongodb.Db} database Connection
     */
    conn: "",
    started: false
};

exports.dbClient = {
    getUrl: function () {
        return DataBase.url;
    },
    init: function (callback) {

        console.log(DataBase);
        

        if (DataBase.started) {
            callback();
            return;
        }

        MongoClient.connect(DataBase.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function (err, db) {

            //console.log(db);
            

            if (err) throw err;
            DataBase.MongoClient = db;
            DataBase.conn = db.db(DataBase.dbName);
            DataBase.started = true;
            callback();
        })
    },
    close: function () {
        DataBase.MongoClient.close();
    },
    /**
     * 
     * @param {string} collection Collection Name
     * @param {JSON} query json query filters
     * @param {(items:Array<JSON>)=>void} callback callback function
     * @returns {Array}
     */
    query: function (collection, query, callback) {
        DataBase.conn.collection(collection).find(query).toArray(function (err, items) {
            if (err) throw err;
            callback(items);
        });
    },
    query_promise: async function (collection, query) {
        let result = await DataBase.conn.collection(collection).find(query).toArray();
        return result;
    },
    updateOne: async function(collection,query,data){
        await DataBase.conn.collection(collection).update(query,data);
    }
}