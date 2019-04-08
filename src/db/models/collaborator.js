'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborators', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Collaborator.associate = function(models) {
    Collaborator.belongsTo(models.Users, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Collaborator.belongsTo(models.Wikis, {
      foreignKey: "wikiId",
      onDelete: "CASCADE"
    });
  };
  return Collaborator;
};