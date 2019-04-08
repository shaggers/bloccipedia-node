const collaboratorQueries = require("../db/queries.collaborators.js");
const User = require("../db/models").Users;
const Collaborator = require("../db/models").Collaborators;
 
 module.exports = {
   create(req, res, next){

    const collaboratorEmail = req.body.collaborator

        User.findOne({ where: {email: collaboratorEmail} }).then((user) => {

            if(user != null) {

                let newCollaborator = {
                    userId: user.id,
                    wikiId: req.params.wikiId
                };

                Collaborator.findOne({
                    where: {
                        userId: user.id,
                        wikiId: req.params.wikiId
                    }
                }).then((duplicate) => {
                    if (duplicate === null) {
                        collaboratorQueries.createCollaborator(newCollaborator, (err, collabrator) => {
                            if(err){
                            console.log(err);
                            req.flash("error", err);
                            }
                            res.redirect(req.headers.referer);
                        });
                    } else {
                        req.flash("notice", "You already added this user.");
                        res.redirect(req.headers.referer);
                    }
                })
            
            } else {
                
                req.flash("notice", "This user doesn't exist")
                res.redirect(req.headers.referer);

            }

        }).catch((err) => {
            console.log(err);
        })
   },

   destroy(req, res, next){
     collaboratorQueries.deleteCollaborator(req, (err, collaborator) => {
       if(err){
         res.redirect(err, req.headers.referer);
       } else {
         res.redirect(req.headers.referer);
       }
     });
   }
 }