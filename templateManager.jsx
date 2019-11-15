const OSInterface = require('./OnionServices').OSInterface;
const dbClient = require("./dbManager").dbClient;

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
        let html = ``;
        html += (head.title ? `<title>${head.title}</title>` : ``);
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
    /**
     * 
     * @param {BodyData} body 
     */
    t_characters: async function (body) {   

        let html = `<div  class="container-fluid">`;
        for(var i=0;i<body.blocks.length;i++){
            let element = body.blocks[i];

            html += `<div class="row">`;
            if (element.type == "header") {
                html +=  h_header(element);
            } else if (element.type == "title") {
                html += `
                <div class="col-md-11 offset-md-1 title">
                    ${element.text}
                </div>`
            } else if(element.type == "card_block"){
                let _cards = await dbClient.query_promise("personaggi", { giocatore: body.request_data.user.username});
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
    t_personaggio:async function(body){
        let _temp = await dbClient.query_promise("personaggi",{giocatore:body.request_data.user.username,nome:body.request_data.charname});
        let _char = _temp[0];

        let html =`<div  class="container-fluid">`;
        for(var i=0;i<body.blocks.length;i++){
            let element = body.blocks[i];

            html += `<div class="row">`;

            if (element.type == "header") {
                html +=  h_header(element);
            } else if (element.type == "character_page") {
                html += `${JSON.stringify(_char)}`;
            }

            html += "</div>";
        }
        return html+"</div>";
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

function h_cardBlock(card_block){
    let result = `<div class="col-md-10 offset-md-1 card_block"><div class="row">`;
    if(card_block.cards.length <= 0)
        return result + "<p>Nessun Personaggio Presente sull'account</p></div></div>"
    card_block.cards.forEach(element => {
        result+=`
            <div class="col-md-4">
                <a href="/personaggio?charname=${element.nome}"><div class = card>
                    <h3>${element.nome}</h3>
                    <h4>${element.classe}: lv.${element.livello}</h4>
                    <h5>${element.razza}</h5>
                </div><a>
            </div>
        `;
    });
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
        return `<button type="submit" class="btn btn-info">Submit</button>`;
    } else if (input.type == "username") {
        return `
        <div class="form-group">
            <label for="${input.name}">Username</label>
            <input type="text" class="form-control" id=${input.name} aria-describedby="emailHelp" name=${input.name} placeholder="Enter Username">
            <small id="emailHelp" class="form-text text-muted">We'll never share your data with anyone else.</small>
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