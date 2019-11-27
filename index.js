global.db_type = "mongo"

const http = require('http');
const pageLoader = require("./pageLoader");
const util = require("./util");
const dbClient = require("./dbManager").dbClient(global.db_type);

const port = process.env.PORT || 80;

dbClient.init(function () {
    http.createServer(async function (req, res) {
        //util.log(`ServerRequest`, `${req.url}  index.js:${__line}`, util.colors.FgGreen);
        pageLoader.showPage(res, req);
    }).listen(port);
});

util.log('Server Log', `server started o port: ${port}  index.js:${__line} `, util.colors.FgCyan);

