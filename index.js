const http = require('http');
const pageLoader = require("./pageLoader");
const util = require("./util");
const dbClient = require("./dbManager").dbClient;

dbClient.init(function () {
    http.createServer(async function (req, res) {
        //util.log(`ServerRequest`, `${req.url}  index.js:${__line}`, util.colors.FgGreen);
        pageLoader.showPage(res, req);
    }).listen(8000);
});

util.log('Server Log', `server started  index.js:${__line} `, util.colors.FgCyan);

