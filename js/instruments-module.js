function instrumentsModule() {
    var instrumentsModule = (function () {
        var instruments,
            CONSTANTS = {
                API_KEY: 'TNgVNbBpEOMFJ0T8'
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
                    var info = {
                        "Brand": brand,
                        "Model": model,
                        "Count": count,
                        "AvailableCount": count
                    };
                    var self = this;
                    var data = self.db.data('Instrument');

                    data.create(info).then(
                        function(data){
                            //alert(JSON.stringify(data));
                        },
                        function(error){
                            //alert(JSON.stringify(error));
                        });

                    return true;
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


