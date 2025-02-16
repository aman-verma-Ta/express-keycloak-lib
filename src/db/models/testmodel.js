"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class testModel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  testModel.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      created_by: DataTypes.STRING, // Match the type in your migration
      updated_by: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "testModel",
      tableName: "testModels",
    }
  );
  testModel.beforeCreate((instance, options) => {
    instance.created_by = options.context.user.username;
    instance.updated_by = options.context.user.username;
  });

  testModel.beforeUpdate((instance, options) => {
    instance.updated_by = options.context.user.username;
  });
  return testModel;
};