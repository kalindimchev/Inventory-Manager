var templateManager,
    instrumentsManager,
    generalManager,
    sessionManager;
$(document).ready(function () {
   instrumentsManager = instrumentsModule.getInstruments();
   sitesManager = sitesModule.getSites();
    templateManager = generalModule.getTemplateManager();
    generalManager = generalModule.getGeneralManager();
    sessionManager = sessionModule;


    //---------------- Site Routing --------------------//
    var sammyApp = Sammy('#container', function () {
        //Home Page (Start Screen)

        this.get('#/', function () {
        });
        //Sign in page (Login Screen)
        this.get('#/login', function () {
            sessionManager.logout();
            $("#side-navigation-container").empty();
            templateManager.loadTemplate("login.html", {}, " | Login");
        });


        this.get('#/logout', function () {
            sessionManager.logout();
        });

        this.get('#/register', function () {
            templateManager.loadTemplate('registration.html', {}, " | Registration", null, function () {
                $("#side-navigation-container").empty();
                $('#form-registration-btn').on('click', sessionModule.registerUser());
            });
        });
        this.get('#/instruments', function () {
           sessionManager.checkIfLogged();

            instrumentsManager.loadInstrumentsListPage();
        });
        this.get('#/requests', function () {
            sessionManager.checkIfLogged();

            instrumentsManager.loadRequestsListPage();
        });
        this.get('#/site-instruments', function () {
            sessionManager.checkIfLogged();
            var site = localStorage.getItem('userSite');
            if(!site){
                window.location.hash = '#/instruments';
                return;
            }
            instrumentsManager.listSiteInstruments(site).then(function(result){
               var instruments = instrumentsManager.renderSiteInstruments(result.result[0]);
                templateManager.loadTemplate('site-instruments.html', {instruments: instruments}, " | Site Instruments", null, generalManager.loadTablePlugin());
            });
        });
        this.get('#/new-instrument', function () {
            sessionManager.checkIfLogged();
                templateManager.loadTemplate('new-instrument.html', {}, " | New Instrument");
        });
        this.get('#/instrument-added', function () {
            sessionManager.checkIfLogged();
            templateManager.loadTemplate('instrument-added.html', {}, " | Instrument Added");
        });
        this.get('#/construction-site', function () {
            sessionManager.checkIfLogged();
            var options = {
                 Name: 'Blvd. Bulgaria',
                 Picture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQU63AqXJiwT1uCKGZ6FU25ckEN2wBSLDrCxMP-kwgGK6ssHt_5',
                 Description: 'vsichki te psuvat na bulevarda'
                 };
                 
            templateManager.loadTemplate('construction-site.html', options);
        });
    });
    sammyApp.run('#/');
    generalManager.loadSideMenu();
    //-------------- End of Site Routing ------------------//

    generalManager.toggleActiveButtons();
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
        sessionManager.authenticateUser();
    });
    //--------------- End of Login Page---------------------//

instrumentsManager.submitCreateForm();
instrumentsManager.filterTableOnButtonClick();

instrumentsManager.returnInstrumentOnButtonClick();
instrumentsManager.requestInstrumentOnButtonClick();
instrumentsManager.DenyOnButtonClick();
instrumentsManager.ApproveOnButtonClick();

});
