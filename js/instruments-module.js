var instrumentsModule = (function instrumentsModule() {
    var instrumentsModule = (function () {
        var instruments,
            CONSTANTS = {
                API_KEY: 'TNgVNbBpEOMFJ0T8',
                STRING_MIN_VALUE: 3,
                STRING_MAX_VALUE: 50
            };
        var validator = {
            validateIfUndefined: function (value, name) {
                name = name || 'Value';
                if (typeof  value === 'undefined') {
                    throw new Error(name + ' should not be undefined.');
                }
            },
            validateIfOfType: function (value, type, name) {
                name = name || 'Value';
                if (typeof  value !== type) {
                    throw new Error(name + ' should be  of type ' + type);
                }
            },
            validateString: function (value, name) {
                var valLength;
                name = name || 'Value';
                this.validateIfUndefined(value, name);
                this.validateIfOfType(value, 'string', name);
                valLength = value.length;
                if (valLength < CONSTANTS.STRING_MIN_VALUE
                    || valLength > CONSTANTS.STRING_MAX_VALUE) {
                    throw new Error(name + ' length should be between '
                    + CONSTANTS.STRING_MIN_VALUE + ' and ' + CONSTANTS.STRING_MAX_VALUE);
                }
            },
            validateNumber: function (value, name) {
                value = +value;
                name = name || 'Value';
                this.validateIfUndefined(value, name);
                this.validateIfOfType(value, 'number', name);
                if (value < 1) {
                    throw new Error(name + ' should be positive');
                }
            }
        };
        instruments = (function () {
            var instruments =  Object.create({});

            Object.defineProperty(instruments, 'init', {
                value: function () {
                    this.db = new Everlive(CONSTANTS.API_KEY);
                    return this;
                }
            });
            Object.defineProperty(instruments, 'create', {
                value: function (brand, model, count) {
                    try {
                        validator.validateString(brand, 'Brand')
                    }
                    catch(err) {
                        return err.message;
                    }
                    try {
                        validator.validateString(model, 'Model')
                    }
                    catch(err) {
                        return err.message;
                    }
                    try {
                        validator.validateNumber(count, 'Count')
                    }
                    catch(err) {
                        return err.message;
                    }
                    var info = {
                        "Brand": brand,
                        "Model": model,
                        "Count": count,
                        "AvailableCount": count
                    };
                    var self = this;
                    var data = self.db.data('Instrument');

                    return data.create(info);
                }
            });
            Object.defineProperty(instruments, 'listInstruments', {
                value: function (options) {
                    var query = new Everlive.Query();
                    var data = this.db.data('Instrument');
                    if(options){

                        switch(options){
                            case 'available':
                                query.where().gt('AvailableCount', 0);
                                break;
                            case 'unavailable':
                                query.where().lt('AvailableCount', 1);
                                break;
                        }}
                        return data.get(query);

                }
            });
            Object.defineProperty(instruments, 'listSiteInstruments', {
                value: function (siteId) {
                    var query = new Everlive.Query();
                    var data = this.db.data('ConstructionSite');


                    var expandExp = {
                        "Instruments" : {
                            "TargetTypeName" : "Instrument"
                        }
                    };
                    query.expand(expandExp);
                    return data.get(query);
                }
            });
            Object.defineProperty(instruments, 'renderSiteInstruments', {
                value: function (obj) {
                    var counts = obj.InstrumentsCount;
                    var instruments = obj.Instruments;
                    instruments.forEach(function(instr, id){
                        var curCount;
                        counts.some(function(text){
                            if(text.indexOf(instr.Id)){

                                text = JSON.parse(text);
                                curCount = text.count;
                                return true;
                            }

                        });

                        instruments[id]['SiteCount'] = curCount;

                    });
                    return instruments;
                }
            });
            return instruments;
        }());


        Object.defineProperty(instruments, 'filterTableOnButtonClick', {
            value: function () {

                $("#container").on("click", "#instruments-admin-page .instruments-filter", function(e){
                    e.preventDefault();
                    var type = $(this).attr('id');
                    if(type == 'all'){
                        type = null;
                    }

                    instrumentsManager.listInstruments(type).then(function(result){
                        var options = {
                            "instruments": result.result
                        };

                        var userRole = localStorage.getItem('userRole');
                        if(userRole == 'admin'){
                            options['admin']  = true;
                        }
                        templateManager.loadTemplate('instruments.html', options, " | Instruments", null, function(){
                            generalManager.loadTablePlugin();
                            $(".instruments-filter").removeClass('active');
                            $("#instruments-admin-page #"+type).addClass('active');
                        });
                    });

                });
            }
        });
        Object.defineProperty(instruments, 'submitCreateForm', {
            value: function () {
                var self = this;
                $("#container").on("click", "#new-instrument #submit", function (e) {
                    // prevent page reloading and default button clicking action
                    e.preventDefault();
                    //get the form values
                    var brand = $("#new-instrument #brand").val(),
                        model = $("#new-instrument #model").val(),
                        count = $("#new-instrument #count").val(),
                    // try to create the instrument
                        result = self.create(brand, model, count);
                    //if the creation was successful redirect to instruments page
                    if (typeof result !== "object") {
                        //window.location.hash = '#/instruments';
                        alert(result.toString());
                    } else {
                        result.then(function(){
                            window.location.hash = '#/instruments';
                        }, function(error){
                            alert(JSON.stringify(error));
                        })
                    }
                });
            }
        });
        return {
            getInstruments: function () {
                return Object.create(instruments).init();
            }
        };
    }());
    return instrumentsModule;
}());


