var validator = (function () {

	var CONSTANTS = {
		MatchNonLetters: /[^A-Z|\s]/i
	};

	function isNullUndefinedEmptyOrWhitespace(str) {
		var nullOrUndefined = !str;
		
		if(nullOrUndefined) {
			return true;
		}
		
		var	emptyOrWhitespace = str.trim() === '';

		return emptyOrWhitespace;
	}

	function isValidPassword(password) {
		var hasSymbols = !isNullUndefinedEmptyOrWhitespace(password);
		
		if(!hasSymbols) {
			return false;
		}
		
		var hasCorrectLength = (password.length > 4) && (password.length < 30);

		return hasCorrectLength;
	}

	function isValidUsername(username) {
		var hasSymbols = !isNullUndefinedEmptyOrWhitespace(username);
		
		if(!hasSymbols) {
			return false;
		}
		
		var	hasBadSymbols = username.match(CONSTANTS.MatchNonLetters);

		return !hasBadSymbols;
	}
	
	function hasUniqueBrandModelPair(instrument, instrumentCollection) {
		return !instrumentCollection.some(function (instr) {
			return (instr.Brand === instrument.Brand) && (instr.Model === instrument.Model);
		});
	}
	
	return { isValidPassword, isValidUsername, hasUniqueBrandModelPair };
} ());