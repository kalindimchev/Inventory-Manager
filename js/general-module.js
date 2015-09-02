function generalModule() {
    var generalModule = (function () {
        var templateManager,
            CONSTANTS = {
                "container": "#container",
                "templatesFolder": "templates/",
                "titleBase": "Inventory Manager",
                "sidebarContent": {
                    "administrator": [
                        {
                            "classes": "",
                            "link": "#/construction-sites",
                            "content": "<i class='fa fa-university fa-lg'></i> Construction Sites"

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
                    "manager": []
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

        return {
            getTemplateManager: function () {
                return Object.create(templateManager).init();
            },
            constants: CONSTANTS
        };
    }());
    return generalModule;
}


