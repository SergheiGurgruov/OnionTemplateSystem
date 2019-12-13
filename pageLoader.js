const http = require("http");
const url = require('url');
const routingMap = require("./routeMapper").routingMap;
const pageMaker = require("./pageMaker");
const fs = require("fs");
const util = require("./util");
const OSInterface = require("./OnionServices").OSInterface;


/**
 * Shows the page
 * @param {http.ServerResponse} res 
 * @param {http.IncomingMessage} req
 */
function showPage(res, req) {

    let pathName = url.parse(req.url).pathname;
    let contentType = getContentType(pathName);

    //util.log("Url LOG",pathName,util.colors.FgYellow);

    /* if(contentType != 'text/html')
        pathName = getPureFileDir(pathName); */

    //util.log(`log`, `request type is ${contentType}  pageLoader.js:${__line}`, util.colors.FgCyan);

    switch (contentType) {
        case 'text/css': {
            let file;
            try {
                file = fs.readFileSync(`./assets/css${pathName}`);
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(file);
                res.end();
            } catch (error) {
                util.log(`Server Error`, `could not read the requested file  ./assets/css${pathName}`, util.colors.FgRed);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("Server Error: Could not retrieve the requested file;")
                res.end();
            }
            break;
        }
        case 'text/javascript': {
            let file;
            try {
                file = fs.readFileSync(`./assets/js${pathName}`);
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(file);
                res.end();
            } catch (error) {
                util.log(`Server Error`, `could not read the requested file  ./assets/js${pathName}`, util.colors.FgRed);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("Server Error: Could not retrieve the requested file;")
                res.end();
            }
            break;
        }
        case 'image/jpeg': {
            let file;
            try {
                file = fs.readFileSync(`./assets/images${pathName}`);
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(file);
                res.end();
            } catch (error) {
                util.log(`Server Error`, `could not read the requested file  ./assets/images${pathName}`, util.colors.FgRed);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("Server Error: Could not retrieve the requested file;")
                res.end();
            }
            break;
        }
        case 'image/png': {
            let file;
            try {
                file = fs.readFileSync(`./assets/images${pathName}`);
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(file);
                res.end();
            } catch (error) {
                util.log(`Server Error`, `could not read the requested file  ./assets/images${pathName}`, util.colors.FgRed);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("Server Error: Could not retrieve the requested file;")
                res.end();
            }
            break;
        }
        case 'image/gif': {
            let file;
            try {
                file = fs.readFileSync(`./assets/images${pathName}`);
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(file);
                res.end();
            } catch (error) {
                util.log(`Server Error`, `could not read the requested file  ./assets/images${pathName}`, util.colors.FgRed);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("Server Error: Could not retrieve the requested file;")
                res.end();
            }
            break;
        }
        case 'image/x-icon': {
            let file;
            try {
                file = fs.readFileSync(`./assets/images${pathName}`);
                res.writeHead(200, { 'Content-Type': contentType });
                res.write(file);
                res.end();
            } catch (error) {
                util.log(`Server Error`, `could not read the requested file  ./assets/images${pathName}`, util.colors.FgRed);
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("Server Error: Could not retrieve the requested file;")
                res.end();
            }
            break;
        }
        case 'text/html':

            if (!routingMap[pathName]) {
                res.writeHead(404, { 'Content-Type': contentType });
                res.write(`<h1>404 Page not found</h1>`);
                res.end();

                return;
            }
            /**
             * @type {object}
             */
            let cookies = util.parseCookies(req);
            /* util.log("Cookie Log:", `Following the Client's Cookies pageLoader.js:${__line}`, util.colors.FgYellow);
            console.log(cookies); */

            if (pathName != "/login") {

                if (cookies.user) {
                    OSInterface.checkLogin(cookies, function (outcome) {
                        if (outcome) {
                            res.writeHead(200, { 'Content-Type': contentType });
                            pageMaker.makePage(pathName,req, function (respone) {
                                res.write(respone);
                                res.end();
                            })
                        }
                        else {
                            res.writeHead(302, { Location: "/login" });
                            res.end();
                        }
                    });
                } else {
                    res.writeHead(302, { Location: "/login" });
                    res.end();
                }

            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                pageMaker.makePage(pathName,req, function (respone) {
                    res.write(respone);
                    res.end();
                })
            }

            break;
        case 'request/onioncall':
            OSInterface.post(req, res, pathName);
            break;

        default:
            break;
    }

}

exports.showPage = showPage;

/**
 * Gets the content type ofr the request (html/css/js ... )
 * @param {string} url 
 */
function getContentType(url) {
    const extension = getExtension(url);
    const res = {
        '.txt': 'text/plain',
        '.html': 'text/html',
        '.ico':'image/x-icon',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.onioncall': 'request/onioncall',
        '.map': 'text/css',
    }[extension];
    if (res == undefined) {
        util.log(`log`, `Unknown request type.. logging url: ${url}`, util.colors.FgYellow);
    }
    return res;
}

function getExtension(url) {
    if (url.lastIndexOf('.') == -1)
        return '.html';
    return url.substr(url.lastIndexOf('.'));
}
