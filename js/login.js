var logUser = function () {
	var CONSTANTS = {
        API_KEY: 'TNgVNbBpEOMFJ0T8'
    };

	function login(callback) {

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
	};

	return login;
} ();