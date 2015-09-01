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
        };

    return {
        admin: function (username, constructionSite) {
            var newAdmin = Object.create(admin);
            newAdmin.Username = username;
            newAdmin.ConstructionSite = constructionSite;
            return newAdmin;
        },
        siteManager: function (username) {
            var newManager = Object.create(siteManager);
            newManager.Username = username;
            return newManager;
        },
        confidentialData: function (username, password) {
            return {
                User: username,
                Pass: password
            };
        }
    }
} ();