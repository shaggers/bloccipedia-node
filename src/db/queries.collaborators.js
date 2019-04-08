const Collaborator = require("./models").Collaborators;
 
 module.exports = {
 
   createCollaborator(newCollaborator, callback){
     return Collaborator.create(newCollaborator)
     .then((collaborator) => {
       callback(null, collaborator);
     })
     .catch((err) => {
       callback(err);
     });
   },

   deleteCollaborator(req, callback){
        const id = req.params.wikiId
        Collaborator.findOne({
            where: {
                wikiId: id
            }
        }).then(collaborator => { 
            console.log(collaborator);
            collaborator.destroy();
            callback(null, collaborator)
        }).catch((err) => {
            console.log(err);
        })
   }
 
 }