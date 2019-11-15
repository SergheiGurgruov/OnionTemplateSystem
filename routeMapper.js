const templateManager = require("./templateManager.jsx");
const fs = require("fs");
const dbClient = require("./dbManager").dbClient;
const OSInterface = require("./OnionServices").OSInterface;


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
                    scripts: []
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
    '/handlebarsProject': {
        data: {
            head: function () {
                return {
                    title: "Handlebars-proj",
                    styles: ["bootstrap.min.css", "handlebars-style.css"],
                    scripts: []
                }
            },
            body: function () {
                return {
                    blocks: []
                }
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: function (body) {
                return `<div class="container-fluid" id="pagina"> <div class="row" style="height:undefined;background-color: #B3E85C;"> <div class="header" style="font-size:60px;"> header </div></div><br><br><div class="row" style="font-size:30px;margin-left:30px;"> Questo e' un titolo </div><div class="row"> <div class="col-md-11 paragraph"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div></div><div class="row"> <div class="col-md-12" style="padding:40px 0px;"> <div class="row" style="margin: 0px 30px;"> <div class="col-md-3 card"> <img src=https://a0.muscache.com/im/pictures/998b4270-25d7-4850-8ccf-4350b9a5ab05.jpg> <div class="cardText"> Parigi </div></div><div class="col-md-3 card"> <img src=https://a0.muscache.com/im/pictures/60145c65-7c36-4ac5-8129-6ae9a0d27a81.jpg> <div class="cardText"> Tokyo </div></div><div class="col-md-3 card"> <img src=https://a0.muscache.com/im/pictures/6729455e-af21-4dc3-bfdf-332393d407a8.jpg> <div class="cardText"> Londra </div></div><div class="col-md-3 card"> <img src=https://a0.muscache.com/im/pictures/82af5bc4-ed5b-44d9-9209-ac0f2fbf8986.jpg> <div class="cardText"> Los Angeles </div></div></div></div></div><div class="row" style="font-size:30px;margin-left:30px;"> Questo e' un'altro titolo </div><div class="row"> <div class="col-md-5 paragraph"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </div><div class="col-md-6"> <img src=img1.png> </div></div><br><br><div class="row" style="background-color:#B3E85C;height:70px;"> </div></div>`
            }
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
                        ],
                    scripts: []
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
                            type: "character_page",
                            data:{} //to fill in template
                        }
                    ]
                }
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.t_personaggio,
        }
    }
}


exports.routingMap = routingMap;