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
    /**
     * Custom Template for the homapage
     * @param {JSON} body 
     */
    homeBodyTemplate: function (body) {
        let html = ``;
        body.blocks.forEach(element => {
            if (element.type == "title") {
                html += `<h1>${element.text}</h1>`;
            }
        });
        return html;
    },

    loginTemplate: function (data) {
        let result = `
        <div  class="container-fluid body">`;

        /**
         * Form input confing
         * @typedef {Object} Form.Input
         * @property {string} type
         * @property {string} name
         * @property {string} message
         */

        data.blocks.forEach(element => {
            result += `<div class="row">`;
            if(element.type == "title"){
                result+=`
                    <div class="col-md-11 offset-md-1 title">
                        ${element.text}
                    </div>
                `;
            }
            else if (element.type == "header") {
                result+=`
                    <div class="col-md-12" id="header">
                        ${element.text}
                    </div>
                `;
            } else if (element.type == "form") {
                result += `<div class="col-md-4 offset-md-1"><form class="form" action=${element.action} method=${element.method}>`;

                element.inputs.forEach(_input => {

                    /**
                     * @type {Form.Input}
                     */
                    var input = _input;

                    if (input.type == "submit") {
                        result += `<button type="submit" class="btn btn-info">Submit</button>`;
                    } else if (input.type == "username") {
                        result += `
                        <div class="form-group">
                            <label for="${input.name}">Username</label>
                            <input type="text" class="form-control" id=${input.name} aria-describedby="emailHelp" name=${input.name} placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your data with anyone else.</small>
                        </div>`;
                    } else if (input.type == "password") {
                        result += `
                        <div class="form-group">
                            <label for="${input.name}">Password</label>
                            <input type="password" name=${input.name} class="form-control" id="${input.name}" placeholder="Password">
                        </div>`;
                    } else {
                        result += `<p> NOT MANAGED INPUT TYPE: ${input.type}</p>`;
                    }
                });
                result += `</form></div>`;
            }
            result += `</div>`
        });

        result += `</div>`;

        return result;
    }
}