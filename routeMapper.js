const templateManager = require("./templateManager.jsx");
const fs = require("fs");
const dbClient = require("./dbManager").dbClient(global.db_type);
const OSInterface = require("./OnionServices").OSInterface;
const util = require("./util");


//BEWARE!! if using subpaths (ex: /home/mainpage)
//you should put your asset-files in the proper subfolder 
//(ex: ./assets/css/home/style.css)
//(ex: ./assets/images/home/myImage.png)



const routingMap = {
    '/': {
        data: {
            head: function () {
                return {
                    title: "Personaggi",
                    styles:
                        [
                            "bootstrap.min.css",
                            "https://fonts.googleapis.com/css?family=Lobster&display=swap",
                            "global.css",
                            "characters.css"
                        ],
                    scripts: [
                        "jquery.js"
                    ]
                }
            },
            body: async function () {
                
                //console.log(_cards);
                return {
                    blocks: [
                        {
                            type: "header",
                            text: "C3D's Pathfinder Tool",
                        },
                        {
                            type: "title",
                            text: "I Tuoi Personaggi",
                        },
                        {
                            type: "card_block",
                            cards:[] //does query inside template
                        }
                    ]
                }
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.t_characters
        }
    },
    '/login': {
        data: {
            head: function () {
                return {
                    title: "Login",
                    styles:
                        [
                            "bootstrap.min.css",
                            "https://fonts.googleapis.com/css?family=Lobster&display=swap",
                            "global.css",
                            "form.css",
                        ],
                    scripts: []
                }
            },
            body: function () {
                return {
                    blocks: [
                        {
                            type: "header",
                            text: "C3D's Pathfinder Tool",
                        },
                        {
                            type: "title",
                            text: "Login",
                        },
                        {
                            type: "form",
                            action: "login.onioncall",
                            method: "post",
                            inputs: [
                                {
                                    type: "username",
                                    name: "username"
                                },
                                {
                                    type: "password",
                                    name: "password"
                                },
                                {
                                    type: "submit",
                                }
                            ]
                        }
                    ]
                }
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.loginTemplate
        }
    },
    '/personaggio':{
        data: {
            head: function () {
                return {
                    title: "Personaggio",
                    styles:
                        [
                            "bootstrap.min.css",
                            "https://fonts.googleapis.com/css?family=Lobster&display=swap",
                            "global.css",
                            "t_personaggio.css",
                        ],
                    scripts: [
                        "jquery.js",
                        "pathfinder_util.js",
                        "char_sheet.js",
                    ]
                }
            },
            body: async function () {
                //console.log(_cards);
                return {
                    blocks: []
                }
            }
        },
        template: {
            head: templateManager.t_personaggio_head,
            body: templateManager.t_personaggio,
        }
    },
    "/createChar":{
        data: {
            head: function () {
                return {
                    title: "Nuovo Personaggio",
                    styles:
                        [
                            "bootstrap.min.css",
                            "https://fonts.googleapis.com/css?family=Lobster&display=swap",
                            "global.css",
                            "form.css",
                        ],
                    scripts: [
                        "jquery.js"
                    ]
                }
            },
            body: async function (_data) {
                let class_options = [];
                let race_options = [];

                let classes = await dbClient.query_promise("classi",{});
                let races = await dbClient.query_promise("razze",{})

                classes.forEach(element => {
                    class_options.push({
                        value:element.nome,
                        display:element.nome.capitalize()
                    })
                });

                races.forEach(element => {
                    race_options.push({
                        value:element.nome,
                        display:element.nome.capitalize()
                    })
                });

                return {
                    blocks: [
                        {
                            type: "header",
                            text: "C3D's Pathfinder Tool",
                        },
                        {
                            type: "title",
                            text: "Nuovo Personaggio",
                        },
                        {
                            type: "form",
                            action: "createChar.onioncall",
                            method: "post",
                            inputs: [
                                {
                                    type: "text",
                                    name: "nome",
                                    placeholder:"Nome Personaggio"
                                },
                                {
                                    type: "select",
                                    name:"classe",
                                    options:class_options
                                },
                                {
                                    type: "select",
                                    name:"razza",
                                    options:race_options
                                },
                                {
                                    type: "number",
                                    name:"livello"
                                },
                                {
                                    type: "submit",
                                    text:"Crea Personaggio"
                                }
                            ]
                        }
                    ]
                }
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.genericFormTemplate
        }
    },
    "/editSpell":{
        data: {
            head: function () {
                return {
                    title: "Edit Spell",
                    styles:
                        [
                            "bootstrap.min.css",
                            "https://fonts.googleapis.com/css?family=Lobster&display=swap",
                            "global.css",
                            "form.css",
                        ],
                    scripts: [
                        "formUtil.js",
                        "jquery.js"
                    ]
                }
            },
            body: async function (_data) {

                let spell = await dbClient.queryOne("spells",{"id":parseInt(_data.id)});

                return {
                    blocks: [
                        {
                            type: "header",
                            text: "C3D's Pathfinder Tool",
                        },
                        {
                            type: "title",
                            text: "Modifica Spell",
                        },
                        {
                            type: "form",
                            action: "editSpell.onioncall",
                            method: "post",
                            inputs: [
                                
                                {
                                    type: "number",
                                    name: "id",
                                    value:spell["id"],
                                    disabled:true
                                },
                                {
                                    type: "text",
                                    name: "nome",
                                    value:spell["nome"]
                                },
                                {
                                    type: "text",
                                    name: "tiro_salvezza",
                                    value:spell["tiro salvezza"]
                                },
                                {
                                    type: "text",
                                    name: "componenti",
                                    value:spell["componenti"]
                                },
                                {
                                    type: "text",
                                    name: "tempo_di_lancio",
                                    value:spell["tempo di lancio"]
                                },
                                {
                                    type: "text",
                                    name: "bersaglio",
                                    value:spell["bersaglio"]
                                },
                                {
                                    type: "text",
                                    name: "raggio_di_azione",
                                    value:spell["raggio di azione"]
                                },
                                {
                                    type: "text",
                                    name: "area",
                                    value:spell["area"]
                                },
                                {
                                    type: "text",
                                    name: "durata",
                                    value:spell["durata"]
                                },
                                {
                                    type: "text",
                                    name: "effetto",
                                    value:spell["effetto"]
                                },
                                {
                                    type: "text",
                                    name: "descrizione_breve",
                                    value:spell["descrizione breve"]
                                },
                                {
                                    type: "textarea",
                                    name: "descrizione",
                                    value:spell["descrizione"]
                                },
                                {
                                    type: "submit",
                                    text:"Modifica Spell"
                                }
                            ]
                        }
                    ]
                }
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.genericFormTemplate
        }
    },
}

exports.routingMap = routingMap;