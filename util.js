const http = require("http");
const fs = require("fs");

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

Object.defineProperty(global, '__stack', {
    get: function () {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function (_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

Object.defineProperty(global, '__line', {
    get: function () {
        return __stack[1].getLineNumber();
    }
});

Object.defineProperty(global, '__function', {
    get: function () {
        return __stack[1].getFunctionName();
    }
});

var colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",

    FgBlack: "\x1b[30m",
    FgRed: "\x1b[31m",
    FgGreen: "\x1b[32m",
    FgYellow: "\x1b[33m",
    FgBlue: "\x1b[34m",
    FgMagenta: "\x1b[35m",
    FgCyan: "\x1b[36m",
    FgWhite: "\x1b[37m",

    BgBlack: "\x1b[40m",
    BgRed: "\x1b[41m",
    BgGreen: "\x1b[42m",
    BgYellow: "\x1b[43m",
    BgBlue: "\x1b[44m",
    BgMagenta: "\x1b[45m",
    BgCyan: "\x1b[46m",
    BgWhite: "\x1b[47m"
}

/**
 * Logs a text after a descriptive message
 * @param {string} message 
 * @param {string} text 
 * @param {string} color
 */
function log(message, text, color = "\x1b[0m") {

    if (arguments.length == 1)
        console.log(`log: ${message}`);
    else
        console.log(`${color}`, `${message}: ${text}`);

    console.log(`${colors.Reset}`);

}

/**
 * 
 * @param {http.IncomingMessage} request 
 */
function parseCookies(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}

function roughSizeOfObject(object) {

    var objectList = [];
    var stack = [object];
    var bytes = 0;

    while (stack.length) {
        var value = stack.pop();

        if (typeof value === 'boolean') {
            bytes += 4;
        }
        else if (typeof value === 'string') {
            bytes += value.length * 2;
        }
        else if (typeof value === 'number') {
            bytes += 8;
        }
        else if
            (
            typeof value === 'object'
            && objectList.indexOf(value) === -1
        ) {
            objectList.push(value);

            for (var i in value) {
                stack.push(value[i]);
            }
        }
    }
    return bytes;
}

exports.roughSizeOfObject = roughSizeOfObject;
exports.parseCookies = parseCookies;
exports.log = log;
exports.colors = colors;

exports.TestService = function (ServiceUrl, req_data, callback) {

    const data = JSON.stringify(req_data);

    const options = {
        hostname: process.env.HOST,
        port: process.env.PORT||80,
        path: ServiceUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const req = http.request(options, res => {
        //console.log(`statusCode: ${res.statusCode}`)

        let dataString = '';

        res.on('data', d => {
            dataString += d;

            if (dataString.length > 1e6)
                req.connection.destroy();
        })

        res.on('end', function () {
            try {
                var data = JSON.parse(dataString);
                callback(data);
            } catch (error) {
                log("WARNING","FAILED TO PARSE RESPONSE DATA__ logging into log.json",colors.FgRed);
                fs.writeFileSync("./log.json",dataString,"utf8");
                
            }

        });
    })

    req.on('error', error => {
        console.error(error)
    })

    req.write(data)
    req.end()

}