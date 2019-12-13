const OSInterface = require('./OnionServices').OSInterface;
const dbClient = require("./dbManager").dbClient(global.db_type);
const fs = require("fs");

/**
 * Form input confing
 * @typedef {Object} Form.Input
 * @property {string} type
 * @property {string} name
 * @property {string} message
 */

/**
 * @typedef {Object} UserData
 * @property {string} username
 * @property {string} password
 * @typedef {Object} RequestData
 * @property {UserData} user
 */

/**
 * @typedef {Object} PageBlock
 * @property {string} PageBlock.type
 */

/**
 * Body Data type config
 * @typedef {Object} BodyData
 * @property {RequestData} request_data
 * @property {Array<PageBlock>} blocks
 */


module.exports = {
    /**
    * Default template for Head Rendering
    * @param {JSON} head 
    */
    defaultHeadTemplate: function (head) {
        let html = `<meta http-equiv="content-type" content="text/html; charset=utf-8" />`;
        html += (head.title ? `<title>${head.title}</title>` : ``);
        head.scripts.forEach(element => {
            html += `<script src="${element}"></script>`;
        });
        head.styles.forEach(element => {
            html += `<link rel="stylesheet" href="${element}">`;
        });
        return html;
    },

    t_personaggio_head: async function (head) {
        let req_data = {
            user: head.request_data.user.username,
            charname: head.request_data.charname
        }

        let character_data = (await dbClient.query_promise("personaggi", { nome: req_data.charname, giocatore: req_data.user }))[0];
        let class_data = (await dbClient.query_promise("classi", { nome: character_data.classe }))[0];
        let race_data = (await dbClient.query_promise("razze", { nome: character_data.razza }))[0];

        let html = `
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
        `;
        html += (head.title ? `<title>${head.title}</title>` : ``);
        html += `
        <script type="text/javascript">
            var character_data = ${JSON.stringify(character_data)};
            var class_data = ${JSON.stringify(class_data)};
            var race_data = ${JSON.stringify(race_data)};
        </script>`;
        head.scripts.forEach(element => {
            html += `<script src="${element}"></script>`;
        });
        head.styles.forEach(element => {
            html += `<link rel="stylesheet" href="${element}">`;
        });
        return html;
    },

    loginTemplate: function (data) {
        let result = `
        <style>
            .body{
                background: url("https://images.unsplash.com/photo-1484417894907-623942c8ee29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80");
                background-size: 100vw auto;
                opacity: 0.8;
                height: 100vh;
            }
            .title{
                color: white;
            }
        </style>
        <div  class="container-fluid body">`;

        data.blocks.forEach(element => {
            result += `<div class="row">`;
            if (element.type == "title") {

                result += `
                        <div class="col-md-11 offset-md-1 title">
                            ${element.text}
                        </div>
                    `;
            }
            else if (element.type == "header") {

                result += h_header(element);

            } else if (element.type == "form") {

                result += `<div class="col-md-4 offset-md-1"><form class="form" action=${element.action} method=${element.method}>`;
                element.inputs.forEach(_input => {
                    result += h_formInput(_input);
                });
                result += `</form></div>`;
            }
            result += `</div>`
        });

        result += `</div>`;

        return result;
    },
    genericFormTemplate: function (data) {
        let result = `
        <div  class="container-fluid body">`;

        data.blocks.forEach(element => {
            result += `<div class="row">`;
            if (element.type == "title") {

                result += `
                        <div class="col-md-4 offset-md-4 title">
                            ${element.text}
                        </div>
                    `;
            }
            else if (element.type == "header") {

                result += h_header(element);

            } else if (element.type == "form") {

                result += `<div style="margin-bottom:300px;" class="col-md-6 offset-md-3"><form class="form" action=${element.action} method=${element.method}>`;
                element.inputs.forEach(_input => {
                    result += h_formInput(_input);
                });
                result += `</form></div>`;
            }
            result += `</div>`
        });

        result += `</div>`;

        return result;
    },
    /**
     * 
     * @param {BodyData} body 
     */
    t_characters: async function (body) {

        let html = `<div  class="container-fluid">`;
        for (var i = 0; i < body.blocks.length; i++) {
            let element = body.blocks[i];

            html += `<div class="row">`;
            if (element.type == "header") {
                html += h_header(element);
            } else if (element.type == "title") {
                html += `
                <div class="col-md-11 offset-md-1 title">
                    ${element.text}
                </div>`
            } else if (element.type == "card_block") {
                let _cards = await dbClient.query_promise("personaggi", { giocatore: body.request_data.user.username });
                element.cards = _cards;
                html += h_cardBlock(element);
            }

            html += "</div>";

        }
        html += `</div>`
        return html;
    },
    /**
     * 
     * @param {BodyData} body 
     */
    t_personaggio: async function (body) {
        return fs.readFileSync('./assets/pages/character_sheet_body.html', "utf8");
    }
}

