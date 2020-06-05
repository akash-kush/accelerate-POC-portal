const uuid = require('uuid');

exports.generateUniqueId = () => {
    return uuid.v4();
}
