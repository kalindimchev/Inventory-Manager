$(document).ready(function(){

    var sammyApp = Sammy('#content', function() {
        this.get('#/', function () {

        });

        this.get('#/login', function () {
            $("#login-nav-btn").addClass("active");
            console.log("login");
            $("#container").empty();
            templates.get('templates/login.html')
                .then(function(templateHTML) {

                    var template = Handlebars.compile(templateHTML);
                    var html = template({});

                    $('#container').append(html);
                });

        });
    });

    sammyApp.run('#/');
});
