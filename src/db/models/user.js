'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: { msg: "must be a valid email" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    verificationCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {});
  User.associate = function(models) {
      User.hasMany(models.Wikis, {
        foreignKey: "userId",
        as: "wikis"
      });

      User.hasMany( models.Collaborators, {
        foreignKey: "userId",
        as: "collaborators"
      })
  };

  User.prototype.isAdmin = function() {
    return this.role === 2;
  };

  User.prototype.isPremium = function() {
    return this.role === 1;
  };

  User.prototype.isStandard = function() {
    return this.role === 0;
  };

  return User;
};