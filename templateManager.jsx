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
    t_OIT_Dashboard: function (body_data) {
        let html = `<script>function init(){}</script><div class="container-fluid">`
        body_data.blocks.forEach(element => {
            switch (element.type) {
                case "complex_header":
                    html += h_complexHeader(element.data);
                    break;

                default:
                    break;
            }
        });
        html += `</div>`

        return html;
    }


}
/**
 * @typedef {Object} HTML_Action
 * @property {string} type
 * @property {string} path
 * @property {Object} data
 * 
 * @typedef {Object} HeaderBlock
 * @property {string} type
 * @property {string} text
 * @property {string} position
 * @property {string} id
 * @property {string} class
 * @property {string} value
 * @property {Array<string>} options
 * @property {Array<HTML_Action>} onChange
 * @property {Array<HTML_Action>} onClick
 * @property {Array<HTML_Action>} onEnter
 * 
 * @param {Array<HeaderBlock>} block_data 
 */
function h_complexHeader(block_data) {
    //creates basic header container
    let html = `
        <div style="border-bottom: 1px solid rgb(175, 175, 175);height: fit-content;height: 3rem;" class="row">
            <div class="col-md-12">`;
            //creates left side
            html += `
                <div style="position: absolute;left: 0;height: 3rem;width: max-content;">
                    <div style="width: fit-content;padding-left: 40px;" class="row">`
                        block_data.forEach(element => {
                            if(element.position == "left"){
                                html += h_complexHeader_element(element);
                            }
                        });
            html+=`
                    </div>
                </div>`


            //creates right side

            html += `
                <div style="position: absolute;right: 0;height: 3rem;width: max-content;">
                    <div style="width: fit-content;padding-right: 40px;" class="row">`
                        block_data.forEach(element => {
                            if(element.position == "right"){
                                html += h_complexHeader_element(element);
                            }
                        });
            html+=`
                    </div>
                </div>`


    html += `
            </div>
        </div>`;
    return html;
}

/**
 * 
 * @param {HeaderBlock} element_data 
 */
function h_complexHeader_element(element_data){
    let html = `
        <div style="font-size: 1.5rem;${(element_data.type == "title"?"font-family: Lobster;":"")} padding:5px 15px;width: fit-content;">`
            switch (element_data.type) {
                case "title":
                    html += `<h3 id="${element_data.id||""}" >${element_data.text}</h3>`;
                    break;

                case "selector":
                    html += `
                        <select class="form-control" id="${element_data.id||""}">`

                        element_data.options.forEach(option => {
                            html+=`<option value="${option}" ${element_data.value == option?"selected":""}>${option}</option>`;
                        });
                    html+=`
                        </select>`;
                    break;

                case "button":
                    html += `
                        <input class="form-control btn-primary" type="button" id="${element_data.id||""}" value="${element_data.value||element_data.text}">`;
                    break;

                case "search_bar":
                    html += `
                        <input type="text" class="form-control" placeholder="Search ..." id="${element_data.id||""}">`;
                    break;
            
                default:
                    break;
            }

            if(element_data.onChange||element_data.onClick||element_data.onEnter){
                html+="<script type='text/javascript'>";
                    html+=h_complexHeader_actions(element_data);
                html+="</script>";
            }
    html +=`
        </div>`

    return html;
}

/**
 * 
 * @param {HeaderBlock} element_data 
 */
function h_complexHeader_actions(element_data){

    let html=``

        if(element_data.onChange){
            html+=`
            $('#${element_data.id}').change(function(){`
                element_data.onChange.forEach(element => {
                    if(element.type == "redirect"){
                        html+=`window.location.replace("${element.path}?${Object.keys(element.data)[0]}="+ ${element.data[Object.keys(element.data)[0]]})`;
                    }
                });
            html+=`});
            `
        }
        if(element_data.onClick){
            html+=`
            $('#${element_data.id}').click(function(){`
                element_data.onClick.forEach(element => {
                    if(element.type == "redirect"){
                        html+=`window.location.replace("${element.path}?${Object.keys(element.data)[0]}="+ "${element.data[Object.keys(element.data)[0]]}")`;
                    }
                });
            html+=`});
            `
        }
        if(element_data.onEnter){
            html+=`
            $('#${element_data.id}').change(function(){`
                element_data.onEnter.forEach(element => {
                    if(element.type == "redirect"){
                        html+=`window.location.replace("${element.path}?${Object.keys(element.data)[0]}="+ "${element.data[Object.keys(element.data)[0]]}&query="+this.value)`;
                    }
                });
            html+=`});
            `
        }

    return html;
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