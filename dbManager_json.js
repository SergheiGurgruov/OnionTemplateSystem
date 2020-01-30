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

        console.log(util.roughSizeOfObject(db));

        DataBase.conn = db;
        DataBase.started = true;
        callback();
    },
    saveAll: function () {
        DataBase.conn.forEach(collection => {
            fs.writeFileSync(DataBase.db_path + collection.collection_name + ".json", JSON.stringify(collection), "utf8");
        });
    },
    saveCollection: function (collection_index) {
        let col = DataBase.conn[collection_index];
        fs.writeFileSync(DataBase.db_path + col.collection_name + ".json", JSON.stringify(col), "utf8");
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

        callback(JSON.parse(JSON.stringify(items)));
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

        return JSON.parse(JSON.stringify(items));;
    },
    queryOne: async function (collection, query) {
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

        return JSON.parse(JSON.stringify(items[0]));
    },
    updateOne: async function (collection, query, data) {
        let col_index = 0;
        DataBase.conn.forEach(_collection => {
            if (_collection.collection_name == collection) {

                if (query == {}) {
                    return false;
                }
                let doc_index = 0
                _collection.collection_data.forEach(document => {
                    let errors = 0;
                    Object.keys(query).forEach(query_key => {
                        if (document[query_key] != query[query_key]) {
                            errors++;
                        }
                    });
                    if (errors == 0) {
                        DataBase.conn[col_index].collection_data[doc_index] = {...DataBase.conn[col_index].collection_data[doc_index],...data};
                        this.saveCollection(col_index);
                        return true;
                    }
                    doc_index++;
                });
            }
            col_index++;
        });
    },
    /**
     * 
     * @param {stirng} collection collection name
     * @param {Object} data data to insert
     */
    insertOne: async function(collection,data){
        let col_index = 0;
        DataBase.conn.forEach(_collection => {
            if (_collection.collection_name == collection) {
                _collection.collection_data.push(data);
                this.saveCollection(col_index);
            }
            col_index++;
        });
    },
    /**
     * 
     * @param {string} collection colection name
     * @param {Array<Object>} data data to insert
     */
    insertMany:async function(collection,data){
        let col_index = 0;
        DataBase.conn.forEach(_collection => {
            if (_collection.collection_name == collection) {
                data.forEach(document => {
                    _collection.collection_data.push(document);
                });
                this.saveCollection(col_index);
            }
            col_index++;
        });
    }
}