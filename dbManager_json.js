/**
 * @typedef {Object} Collection
 * @property {string} collection_name
 * @property {Array<Object>} collection_data
 * 
 * 
 * @typedef {Array<Collection>} JSON_DB
 * 
 */

const util = require("./util");
const fs = require("fs");
const DataBase = {
    db_path: './assets/db_json/',
    /**
     * @type {JSON_DB} database Connection
     */
    conn: [],
    started: false
};

exports.dbClient = {
    init: function (callback) {
        if (DataBase.started) {
            callback();
            return;
        }

        let db = [];

        fs.readdirSync(DataBase.db_path).forEach(element => {
            db.push(JSON.parse(fs.readFileSync(DataBase.db_path + element)));
        });

        console.log(db);

        DataBase.conn = db;
        DataBase.started = true;
        callback();
    },
    save: function () {
        DataBase.conn.forEach(collection => {
            fs.writeFileSync(DataBase.db_path + collection.collection_name + ".json", JSON.stringify(collection), "utf8");
        });
    },
    /**
     * 
     * @param {string} collection Collection Name
     * @param {Object} query json query filters
     * @param {(items:Array<JSON>)=>void} callback callback function
     * @returns {Array}
     */
    query: function (collection, query, callback) {

        let items = [];

        DataBase.conn.forEach(_collection => {
            if (_collection.collection_name == collection) {

                if (query == {}) {
                    items = _collection.collection_data;
                    callback(items);
                    return;
                }

                _collection.collection_data.forEach(document => {
                    let errors = 0;
                    Object.keys(query).forEach(query_key => {
                        if (document[query_key] != query[query_key]) {
                            errors++;
                        }
                    });
                    if (errors == 0)
                        items.push(document);
                });
            }
        });

        callback(items);
    },
    query_promise: async function (collection, query) {
        let items = [];

        DataBase.conn.forEach(_collection => {
            if (_collection.collection_name == collection) {

                if (query == {}) {
                    items = _collection.collection_data;
                    return items;
                }

                _collection.collection_data.forEach(document => {
                    let errors = 0;
                    Object.keys(query).forEach(query_key => {
                        if (document[query_key] != query[query_key]) {
                            errors++;
                        }
                    });
                    if (errors == 0)
                        items.push(document);
                });
            }
        });

        return items;
    },
    updateOne: async function (collection, query, data) {
        DataBase.conn.forEach(_collection => {
            if (_collection.collection_name == collection) {

                if (query == {}) {
                    return false;
                }

                _collection.collection_data.forEach(document => {
                    let errors = 0;
                    Object.keys(query).forEach(query_key => {
                        if (document[query_key] != query[query_key]) {
                            errors++;
                        }
                    });
                    if (errors == 0) {
                        document = data;
                        return true;
                    }
                });
            }
        });
    }
}