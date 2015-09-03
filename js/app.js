var iModule = instrumentsModule();
var instruments = iModule.getInstruments();
var gModule = generalModule(),
    template = gModule.getTemplateManager();

function checkIfLogged(){
    var user = localStorage.getItem('user');
    if(!user) {
        logout();
        window.location.hash = '#/login';
        return false;
    }
}
function loadSideMenu(){
    var user = localStorage.getItem('user');
    var userRole = localStorage.getItem('userRole');
    if(user){
        $('#sign-in-anchor').html(user).attr('href', '#/instuments');
        $('#reg-anchor').html('Sign out').attr('href', '#/logout');
    if(userRole === 'admin'){

        template.loadTemplate("vertical-navigation.html", { "items": gModule.constants.sidebarContent.administrator }, "", $("#side-navigation-container"));
    } else {

        template.loadTemplate("vertical-navigation.html", { "items": gModule.constants.sidebarContent.manager }, "", $("#side-navigation-container"));

    }}
}

function logout(){
    $("#side-navigation-container").empty();
    $("#container").empty();
    $('#sign-in-anchor').html('Sign in').attr('href', '#/login');
    $('#reg-anchor').html('Register').attr('href', '#/register');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
}
function authenticateUser(){
    logUser()
        .then(function (user) {
            if (user) {

                localStorage.setItem('user', user.User);
                localStorage.setItem('userRole', user.Role);
                $('#sign-in-anchor').html(user.User).attr('href', '#/instuments');
                $('#reg-anchor').html('Sign out').attr('href', '#/logout');
                loadSideMenu();
                window.location.hash = '#/instruments';
            } else {
                $('#invalid-name-or-pass').css('display', 'block').css('color', 'red');
            }
        });
}


$(document).ready(function () {
    var CONSTANTS = {
        API_KEY: 'TNgVNbBpEOMFJ0T8'
    };

    // make pressed top navigation bar button pressed
    $("#main nav").on("click", ".nav-btn", function () {
        $("#main nav .nav-btn").removeClass("active");
        $(this).addClass("active");
    });
    // make pressed side navigation bar button pressed
    $("#side-navigation-container").on("click", ".nav-btn", function () {
        $("#side-navigation-container li").removeClass("active");
        $("#side-navigation-container .nav-btn").removeClass("active");
        var parent = $(this).parents(".sub-menu");
        if (parent.length > 0) {
            parent.prev().addClass("active");
        }
        $(this).addClass("active");
    });

    //---------------- Site Routing --------------------//
    var sammyApp = Sammy('#container', function () {

        //Home Page (Start Screen)

        this.get('#/', function () {
        });
        //Sign in page (Login Screen)
        this.get('#/login', function () {
            logout();
            $("#side-navigation-container").empty();
            template.loadTemplate("login.html", {}, " | Login");
        });


        this.get('#/logout', function () {
           logout();
            window.location.hash = '#/login';
        });

        this.get('#/register', function () {
            template.loadTemplate('registration.html', {}, " | Registration", null, function () {
                $("#side-navigation-container").empty();
                $('#form-registration-btn').on('click', regButtonFunction);
            });
        });
        this.get('#/instruments', function () {
            if(!checkIfLogged()){
                return;
            }
            var userRole = localStorage.getItem('userRole');


            if (userRole === 'admin') {
                instruments.listInstruments().then(function (result) {
                    template.loadTemplate('instruments.html', { "instruments": result.result }, " | Instruments");
                });
                  } else {
                var filter = { "Username" : currentUsername };

                $.ajax({
                    url: 'http://api.everlive.com/v1/' + CONSTANTS.API_KEY + '/SiteManager',
                    type: "GET",
                    headers: {"X-Everlive-Filter" : JSON.stringify(filter) },
                    success: function(data){
                        console.log('Dataaaa' + JSON.stringify(data));
                        console.log(data.Result[0].InventoryList);

                        instruments.listInstruments().then(function (result) {
                            template.loadTemplate('site-manager-instruments.html', { "instruments": data.Result[0].InventoryList }, " | Instruments");
                        });
                             },
                    error: function(error){
                        //alert(JSON.stringify(error));
                    }
                });


            }


            //
        });
        this.get('#/new-instrument', function () {
            if(!checkIfLogged()){
                return;
            }
                template.loadTemplate('new-instrument.html', {}, " | New Instrument");
        });
    });
    sammyApp.run('#/');
    loadSideMenu();
    //-------------- End of Site Routing ------------------//

    // on page loading make the right navigation button pressed
    var hash = window.location.hash;
    var elem = $('a[href="' + hash + '"]').parent();
    $(".nav-btn").removeClass("active");
    elem.addClass("active");
    var parent = elem.parents(".sub-menu");
    if (parent.length > 0) {
        parent.prev().addClass("active");
    }

    //--------------- Login Page---------------------//
    $("#container").on("click", "#login-page #login-btn", function(e){
        e.preventDefault();
        authenticateUser();
    });
    //--------------- End of Login Page---------------------//

    //----------------- Administrator pages ------------------//

    // ------ manage new instrument form submission
    $("#container").on("click", "#new-instrument #submit", function (e) {
        // prevent page reloading and default button clicking action
        e.preventDefault();
        //get the form values
        var brand = $("#new-instrument #brand").val(),
            model = $("#new-instrument #model").val(),
            count = $("#new-instrument #count").val(),
            // try to create the instrument
            result = instruments.create(brand, model, count);
        //if the creation was successful redirect to instruments page
        if (result) {
            window.location.hash = '#/instruments';
        }
    });


$("#container").on("click", "#instruments-admin-page .instruments-filter", function(e){
    $(".instruments-filter").removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    var type = $(this).attr('id');
    if(type == 'all'){
        type = null;
    }

    instruments.listInstruments(type).then(function(result){
        template.loadTemplate('instruments.html', {"instruments": result.result}, " | Instruments");
    });
});

});
