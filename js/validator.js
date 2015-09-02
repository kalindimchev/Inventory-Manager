var validator = (function () {

	var CONSTANTS = {
		MatchNonLetters: /[^A-Z|\s]/i
	};

	function isNullUndefinedEmptyOrWhitespace(str) {
		var nullOrUndefined = !str,
			emptyOrWhitespace = str.trim() === '';

		return nullOrUndefined || emptyOrWhitespace;
	}

	function isValidPassword(password) {
		var hasCorrectLength = (password.length > 4) && (password.length < 10),
			hasSymbols = !isNullUndefinedEmptyOrWhitespace(password);

		return hasCorrectLength && hasSymbols;
	}

	function isValidUsername(username) {
		var hasSymbols = !isNullUndefinedEmptyOrWhitespace(username),
			hasBadSymbols = username.match(CONSTANTS.MatchNonLetters);

		return hasSymbols && !hasBadSymbols;
	}

	return { isValidPassword, isValidUsername };
} ());