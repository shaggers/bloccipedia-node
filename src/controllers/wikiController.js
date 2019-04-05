const wikiQueries = require("../db/queries.wikis.js");
const markdown = require("markdown").markdown;

module.exports = {
    index(req, res, next){   
        wikiQueries.getAllWikis((err, wikis) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("wikis/index", {wikis});
            }
        });
    },
    new(req, res, next){
        res.render("wikis/new");
    },
    create(req, res, next){
        let newWiki = {
          title: req.body.title,
          body: req.body.body,
          private: req.body.private,
          userId: req.user.id
        };
        wikiQueries.addWiki(newWiki, (err, wiki) => {
          if(err){
            res.redirect(500, "/wikis/new");
          } else {
            res.redirect(303, `/wikis/${wiki.id}`);
          }
        });
    },
    show(req, res, next){

        wikiQueries.getWiki(req.params.id, (err, wiki) => {
            if(err || wiki == null){
                res.redirect(404, "/");
            } else {

                if(wiki.private === true) {

                  if(wiki.userId === req.user.id || req.user.role === 2){
                    res.render("wikis/show", {wiki});
                  } else {
                    req.flash("notice", "You are not authorized to do that.")
                    res.redirect("/wikis");
                  }

                } else {
                  res.render("wikis/show", {wiki, markdown});
                  
                }

            }
        });
    },
    destroy(req, res, next){
        wikiQueries.deleteWiki(req.params.id, (err, wiki) => {
          if(err){
            res.redirect(500, `/wikis/${wiki.id}`)
          } else {
            res.redirect(303, "/wikis")
          }
        });
    },
    edit(req, res, next){
        wikiQueries.getWiki(req.params.id, (err, wiki) => {
          if(err || wiki == null){
            res.redirect(404, "/");
          } else {

            if(wiki.private === true){

              if(req.user.id === wiki.userId || req.user.role === 2){
                res.render("wikis/edit", {wiki});
              } else {
                req.flash("notice", "You are not authorized to do that")
                res.redirect("/wikis");
              }

            } else {
              res.render("wikis/edit", {wiki});
            }
          }
        });
    },
    update(req, res, next){

        wikiQueries.updateWiki(req.params.id, req.body, (err, wiki) => {
        if(err || wiki == null){
            res.redirect(404, `/wikis/${req.params.id}/edit`);
        } else {
            res.redirect(`/wikis/${wiki.id}`);
        }
        });
   }
}