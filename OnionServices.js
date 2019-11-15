const dbClient = require("./dbManager").dbClient;
const http = require("http");
const util = require("./util");
const querystring = require('querystring');
const url = require("url");

const routeMap = {
    /**
     * 
     * @param {Object} data
     * @param {string} data.username
     * @param {string} data.password
     * @param {http.ServerResponse} res 
     */
    "/login.onioncall": function (data, res) {
        util.log("Login", "User Is Attempting Login (Following data)", util.colors.FgYellow);
        console.log(data);
        dbClient.query("users", { username: data.username, password: data.password }, function (items) {
            if (items.length > 0) {
                let cookieString = `user=${data.username},${data.password}`
                res.writeHead(302, {
                    'Set-Cookie': cookieString,
                    Location: '/'
                });
                res.end();
            } else {
                util.log("Login", `Login has failed, incorrect username or password  OnionServices.js:${__line}`, util.colors.FgRed);
                res.writeHead(302, {
                    Location: "/login"
                });
                res.end();
            }
        });
    }
}

exports.OSInterface = {
    /**
     * 
     * @param {http.IncomingMessage} req 
     * @param {http.ServerResponse} res 
     * @param {string} pathName 
     */
    post: function (req, res, pathName) {
        var dataString = '';
        req.on('data', function (data) {
            dataString += data;
            if (dataString.length > 1e6)
                req.connection.destroy();
        });

        req.on('end', function () {
            var data = querystring.parse(dataString);
            routeMap[pathName](data, res);
        });

    },
    /**
     * 
     * @param {http.IncomingMessage} req 
     */
    getUser: function (req) {
        let cookies = util.parseCookies(req);
        try {
            let username = cookies.user.split(',')[0];
            let password = cookies.user.split(',')[1];

            return {
                username: username,
                password: password
            }
        }
        catch{
            return {
                username:"",
                password:""
            }
        }
        
    },
    /**
     * 
     * @param {Object} cookies 
     * @param {string} cookies.user
     * @param {(outcome:boolean)=>void} callback 
     */
    checkLogin: function (cookies, callback) {

        let username = cookies.user.split(',')[0];
        let password = cookies.user.split(',')[1];

        dbClient.query("users", { username: username, password: password }, function (items) {
            if (items.length > 0) {
                callback(true);
            } else {
                util.log(
                    "Warning",
                    `Wrong User data in Cookies: user:${cookies.user} OnionServices.js:${__line}`,
                    util.colors.FgRed
                );
                callback(false);

            }
        });
    },
    /**
     * 
     * @param {http.IncomingMessage} req 
     * @param {function} callback
     */
    getData: function (req) {
        let url_parts = url.parse(req.url, true);
        var query = url_parts.query;
        return query;
    }

}