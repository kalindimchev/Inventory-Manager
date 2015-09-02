$(document).ready(function () {
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
    var iModule = instrumentsModule();
    var instruments = iModule.getInstruments();
    var gModule = generalModule(),
        template = gModule.getTemplateManager();
    //---------------- Site Routing --------------------//
    var sammyApp = Sammy('#container', function () {

        //Home Page (Start Screen)
        
        this.get('#/', function () {
        });
        //Sign in page (Login Screen)
        this.get('#/login', function () {
            $("#side-navigation-container").empty();
            template.loadTemplate("login.html", {}, " | Login");
        });

        this.get('#/auth', function () {
            logUser()
                .then(function (user) {
                    console.log(user);
                    if (user) {

                        localStorage.setItem('user', user.User);
                        window.location.hash = '#/instruments';

                        $('#sign-in-anchor').html(user.User).attr('href', '#/instuments');
                        $('#reg-anchor').html('Sign out').attr('href', '#/logout');
                    } else {
                        $('#invalid-name-or-pass').css('display', 'block').css('color', 'red');
                    }
                });
        });

        this.get('#/logout', function () {
            $('#sign-in-anchor').html('Sign in').attr('href', '#/login');
            $('#reg-anchor').html('Register').attr('href', '#/register');
            localStorage.removeItem('user');
            window.location.hash = '#/login';
        });

        this.get('#/register', function () {
            template.loadTemplate('registration.html', {}, " | Registration", null, function () {
                $("#side-navigation-container").empty();
                $('#form-registration-btn').on('click', regButtonFunction);
            });
        });
        this.get('#/instruments', function () {
            
            if(!localStorage.getItem('user')) {
                return;
            }

            instruments.listInstruments().then(function (result) {
                template.loadTemplate('instruments.html', { "instruments": result.result }, " | Instruments");
            });
            template.loadTemplate("vertical-navigation.html", { "items": gModule.constants.sidebarContent.administrator }, "", $("#side-navigation-container"));
            //
        });
        this.get('#/new-instrument', function () {
            template.loadTemplate("vertical-navigation.html", { "items": gModule.constants.sidebarContent.administrator }, "", $("#side-navigation-container"));
            template.loadTemplate('new-instrument.html', {}, " | New Instrument");
        });
    });
    sammyApp.run('#/');
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
