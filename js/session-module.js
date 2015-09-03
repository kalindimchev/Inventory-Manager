
    var sessionModule = (function () {
        var sessionManager,
            CONSTANTS = {
                API_KEY: 'TNgVNbBpEOMFJ0T8'
            };
        sessionManager = (function () {
            var sessionManager = Object.create({});

            Object.defineProperty(sessionManager, 'init', {
                value: function () {
                    this.db = new Everlive(CONSTANTS.API_KEY);
                    return this;
                }
            });
            Object.defineProperty(sessionManager, 'registerUser', {
                value: function (cb) {
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
            });
            Object.defineProperty(sessionManager, 'checkIfLogged', {
                value: function () {
                        var user = localStorage.getItem('user');
                        if(!user) {
                            this.logout();
                            window.location.hash = '#/login';
                            return false;
                        } else {
                            return true;
                        }
                }
            });
            Object.defineProperty(sessionManager, 'logout', {
                value: function () {
                    $("#side-navigation-container").empty();
                    $("#container").empty();
                    $("#container").css("margin-left", '0px');
                    $('#sign-in-anchor').html('Sign in').attr('href', '#/login');
                    $('#reg-anchor').html('Register').attr('href', '#/register');
                    localStorage.removeItem('user');
                    localStorage.removeItem('userRole');
                    localStorage.removeItem('userSite');
                    window.location.hash = '#/login';
                }
            });
            Object.defineProperty(sessionManager, 'logUser', {
                value: function () {

                    var username = $('.username').val(),
                        password = $('.password').val();

                    var promise = new Promise(function (resolve, reject) {
                        $.ajax({
                            url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/ConfidentialData',
                            method: 'GET',
                            success: function (data) {
                                //console.log(data.Result);
                                resolve(data.Result.filter(function (user) {
                                    return (user.User === username) && (user.Pass === password);
                                })[0]);
                                if(typeof callback === 'function') {
                                    callback();
                                }
                            },
                            contentType: 'application\json',
                            error: function (err) {
                                alert(err);
                                reject(err);
                            }
                        });

                    });

                    //console.log(promise);
                    return promise;
                }
            });
            Object.defineProperty(sessionManager, 'authenticateUser', {
                value: function () {
                    this.logUser()
                        .then(function (user) {
                            if (user) {
                                localStorage.setItem('user', user.User);
                                localStorage.setItem('userRole', user.Role);
                                if(user.Role == 'manager'){
                                    localStorage.setItem('userSite', user.ConstructionSite);
                                }
                                $('#container').empty();
                                $('#sign-in-anchor').html(user.User).attr('href', '#/instuments');
                                $('#reg-anchor').html('Sign out').attr('href', '#/logout');
                                generalManager.loadSideMenu();
                                window.location.hash = '#/instruments';
                            } else {
                                $('#invalid-name-or-pass').css('display', 'block').css('color', 'red');
                            }
                        });
                }
            });
            return sessionManager;
        }());

                return Object.create(sessionManager).init();
    }());