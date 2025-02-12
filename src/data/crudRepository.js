const sequelize = require('../config/database')
// const path = require('path');
const requireAll = require('require-all');
const logger = require('../utils/logger');

// Dynamically load developer's models
let developerModels; // Store models here

// Function to initialize the models (must be called by the including project)
function initializeModels(modelsPath) {
  developerModels = requireAll({
    dirname: modelsPath, // Use the provided path
    filter: /(.+)\.js$/,
    resolve: (Model) => (sequelize, DataTypes) => Model(sequelize, DataTypes),
  });
}

const getModel = (modelName) => {
  const model = developerModels[modelName];
  if (!model) throw new Error(`Model '${modelName}' not found`);
  return model;
};

const findAll = async (modelName) => {
  try {
    return await getModel(modelName).findAll();
  } catch (error) {
    logger.error(`Error in repository (findAll):`, error);
    throw error;
  }
};

const findById = async (modelName, id) => {
  try {
    return await getModel(modelName).findByPk(id);
  } catch (error) {
    logger.error(`Error in repository (findById):`, error);
    throw error;
  }
};

const create = async (modelName, data) => {
  try {
    return await getModel(modelName).create(data);
  } catch (error) {
    logger.error(`Error in repository (create):`, error);
    throw error;
  }
};

const update = async (modelName, id, data) => {
  try {
    const instance = await getModel(modelName).findByPk(id);
    if (!instance) throw new Error('Record not found');
    return await instance.update(data);
  } catch (error) {
    logger.error(`Error in repository (update):`, error);
    throw error;
  }
};

const deleteRecord  = async (modelName, id) => {
  try {
    return await getModel(modelName).destroy({ where: { id } });
  } catch (error) {
    logger.error(`Error in repository (delete):`, error);
    throw error;
  }
};

module.exports = {
    initializeModels, // Export the function itself
    deleteRecord,
    update,
    create,
    findAll,
    findById
};