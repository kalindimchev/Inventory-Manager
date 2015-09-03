var regButtonFunction = (function () {

    var CONSTANTS = {
        API_KEY: 'TNgVNbBpEOMFJ0T8'
    };
    
    //Register Site Manager
    function reg(cb) {
        var username = $('.username').val();
        var password = $('.password').val();
        console.log(username, password);
        var registrationDataIsValid = validator.isValidUsername(username) && validator.isValidPassword(password);
        
        if(!registrationDataIsValid) {
            // alert("Unsuccessful Registration! Please Try again");
            return;
        }
        
        if(typeof cb === 'function') {
            cb();
        }
        
        var constructionSite = $('.construction-site').val();
        console.log('hodor hodor.. HODOR');
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
                $('#username-taken').css('display', 'none');

                if (!result) {
                    var newConfidentialData = create.confidentialData(username, password);
                    var newSiteManager = create.siteManager(username, constructionSite);

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
                            console.log('New Site Manager Added');
                            window.location.hash = '#/login';
                        },
                        error: function (error) {
                            alert('Post Site Manager Fail');
                        }
                    });
                } else {
                    $('#username-taken').css('display', 'block');
                }

            })

    }

    return reg;
} ());