/**
 * Card Block Configuration
 * @typedef {Object} CharacterCard  
 * @property {string} nome
 * @property {string} razza
 * @property {string} classe
 * @property {string} livello
 * 
 * @typedef {Object} CharacteCardBlock
 * @property {string} type
 * @property {Array<CharacterCard>} cards
 */

/**
 * 
 * @param {CharacteCardBlock} card_block
 */

function h_cardBlock(card_block) {
    let result = `<div class="col-md-10 offset-md-1 card_block"><div class="row">`;
    card_block.cards.forEach(element => {
        result += `
            <div class="col-md-4">
                <a href="/personaggio?charname=${element.nome}"><div class = card>
                    <h3>${element.nome}</h3>
                    <h4>${element.classe}: lv.${element.livello}</h4>
                    <h5>${element.razza}</h5>
                </div></a>
            </div>
        `;
    });

    result += fs.readFileSync("./assets/partial_pages/addCharacter.html")
    return result + `</div></div>`;
}

function h_header(element) {
    return `
        <div class="col-md-12" id="header">
            ${element.text}
        </div>
    `;
}

/**
 * 
 * @param {Form.Input} input 
 */
function h_formInput(input) {
    if (input.type == "submit") {
        return `<button type="submit" class="btn btn-info">${input.text||"Submit"}</button>`;
    } else if (input.type == "username") {
        return `
        <div class="form-group">
            <label for="${input.name}">Username</label>
            <input type="text" class="form-control" id=${input.name} aria-describedby="emailHelp" name=${input.name} placeholder="Enter Username">
            <small id="emailHelp" class="form-text text-muted">We'll never share your data with anyone else.</small>
        </div>`;
    } else if (input.type == "text") {
        return `
        <div class="form-group">
            <label for="${input.name}">${input.name.capitalize()}</label>
            <input type="text" value="${input.value||""}" class="form-control" id=${input.name}  name=${input.name} placeholder="${input.placeholder||""}">
        </div>`;
    } else if (input.type == "number") {
        return `
        <div class="form-group">
            <label for="${input.name}">${input.name.capitalize()}</label>
            <input type="number" value="${input.value||1}" class="form-control" id=${input.name}  name=${input.name} ${(input.disabled||input.readonly)?"readonly=\"readonly\"":""}>
        </div>`;
    } else if (input.type == "hidden") {
        return `
            <input type="hidden" value=${input.value||""} id=${input.name}  name=${input.name}>
            `;
    } else if (input.type == "select") {
        return `
        <div class="form-group">
            <label for="${input.name}">${input.name.capitalize()}</label>
            <select value="1" class="form-control" id=${input.name} name=${input.name}>
                ${h_formSelect_options(input.options)}
            </select>
        </div>`;
    } else if (input.type == "textarea") {
        return `
        <div class="form-group">
            <label for="${input.name}">${input.name.capitalize()}</label>
            <textarea rows="8" value="${input.value||""}" placeholder="${input.placeholder||""}" class="form-control" id="${input.name}"  name="${input.name}">${input.value||""}</textarea>
        </div>`;
    } else if (input.type == "password") {
        return `
        <div class="form-group">
            <label for="${input.name}">Password</label>
            <input type="password" name=${input.name} class="form-control" id="${input.name}" placeholder="Password">
        </div>`;
    } else {
        return `<p> NOT MANAGED INPUT TYPE: ${input.type}</p>`;
    }
}

function h_formSelect_options(options) {
    let html = ``;

    options.forEach(element => {
        html+=`<option value="${element.value}">${element.display}</option>`
    });

    return html;
}