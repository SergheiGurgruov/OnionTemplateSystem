const http = require('http');
const pageLoader = require("./pageLoader");
const util = require("./util");
const dbClient = require("./dbManager").dbClient;

const port = process.env.PORT || 5000;

//dbClient.init(function () {
    http.createServer(async function (req, res) {
        //util.log(`ServerRequest`, `${req.url}  index.js:${__line}`, util.colors.FgGreen);

        res.writeHead(200);
        res.write("Hello World");
        res.end();

        //pageLoader.showPage(res, req);
    }).listen(port);
//});

util.log('Server Log', `server started o port: ${port}  index.js:${__line} `, util.colors.FgCyan);

