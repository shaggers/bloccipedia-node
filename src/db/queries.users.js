const User = require("./models").Users;
const bcrypt = require("bcrypt");

module.exports = {

    createUser(newUser, callback){

        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
        name: newUser.name,
        email: newUser.email,
        password: hashedPassword,
        isVerified: false
        })
        .then((user) => {
        callback(null, user);
        })
        .catch((err) => {
        callback(err);
        })
    }

}