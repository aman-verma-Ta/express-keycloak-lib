const repository = require('../data/crudRepository');
const logger = require('../utils/logger');

exports.getAll = async (model) => { //one more parameters for associated data
  try {
    return await repository.findAll(model);
  } catch (error) {
    logger.error('Error in service (getAll):', error);
    throw error;
  }
};

exports.getById = async (model, id) => {
  try {
    return await repository.findById(model, id);
  } catch (error) {
    logger.error('Error in service (getById):', error);
    throw error;
  }
};

exports.create = async (model, data) => {
  try {
    return await repository.create(model, data);
  } catch (error) {
    logger.error('Error in service (create):', error);
    throw error;
  }
};

exports.update = async (model, id, data) => {
  try {
    return await repository.update(model, id, data);
  } catch (error) {
    logger.error('Error in service (update):', error);
    throw error;
  }
};

exports.delete = async (model, id) => {
  try {
    return await repository.deleteRecord(model, id);
  } catch (error) {
    logger.error('Error in service (delete):', error);
    throw error;
  }
};
