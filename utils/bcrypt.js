const bcrypt = require('bcrypt');

function encryptPassword(password){
    return bcrypt.hash(password,10)
}
function comparePassword(first,second){
    return bcrypt.compare(first,second)
}
module.exports = {
    comparePassword,
    encryptPassword
}
