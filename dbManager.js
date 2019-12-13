const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const fs = require("fs");
const util = require("./util");
const db_json = require("./dbManager_json").dbClient;

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

const db_Client = {
    getUrl: function () {
        return DataBase.url;
    },
    init: function (callback) {

        //console.log(DataBase);
        

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
    /**
     * 
     * @param {string} collection collection name
     * @param {JSON} query query filter
     */
    query_promise: async function (collection, query) {
        let result = await DataBase.conn.collection(collection).find(query).toArray();
        return result;
    },
    /**
     * 
     * @param {string} collection collection name
     * @param {JSON} query query filter
     */
    queryOne: async function (collection, query) {
        let result = await DataBase.conn.collection(collection).find(query).toArray();
        return result[0];
    },
    /**
     * 
     * @param {string} collection colleciton name
     * @param {JSON} query query filter
     * @param {Object} data data
     */
    updateOne: async function(collection,query,data){
        await DataBase.conn.collection(collection).updateOne(query,{$set:data});
    },
    /**
     * 
     * @param {stirng} collection collection name
     * @param {Object} data data to insert
     */
    insertOne: async function(collection,data){
        await DataBase.conn.collection(collection).insertOne(data);
    },
    /**
     * 
     * @param {string} collection colection name
     * @param {Array<Object>} data data to insert
     */
    insertMany:async function(collection,data){
        await DataBase.conn.collection(collection).insertMany(data);
    }
}

exports.dbClient = function(client_type){
    switch (client_type) {
        case "mongo":
            return db_Client;
            break;

        case "json":
            return db_json;
            break;
    
        default:
            break;
    }
}