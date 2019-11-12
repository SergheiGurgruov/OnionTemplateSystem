const templateManager = require("./templateManager.jsx");


//BEWARE!! if using subpaths (ex: /home/mainpage)
//you should put your asset-files in the proper subfolder 
//(ex: ./assets/css/home/style.css)
//(ex: ./assets/images/home/myImage.png)

const routingMap = {
    '/': {
        data: {
            head: {
                title: "Home",
                styles: ["bootstrap.min.css"],
                scripts: []
            },
            body: {
                blocks: [
                    {
                        type: "title",
                        text: "Benvenuto alla HomePage"
                    }
                ]
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.homeBodyTemplate
        }
    },
    '/contact': {
        data: {
            head: {
                title: "Home",
                styles: ["bootstrap.min.css"],
                scripts: []
            },
            body: {
                blocks: [
                    {
                        type: "title",
                        text: "Benvenuto alla Pagina Contatti"
                    }
                ]
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.homeBodyTemplate
        }
    },
    '/handlebarsProject': {
        data: {
            head: {
                title: "Handlebars-proj",
                styles: ["bootstrap.min.css", "handlebars-style.css"],
                scripts: []
            },
            body: {
                blocks: []
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
            head: {
                title: "Form",
                styles:
                    [
                        "bootstrap.min.css",
                        "form.css",
                        "https://fonts.googleapis.com/css?family=Lobster&display=swap"
                    ],
                scripts: []
            },
            body: {
                blocks: [
                    {
                        type: "header",
                        text: "Onion Issue Tracker",
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
                                type: "email",
                                name: "email"
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
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.loginTemplate
        }
    }
}


exports.routingMap = routingMap;