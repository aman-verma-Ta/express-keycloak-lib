const db = require('../db/models'); // Path to your index.js file
const logger = require('../utils/logger');

exports.findAll = async (modelName) => {
  try {
    const model = db[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return await model.findAll();
  } catch (error) {
    logger.error(`Error in repository (findAll):`, error);
    throw error;
  }
};

exports.findById = async (modelName, id) => {
  try {
    const model = db[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return await model.findByPk(id);
  } catch (error) {
    logger.error(`Error in repository (findById):`, error);
    throw error;
  }
};

exports.create = async (modelName, data) => {
  try {
    const model = db[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return await model.create(data);
  } catch (error) {
    logger.error(`Error in repository (create):`, error);
    throw error;
  }
};

exports.update = async (modelName, id, data) => {
  try {
    const model = db[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }

    const [updatedRows] = await model.update(data, {
      where: { id: id },
    });
    return updatedRows;
  } catch (error) {
    logger.error(`Error in repository (update):`, error);
    throw error;
  }
};

exports.deleteRecord = async (modelName, id) => {
  try {
    const model = db[modelName];
    if (!model) {
      throw new Error(`Model ${modelName} not found`);
    }
    return await model.destroy({
      where: { id: id },
    });
  } catch (error) {
    logger.error(`Error in repository (delete):`, error);
    throw error;
  }
};