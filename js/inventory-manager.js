(function() {

    var CONSTANTS = {
        API_KEY : 'TNgVNbBpEOMFJ0T8'
    };
    
    var admin = create.admin('admin');

    var currentAdminCount;
    $.ajax({
        url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/Administrator',
        type: "GET",
        success: function(data){
            currentAdminCount = data.Count;
//            console.log(data.Count);

        },
        error: function(error){
            //alert('GET Fail');
        }
    })
        .then(function(data) {

            if (!currentAdminCount) {
                $.ajax({
                    type: "POST",
                    url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/Administrator',
                    contentType: "application/json",
                    data: JSON.stringify(admin),
                    success: function(data) {
                        //alert('Admin added');
                    },
                    error: function(error) {
                        //alert('Admin existing');
                    }
                });
            }
        });
}());