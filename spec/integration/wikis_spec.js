const request = require("request");
const server = require("../../src/server");
const sequelize = require("../../src/db/models/index").sequelize;
const base = "http://localhost:3000/wikis/";
const User = require("../../src/db/models").Users;
const Wiki = require("../../src/db/models").Wikis;

describe("routes : wikis", () => {

  beforeEach((done) => {

    this.wiki;
    this.user;

    sequelize.sync({force: true}).then((res) => {

      User.create({
        name: "hello sir",
        email: "hello@gmail.com",
        password: "hellosir",
        isVerified: true,
        verificationCode: "123456"
      }).then((user) => {
        this.user = user;

        Wiki.create({
          title: "Winter Games",
          body: "Post your Winter Games stories.",
          private: false,
          userId: this.user.id
        })
        .then((wiki) => {
          this.wiki = wiki;

          done();
        }).catch((err) => {
          console.log(err);
          done();
        })
      }).catch((err) => {
        console.log(err);
        done();
      })
      
    });

  });

  describe("signed in and verified user performing CRUD actions on Wikis", () => {

    beforeEach((done) => {
      request.get({
        url: "http://localhost:3000/auth/fake",
        form: {
          isVerified: true,
          userId: this.user.id
        }
      },
      (err, res, body) => {
        done();
      });
    });

    describe("GET /wikis", () => {

      it("should return a status code 200 and all wikis", (done) => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Winter Games");
          done();
        });
      });
  
    });
  
    describe("GET /wikis/new", () => {
  
      it("should render a new wiki form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Wiki");
          done();
        });
      });
  
    });
  
    describe("POST /wikis/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "blink-182 songs",
          body: "What's your favorite blink-182 song?",
          private: false
        }
      };
  
      it("should create a new wiki and redirect", (done) => {
  
        request.post(options,
  
          (err, res, body) => {
            Wiki.findOne({where: {title: "blink-182 songs"}})
            .then((wiki) => {
              expect(res.statusCode).toBe(303);
              expect(wiki.title).toBe("blink-182 songs");
              expect(wiki.body).toBe("What's your favorite blink-182 song?");
              expect(wiki.private).toBe(false);
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
          }
        );
      });
    });

    describe("GET /wikis/:id", () => {

      it("should render a view with the selected wiki", (done) => {
        request.get(`${base}${this.wiki.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Winter Games");
          done();
        });
      });
 
    });

    describe("POST /wikis/:id/destroy", () => {

      it("should delete the wiki with the associated ID", (done) => {
 
        Wiki.findAll()
        .then((wikis) => {
 
          const wikiCountBeforeDelete = wikis.length;
 
          expect(wikiCountBeforeDelete).toBe(1);
 
          request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
            Wiki.findAll()
            .then((wikis) => {
              expect(err).toBeNull();
              expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
              done();
            })
 
          });
        });
 
      });
 
    });

    describe("GET /wikis/:id/edit", () => {

      it("should render a view with an edit wiki form", (done) => {
        request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Wiki");
          expect(body).toContain("Winter Games");
          done();
        });
      });
 
    });

    describe("POST /wikis/:id/update", () => {

      it("should update the wiki with the given values", (done) => {
         const options = {
            url: `${base}${this.wiki.id}/update`,
            form: {
              title: "JavaScript Frameworks",
              body: "There are a lot of them",
              private: false
            }
          };

          request.post(options,
            (err, res, body) => {
 
            expect(err).toBeNull();

            Wiki.findOne({
              where: { id: this.wiki.id }
            })
            .then((wiki) => {
              expect(wiki.title).toBe("JavaScript Frameworks");
              done();
            });
          });
      });
 
    });

  })


  
});