/**
 * Assembles the head and the body of the html page
 * @param {string} head 
 * @param {string} body 
 */
function assemble(head,body){
    let html = `
    <html>
    <head>
    ${head}
    </head>
    <body>
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
function makePage(data,template) {
    return assemble(template.head(data.head),template.body(data.body));
}

exports.makePage = makePage;