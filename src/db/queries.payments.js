const User = require("./models").Users;
const Wiki = require("./models").Wikis;

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

            Wiki.update(
                {private: false},
                {where: { userId: user.id }}
            )

        })   
    }

}