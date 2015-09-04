var create = function () {
    var admin = {
        "InventoryList": [],
        "AvatarUrl": 'https://cdn4.iconfinder.com/data/icons/SHINE7/general/400/administrator.png',
        "RequestList": [],
        "ReservationList": [],
        "Username": 'admin'
    },
        siteManager = {
            "ConstructionSite": undefined,
            "InventoryList": [],
            "AvatarUrl": undefined,
            'RequestHistory': [],
            "Username": undefined
        },
        constructionSite = {
            "Picture": null,
            "SiteName": '',
            "Description": '',
            "Location": '',
            "PersonInCharge": ''
        };

    return {
        admin: function (username) {
            var newAdmin = Object.create(admin);
            newAdmin.Username = username;
            return newAdmin;
        },
        siteManager: function (username, constructionSite) {
            var newManager = Object.create(siteManager);
            newManager.Username = username;
            newManager.ConstructionSite = constructionSite;
            return newManager;
        },
        constructionSite: function(photoUrl, name, description, location) {
            var newSite = Object.create(constructionSite);
            newSite.Picture = photoUrl;
            newSite.SiteName = name;
            newSite.Description = description;
            newSite.Location = location;

            return newSite;
        },
        confidentialData: function (username, password) {
            return {
                User: username,
                Pass: password,
                Role: 'manager'
            };
        }
    }
} ();