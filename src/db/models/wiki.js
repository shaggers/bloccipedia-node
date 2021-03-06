'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wiki = sequelize.define('Wikis', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }  
  }, {});
  Wiki.associate = function(models) {
    Wiki.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Wiki.hasMany(models.Collaborators, {
      foreignKey: "wikiId",
      as: "collaborators"
    })
  };
  return Wiki;
};