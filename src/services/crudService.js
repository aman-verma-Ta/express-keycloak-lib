const repository = require('../data/crudRepository');
const statusCodes = require('../utils/statusCodes'); // Import status codes

exports.getAll = async (model) => {
  try {
    const data = await repository.findAll(model);
    if (!data || data.length === 0) {
      const error = new Error('No records found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; // Propagate error to controller
    }
    return data;
  } catch (error) {
    throw error; 
  }
};

exports.getById = async (model, id) => {
  try {
    const data = await repository.findById(model, id);
    if (!data) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; 
    }
    return data;
  } catch (error) {
    throw error; 
  }
};

exports.create = async (model, data) => {
  try {
    if (!data) {
      const error = new Error('Invalid input data');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error; 
    }
    const createdRecord = await repository.create(model, data);
    return createdRecord;
  } catch (error) {
    throw error; 
  }
};

exports.update = async (model, id, data) => {
  try {
    if (!data) {
      const error = new Error('Invalid input data');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error; 
    }
    const updatedRecord = await repository.update(model, id, data);
    if (!updatedRecord) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; 
    }
    return updatedRecord;
  } catch (error) {
    throw error; 
  }
};

exports.delete = async (model, id) => {
  try {
    const deletedRecord = await repository.deleteRecord(model, id);
    if (!deletedRecord) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; 
    }
    return deletedRecord;
  } catch (error) {
    throw error; 
  }
};