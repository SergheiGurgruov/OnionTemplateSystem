const templateManager = require("./templateManager.jsx");
const fs = require("fs");
const dbClient = require("./dbManager").dbClient(global.db_type);
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
                    title: "Dashboard",
                    styles:
                        [
                            "bootstrap.min.css",
                            "https://fonts.googleapis.com/css?family=Lobster&display=swap",
                            "global.css",
                        ],
                    scripts:
                        [
                            "jquery.js"
                        ]
                }
            },
            body: async function (_data) {
                let user_data = (await dbClient.query_promise("users", { "username": _data.user.username }))[0];
                //console.log(_cards);
                return {
                    blocks: [
                        {
                            type: "complex_header",
                            data: [
                                {
                                    type: "title",
                                    text: "Onion Issue Tracker",
                                    position: "left"
                                },
                                {
                                    type: "selector",
                                    options: user_data.progetti,
                                    position: "right",
                                    value: (_data.proj || user_data.progetti[0] || ""),
                                    id: "selector_project",
                                    onChange: [
                                        {
                                            type: "redirect",
                                            path: "/",
                                            data: {
                                                "proj": "this.value"
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: "button",
                                    text: "Open Issue",
                                    position: "right",
                                    id: "button_openIssue",
                                    onClick: [
                                        {
                                            type: "redirect",
                                            path: "/OpenIssue",
                                            data: {
                                                "proj": (_data.proj || user_data.progetti[0])
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: "search_bar",
                                    position: "right",
                                    id: "search_bar",
                                    onEnter: [
                                        {
                                            type: "redirect",
                                            path: "/Search",
                                            data: {
                                                "proj": (_data.proj || user_data.progetti[0])
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        },
        template: {
            head: templateManager.defaultHeadTemplate,
            body: templateManager.t_OIT_Dashboard
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
    }
}

exports.routingMap = routingMap;