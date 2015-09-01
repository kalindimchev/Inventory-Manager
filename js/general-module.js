function generalModule() {
    var generalModule = (function () {
        var templateManager,
            CONSTANTS = {
                "container": "#container",
                "templatesFolder": "templates/",
                "titleBase": "Inventory Manager"
            };
        /**
         * The purpose of the templateManager Object is to manage and load the partials templates in the index.html #container div
         * It caches the already requested templates
         * and changes the page's title
         */
        templateManager = (function () {
            var currentPlayerId = 0,
                templateManager = Object.create({});

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
                            resolve(this.templates[templateName]);
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
                value: function (templateName, options, title) {
                    options = options || {};
                    title = title || '';
                    document.title = CONSTANTS.titleBase + title;
                    var self = this;
                    self.container.empty();
                    self.getTemplate(templateName)
                        .then(function (templateHTML) {
                            var template = Handlebars.compile(templateHTML);
                            var html = template(options);
                            self.container.append(html);
                        });
                    return this;
                }
            });

            return templateManager;
        }());

        return {
            getTemplateManager: function () {
                return Object.create(templateManager).init();
            }
        };
    }());
    return generalModule;
}


