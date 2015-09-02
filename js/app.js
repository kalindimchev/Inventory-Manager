$(document).ready(function () {
   var gModule = generalModule();
    var template = gModule.getTemplateManager();
    //---------------- Site Routing --------------------//
    var sammyApp = Sammy('#container', function () {
        //Home Page (Start Screen)
        this.get('#/', function () {
        });
        //Sign in page (Login Screen)
        this.get('#/login', function () {
            $("#side-navigation-container").empty();
            $("#register-nav-btn").removeClass("active");
            $("#login-nav-btn").addClass("active");
            template.loadTemplate("login.html", {}, " | Login");
        });
        this.get('#/register', function () {
            template.loadTemplate('registration.html', {}, " | Registration", null,function () {
                $("#side-navigation-container").empty();
                $("#login-nav-btn").removeClass("active");
                $("#register-nav-btn").addClass("active");
                $('#form-registration-btn').on('click', regButtonFunction);
            });
        });
        this.get('#/instruments', function () {

                template.loadTemplate("vertical-navigation.html", {"items": gModule.constants.sidebarContent.administrator}, "", $("#side-navigation-container"));
                template.loadTemplate('instruments.html', {}, " | Instruments");
        });
    });
    sammyApp.run('#/');
    //-------------- End of Site Routing ------------------//
});