module.exports.cleanApiData = (obj) => {
    obj.salt = undefined;
    obj.encrypted_password = undefined;
    obj.createdAt = undefined;
    obj.updatedAt = undefined;
    return obj;
}