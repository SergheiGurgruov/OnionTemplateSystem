const dbClient = require("./dbManager").dbClient;
const http = require("http");
const util = require("./util");
var querystring = require('querystring');
const routeMap = {
    /**
     * 
     * @param {Object} data
     * @param {string} data.email
     * @param {string} data.password
     * @param {http.ServerResponse} res 
     */
    "/login.onioncall": function (data, res) {
        dbClient.query("users", { email: data.email, password: data.password }, function (items) {
            if (items.length > 0) {
                let cookieString = `user=${data.email},${data.password}`
                res.writeHead(302, {
                    'Set-Cookie': cookieString,
                    Location: '/'
                });
                res.end();
            } else {
                util.log("Login", "Login has failed, incorrect username or password", util.colors.FgRed);
                res.writeHead(302,{
                    Location:"/login"
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
            util.log("Log", "Following Post Data", util.colors.FgYellow);
            console.log(data);
            routeMap[pathName](data, res);
        });

    },
    /**
     * 
     * @param {Object} cookies 
     * @param {string} cookies.user
     * @param {(outcome:boolean)=>void} callback 
     */
    checkLogin: function (cookies, callback) {

        let email = cookies.user.split(',')[0];
        let password = cookies.user.split(',')[1];

        dbClient.query("users", { email: email, password: password }, function (items) {
            if (items.length > 0) {
                callback(true);
            } else {
                callback(false);
                util.log(
                    "Warning",
                    `Wrong User data in Cookies: user:${cookies.user}`,
                    util.colors.FgRed
                );
            }
        });
    }

}