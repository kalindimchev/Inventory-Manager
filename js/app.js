$(document).ready(function () {

   var gModule = generalModule();
    var template = gModule.getTemplateManager();
    //---------------- Site Routing --------------------//
    var sammyApp = Sammy('#container', function () {
        //Home Page (Start Screen)
        this.get('#/home', function () {
        });
        //Sign in page (Login Screen)
        this.get('#/login', function () {
            $("#login-nav-btn").addClass("active");
            template.loadTemplate("login.html", {}, " | Login");
        });
        this.get('#/register', function () {
            template.loadTemplate('registration.html', {}, " | Registration", function () {
                $('#form-registration-btn').on('click', regButtonFunction);
            });
        });
    });
    sammyApp.run('#/');
    //-------------- End of Site Routing ------------------//
});