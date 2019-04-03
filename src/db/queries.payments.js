const User = require("./models").Users;

module.exports = {

    upgrade(id){
        User.findByPk(id)
        .then((user) => {
            user.update({
                role: 1
            })
        })
    },
    downgrade(id){
        User.findByPk(id)
        .then((user) => {
            user.update({
                role: 0
            })
        })
    }

}