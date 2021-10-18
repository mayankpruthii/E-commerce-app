export function checkIfTwoStringsMatch(string1, string2) {
	if (string1 === string2) {
		return true;
	} else {
		return false;
	}
}

export function getCookie(name) {
	var cookieArr = document.cookie.split(";");
	for (let i = 0; i < cookieArr.length; i++) {
		var cookiePair = cookieArr[i].split("=");
		if (name === cookiePair[0].trim()) {
			return decodeURIComponent(cookiePair[1]);
		}
	}
	return null;
}

export function removeCookies() {
	var res = document.cookie;
	var multiple = res.split(";");
	for (var i = 0; i < multiple.length; i++) {
		var key = multiple[i].split("=");
		document.cookie =
			key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
	}
}
