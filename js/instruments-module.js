function instrumentsModule() {
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
            return instruments;
        }());

        return {
            getInstruments: function () {
                return Object.create(instruments).init();
            }
        };
    }());
    return instrumentsModule;
}


