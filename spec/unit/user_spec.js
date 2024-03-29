const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").Users;

describe("User", () => {

  beforeEach((done) => {

    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

    it("should create a User object with a valid name, email and password", (done) => {
      User.create({
        name: "John Smith",
        email: "user@example.com",
        password: "1234567890",
        isVerified: false,
        verificationCode: 123456
      })
      .then((user) => {
        expect(user.name).toBe("John Smith");
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        expect(user.isVerified).toBe(false);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid name, email or password", (done) => {
      User.create({
        name: "John Smith",
        email: "It's-a me, Mario!",
        password: "1234567890",
        isVerified: false,
        verificationCode: 123456
      })
      .then((user) => {

        // The code in this block will not be evaluated since the validation error
        // will skip it. Instead, we'll catch the error in the catch block below
        // and set the expectations there.

        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", (done) => {

      User.create({
        name: "John Smith",
        email: "user@example.com",
        password: "1234567890",
        isVerified: false,
        verificationCode: 123456
      })
      .then((user) => {

        User.create({
          name: "Copy Cat",
          email: "user@example.com",
          password: "nananananananananananananananana BATMAN!",
          isVerified: false,
          verificationCode: 123456
        })
        .then((user) => {

          // the code in this block will not be evaluated since the validation error
          // will skip it. Instead, we'll catch the error in the catch block below
          // and set the expectations there

          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });

        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});
