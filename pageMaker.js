const routingMap = require("./routeMapper").routingMap;
const OSInterface = require("./OnionServices").OSInterface;

/**
 * Assembles the head and the body of the html page
 * @param {string} head 
 * @param {string} body 
 */
function assemble(head, body) {
    let html = `
    <html>
    <head>
    ${head}
    </head>
    <body onload="init()">
    ${body}
    </body>
    </html>
    `;

    return html;
}
/**
 * 
 * @param {JSON} data 
 * @param {JSON} template 
 */
async function makePage(pathName, req, callback) {

    let _data = OSInterface.getData(req);
    _data.user = OSInterface.getUser(req);

    console.log(_data);

    let data_body = await routingMap[pathName].data.body(_data);
    let data_head = await routingMap[pathName].data.head(_data);

    let template_head = routingMap[pathName].template.head;
    let template_body = routingMap[pathName].template.body;

    data_body.request_data = _data;
    data_head.request_data = _data;

    let head_html = await template_head(data_head);
    let body_html = await template_body(data_body);

    callback(assemble(head_html, body_html));
}

exports.makePage = makePage;