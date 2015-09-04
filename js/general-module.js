var generalModule = (function generalModule() {
    var generalModule = (function () {
        var templateManager,
            oTable,
            generalManager,
            CONSTANTS = {
                "container": "#container",
                "templatesFolder": "templates/",
                "titleBase": "Inventory Manager",
                "sidebarContent": {
                    "administrator": [
                        {
                            "classes": "",
                            "link": "#/construction-sites",
                            "content": "<i class='fa fa-university fa-lg'></i> Construction Sites",
                            "subitems": [
                                {
                                    "classes": "",
                                    "link": "#/construction-site",
                                    "content": " List"
                                },
                                {
                                    "link": "#/new-site",
                                    "content": " Add Construction site"
                                },
                            ]
                        },
                        {
                            "classes": "",
                            "link": "#/requests",
                            "content": "<i class='fa fa-cogs fa-lg'></i> Instruments Requests"

                        },
                        {
                            "link": "#/instruments",
                            "content": "<i class='fa fa-cogs fa-lg'></i> Instruments",
                            "subitems": [
                                {
                                    "classes": "",
                                    "link": "#/instruments",
                                    "content": " List"
                                },
                                {
                                    "link": "#/new-instrument",
                                    "content": " Add Instrument"
                                },
                            ]
                        }
                    ],
                    "manager": [
                        {
                            "classes": "",
                            "link": "#/construction-site",
                            "content": "<i class='fa fa-university fa-lg'></i> Construction Site"

                        },
                        {
                            "classes": "",
                            "link": "#/instruments",
                            "content": "<i class='fa fa-cogs fa-lg'></i>All Instruments"

                        },
                        {
                            "classes": "",
                            "link": "#/site-instruments",
                            "content": "<i class='fa fa-cogs fa-lg'></i>Site Instruments"

                        },
                        {
                            "classes": "",
                            "link": "#/requests",
                            "content": "<i class='fa fa-cogs fa-lg'></i> Instruments Requests"

                        }
                    ]
                }
            };
        /**
         * The purpose of the templateManager Object is to manage and load the partials templates in the index.html #container div
         * It caches the already requested templates
         * and changes the page's title
         */
        templateManager = (function () {
            var templateManager = Object.create({});

            Object.defineProperty(templateManager, 'init', {
                value: function () {
                    this.container = $(CONSTANTS.container);
                    this.templates = {};
                    return this;
                }
            });
            Object.defineProperty(templateManager, 'getTemplate', {
                value: function (templateName) {
                    var self = this;
                    var promise = new Promise(function(resolve, reject) {
                        var url = CONSTANTS.templatesFolder + templateName;
                        if (self.templates[templateName]) {
                            resolve(self.templates[templateName]);
                            return;
                        }
                        $.ajax({
                            url: url,
                            success: function(html) {
                                resolve(html);
                                self.templates[templateName] = html;
                            },
                            error: function(err) {
                                reject(err);
                            }
                        });
                    });

                    return promise;
                }
            });
            Object.defineProperty(templateManager, 'loadTemplate', {
                value: function (templateName, options, title, container,cb) {
                    options = options || {};
                    title = title || '';
                    container = container || this.container;
                    document.title = CONSTANTS.titleBase + title;
                    var self = this;
                    if(templateName == 'vertical-navigation.html'){
                        self.container.css('margin-left', '310px');
                    }
                    container.empty();
                    self.getTemplate(templateName)
                        .then(function (templateHTML) {
                            var template = Handlebars.compile(templateHTML);
                            var html = template(options);
                            container.append(html);
                            
                            // added an optional callback to attach events to template elements
                            // after they have been loaded
                            
                            if(typeof cb === 'function') {
                                cb();
                            } 
                        });
                    return this;
                }
            });

            return templateManager;
        }());
        generalManager = (function () {
            var generalManager = Object.create({});

            Object.defineProperty(generalManager, 'init', {
                value: function () {
                    this.templateManager = templateManager.init();
                    this.container = $(CONSTANTS.container);
                    return this;
                }
            });
            Object.defineProperty(generalManager, 'toggleActiveButtons', {
                value: function () {
                    // make pressed top navigation bar button pressed
                    $("#main nav").on("click", ".nav-btn", function () {
                        $("#main nav .nav-btn").removeClass("active");
                        $(this).addClass("active");
                    });
                    // make pressed side navigation bar button pressed
                    $("#side-navigation-container").on("click", ".nav-btn", function () {
                        $("#side-navigation-container li").removeClass("active");
                        $("#side-navigation-container .nav-btn").removeClass("active");
                        var parent = $(this).parents(".sub-menu");
                        if (parent.length > 0) {
                            parent.prev().addClass("active");
                        }
                        $(this).addClass("active");
                    });
                }
            });
            Object.defineProperty(generalManager, 'loadTablePlugin', {
                value: function () {
                        setTimeout(function(){     if(typeof oTable != "undefined"){ oTable.fnDestroy();}
                            oTable = $('.datatable').dataTable()}, 200);
                        ;

                }
            });
            Object.defineProperty(generalManager, 'loadSideMenu', {
                value: function () {
                    var self = this;
                    var user = localStorage.getItem('user');
                    var userRole = localStorage.getItem('userRole');
                    if(user){
                        $('#sign-in-anchor').html(user).attr('href', '#/instuments');
                        $('#reg-anchor').html('Sign out').attr('href', '#/logout');
                        if(userRole === 'admin'){

                            self.templateManager.loadTemplate("vertical-navigation.html", { "items": generalModule.constants.sidebarContent.administrator }, "", $("#side-navigation-container"));
                        } else {

                            self.templateManager.loadTemplate("vertical-navigation.html", { "items": generalModule.constants.sidebarContent.manager }, "", $("#side-navigation-container"));

                        }}
                }
            });
            return generalManager;
        }());

        return {
            getTemplateManager: function () {
                return Object.create(templateManager).init();
            },
            getGeneralManager: function () {
                return Object.create(generalManager).init();
            },
            constants: CONSTANTS
        };
    }());
    return generalModule;
}());