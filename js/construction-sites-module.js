var sitesModule = (function sitesModule() {
    var sitesModule = (function () {
        var sites,
            CONSTANTS = {
                API_KEY: 'TNgVNbBpEOMFJ0T8',
                STRING_MIN_VALUE: 3,
                STRING_MAX_VALUE: 50
            },
            validator = {};

        sites = (function () {
            var sites =  Object.create({});

            Object.defineProperty(sites, 'init', {
                value: function () {
                    this.db = new Everlive(CONSTANTS.API_KEY);
                    return this;
                }
            });
            Object.defineProperty(sites, 'create', {
                value: function (name, location, description, picture) {
                    var info = {
                        "SiteName": name,
                        "Location": location,
                        "Description": description,
                        "Picture": picture
                    };
                    var self = this;
                    var data = self.db.data('ConstructionSite');

                    return data.create(info);
                }
            });
            Object.defineProperty(sites, 'listSites', {
                value: function () {
                    var query = new Everlive.Query();
                    var data = this.db.data('ConstructionSite');
                    return data.get(query);
                }
            });
            return sites;
        }());


        Object.defineProperty(sites, 'submitCreateForm', {
            value: function () {
                var self = this;
                $("#container").on("click", "#new-site #submit", function (e) {
                    // prevent page reloading and default button clicking action
                    e.preventDefault();
                    //get the form values
                    var location = $("#new-site #location").val(),
                        name = $("#new-site #name").val(),
                        description = $("#new-site #description").val(),
                        picture = $("#new-site #picture").val(),
                    // try to create the construction site
                        result = self.create(name, location, description, picture);
                    //if the creation was successful redirect to instruments page
                    if (typeof result !== "object") {
                        //window.location.hash = '#/instruments';
                        alert(result.toString());
                    } else {
                        result.then(function(){
                            window.location.hash = '#/construction-site';
                        }, function(error){
                            alert(JSON.stringify(error));
                        })
                    }
                });
            }
        });
        return {
            getSites: function () {
                return Object.create(sites).init();
            }
        };
    }());
    return sitesModule;
}());