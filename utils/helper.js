module.exports.cleanApiData = (obj) => {
	obj.salt = undefined;
	obj.encrypted_password = undefined;
	obj.createdAt = undefined;
	obj.updatedAt = undefined;
	return obj;
};

module.exports.generatePassword = () => {
	const chars =
		"0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let passwordLength = 16;
	let password = "";
	for (let i = 0; i <= passwordLength; i++) {
		var randomNumber = Math.floor(Math.random() * chars.length);
		password += chars.substring(randomNumber, randomNumber + 1);
	}
    return password;
};
