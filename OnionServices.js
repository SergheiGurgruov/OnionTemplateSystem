const dbClient = require("./dbManager").dbClient(global.db_type);
const http = require("http");
const util = require("./util");
const querystring = require('querystring');
const url = require("url");
const mongodb = require("mongodb");

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
    },
    /**
     * @param {Object} data
     * @param {http.ServerResponse} res 
     */
    "/updateCharacter.onioncall": async function (data, res) {

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write("Success!");
        res.end();
        data = JSON.parse((Object.keys(data))[0]);

        if (data.nome == null || data.razza == null || data.classe == null || data.livello == null) {
            return;
        }
        //console.log(data);

        let oldname = data.oldname || data.nome;
        //data = { "_id": "5dcbcde8e9e72277f9131a1a", "giocatore": "Dares", "nome": "Areside", "razza": "umano", "classe": "iracondo di stirpe", "livello": 3, "stats": { "for": 10, "des": 12, "cos": 8, "int": 18, "sag": 14, "car": 12 }, "ability_ranks": { "acrobazia": 2, "addestrare_animali": 3, "artista_della_fuga": 0, "camuffare": 1, "cavalcare": 2, "conoscenze_arcane": 0, "conoscenze_dungeon": 0, "conoscenze_geografia": 0, "conoscenze_ingegneria": 0, "conoscenze_locali": 0, "conoscenze_natura": 0, "conoscenze_nobilta": 0, "conoscenze_piani": 0, "conoscenze_religioni": 0, "conoscenze_storia": 0, "diplomazia": 0, "disattivare_congegni": 0, "furtivita": 0, "guarire": 0, "intimidire": 0, "intuizione": 0, "intrattenere": 0, "linguistica": 0, "nuotare": 0, "percezione": 0, "raggirare": 0, "rapidita_di_mano": 0, "sapienza_magica": 0, "scalare": 0, "sopravvivenza": 0, "utilizzare_congegni_magici": 0, "valutare": 0, "volare": 0 }, "armi": [{ "nome": "Pugnale", "tiro": { "dado": "1d20", "stat": "for" }, "danno": { "dado": "1d4", "stat": "for" }, "critico": "19/20 x2" }, { "nome": "Balestra", "tiro": { "dado": "1d20", "stat": "des" }, "danno": { "dado": "1d8", "stat": "" }, "critico": "20 x3" }], "armature": [{ "nome": "Armatura di Pelle", "classe_armatura": 4 }, { "nome": "Scudo piccolo", "classe_armatura": 1 }], "talenti": ["Talento di Prova 1", "Talento di prova 2"], "magie": [{ "nome": "mani brucianti", "componenti": "verbale,somatica", "raggio": "4,5m", "area": "a forma di cono", "durata": "istantaneo", "danno": "1d4 * Livello (max 5d4)", "tiro": "TS Riflessi Dimezza: CD 10 + 1(lv Incantesimo) + Caratteristica Rilevante", "dettagli": "I materiali infiammabili prendono fuoco" }], "inventario": ["50 frecce", "spada corta"], "monete": { "oro": 50, "argento": 30, "rame": 25 } } 
        delete data._id;
        delete data.oldname;
        o_id = new mongodb.ObjectID(data._id);
        await dbClient.updateOne("personaggi", { giocatore: data.giocatore, nome: oldname }, data);

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
                username: "",
                password: ""
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