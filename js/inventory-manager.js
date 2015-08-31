(function() {

    var CONSTANTS = {
        API_KEY : 'TNgVNbBpEOMFJ0T8'
    };

    //Add Admin to DataBase
    var admin = {
        "InventoryList" : [],
        "AvatarUrl" : 'https://cdn4.iconfinder.com/data/icons/SHINE7/general/400/administrator.png',
        "RequestList" : [],
        "ReservationList" : [],
        "Username" : 'admin'
    };

    var currentAdminCount;
    $.ajax({
        url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/Administrator',
        type: "GET",
        success: function(data){
            currentAdminCount = data.Count;
            console.log(data.Count);

        },
        error: function(error){
            alert('GET Fail');
        }
    })
        .then(function(data) {
            console.log(currentAdminCount + ' sfsfasf');

            if (!currentAdminCount) {
                $.ajax({
                    type: "POST",
                    url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/Administrator',
                    contentType: "application/json",
                    data: JSON.stringify(admin),
                    success: function(data) {
                        alert('Admin added');
                    },
                    error: function(error) {
                        alert('Admin existing');
                    }
                });
            }
        });

    //Register Site Manager
    $('#registration-btn').on('click', function() {
        var username = $('.username').val();
        var password = $('.password').val();
        var result;
        $.ajax({
            url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/ConfidentialData',
            type: "GET",
            success: function(data){

                result = data.Result.some(function(item) {
                    return item.User === username;
                });
            },
            error: function(error){
                alert('GET Confidential Data Fail');
            }
        })
            .then(function(data) {
                var $userExist = $('#exist-username');
                $userExist.css('display', 'none');
                if (!result) {
                    var newConfidentialData = {
                        User: username,
                        Pass: password
                    };

                    var newSiteManager = {
                        "ConstructionSite" : undefined,
                        "InventoryList" : [],
                        "AvatarUrl" : undefined,
                        'RequestHistory' : [],
                        "Username" : username
                    };

                    $.ajax({
                        type: "POST",
                        url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/ConfidentialData',
                        contentType: "application/json",
                        data: JSON.stringify(newConfidentialData),
                        success: function(data) {
                            console.log('New Data Added')
                        },
                        error: function(error) {
                            alert('Post Confidential Data Fail');
                        }
                    });

                    $.ajax({
                        type: "POST",
                        url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/SiteManager',
                        contentType: "application/json",
                        data: JSON.stringify(newSiteManager),
                        success: function(data) {
                            console.log('New Site Manager Added')
                        },
                        error: function(error) {
                            alert('Post Site Manager Fail');
                        }
                    });
                } else {
                    $userExist.css('display', 'block');
                }


            })

    });




}());


