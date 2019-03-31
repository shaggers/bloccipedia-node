const User = require("./models").Users;
const bcrypt = require("bcrypt");
const crypto = require('crypto-random-string');

module.exports = {

    createUser(newUser, callback){

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        isVerified: false,
        verificationCode: crypto(6)
        })
        .then((user) => {
        callback(null, user);
        })
        .catch((err) => {
        callback(err);
        })
    },
    verifyAccount(id){
        
        User.findByPk(id)
        .then((user) => {
            user.update({
                isVerified: true
            })
        })
    }

}