const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wikis;
const User = require("../../src/db/models").Users;

describe("Wiki", () => {

    beforeEach((done) => {

        this.wiki;
        this.user;
        sequelize.sync({force: true}).then((res) => {

            User.create({
                name: "hello sir",
                email: "hello@gmail.com",
                password: "hellosir",
                isVerified: false,
                verificationCode: 123456,
                role: 0
            }).then((user) => {
                this.user = user;

                Wiki.create({
                    title: "My first visit to Proxima Centauri b",
                    body: "I saw some rocks.",
                    private: false,
                    userId: this.user.id
                })
                .then((wiki) => {
                    this.wiki = wiki;
                    done();
                })
                .catch((err) => {
                    console.log(err);
                })
            }).catch((err) => {
                console.log(err);
            })
            
        });

    });

    describe("#create()", () => {

        it("should create a wiki object with a title, body, private value, and assigned user", (done) => {

            Wiki.create({
                title: "Pros of Cryosleep during the long journey",
                body: "1. Not having to answer the 'are we there yet?' question.",
                private: false,
                userId: this.user.id
            })
            .then((wiki) => {
    
                expect(wiki.title).toBe("Pros of Cryosleep during the long journey");
                expect(wiki.body).toBe("1. Not having to answer the 'are we there yet?' question.");
                expect(wiki.private).toBe(false);
                expect(wiki.userId).toBe(this.user.id)
                done();
    
            })
            .catch((err) => {
                console.log(err);
                done();
            });
        });
   
    });

    describe("#setUser()", () => {

        it("should associate a wiki and a user together", (done) => {
   
          User.create({
            name: "Chuck Norris",
            email: "ada@example.com",
            password: "password",
            isVerified: true,
            verificationCode: 654321
          })
          .then((newUser) => {
   
            expect(this.wiki.userId).toBe(this.user.id);
   
            this.wiki.setUser(newUser)
            .then((wiki) => {
   
              expect(this.wiki.userId).toBe(newUser.id);
              done();
   
            });
          })
        });
   
    });
   
    describe("#getUser()", () => {
   
        it("should return the associated wiki", (done) => {
   
          this.wiki.getUser()
          .then((associatedUser) => {
            expect(associatedUser.email).toBe("hello@gmail.com");
            done();
          });
   
        });
   
    });
});