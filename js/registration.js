(function () {

    var CONSTANTS = {
        API_KEY: 'TNgVNbBpEOMFJ0T8'
    };
    
    //Register Site Manager
    $('#registration-btn').on('click', function () {
        var username = $('.username').val();
        var password = $('.password').val();
        var result;
        $.ajax({
            url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/ConfidentialData',
            type: "GET",
            success: function (data) {

                result = data.Result.some(function (item) {
                    return item.User === username;
                });
            },
            error: function (error) {
                alert('GET Confidential Data Fail');
            }
        })
            .then(function (data) {
                var $userExist = $('#exist-username');
                $userExist.css('display', 'none');
                if (!result) {
                    // var newConfidentialData = {
                    //     User: username,
                    //     Pass: password
                    // };

                    // var newSiteManager = {
                    //     "ConstructionSite": undefined,
                    //     "InventoryList": [],
                    //     "AvatarUrl": undefined,
                    //     'RequestHistory': [],
                    //     "Username": username
                    // };
                    var newConfidentialData = create.confidentialData(username, password);
                    var newSiteManager = create.siteManager(username);

                    $.ajax({
                        type: "POST",
                        url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/ConfidentialData',
                        contentType: "application/json",
                        data: JSON.stringify(newConfidentialData),
                        success: function (data) {
                            console.log('New Data Added')
                        },
                        error: function (error) {
                            alert('Post Confidential Data Fail');
                        }
                    });

                    $.ajax({
                        type: "POST",
                        url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/SiteManager',
                        contentType: "application/json",
                        data: JSON.stringify(newSiteManager),
                        success: function (data) {
                            console.log('New Site Manager Added')
                        },
                        error: function (error) {
                            alert('Post Site Manager Fail');
                        }
                    });
                } else {
                    $userExist.css('display', 'block');
                }

            })

    });
    
    // debug :D
    console.log('registration module loaded');
} ());