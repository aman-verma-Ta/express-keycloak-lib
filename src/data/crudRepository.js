const db = require('../db/models');
const statusCodes = require('../utils/statusCodes');
exports.findAll = async (modelName) => {
  try {
    const model = db[modelName];
    if (!model) {
      const error = new Error(`Model ${modelName} not found`);
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    const data = await model.findAll();
    if (!data || data.length === 0) {
      const error = new Error('No records found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    return data;
  } catch (error) {
    throw error;//propogate error to service
  }
};

exports.findById = async (modelName, id) => {
  try {
    const model = db[modelName];
    if (!model) {
      const error = new Error(`Model ${modelName} not found`);
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    const data = await model.findByPk(id);
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

exports.create = async (modelName, data) => {
  try {
    const model = db[modelName];
    if (!model) {
      const error = new Error(`Model ${modelName} not found`);
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    if (!data) {
      const error = new Error('Invalid input data');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }
    const createdRecord = await model.create(data);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

exports.update = async (modelName, id, data) => {
  try {
    const model = db[modelName];
    if (!model) {
      const error = new Error(`Model ${modelName} not found`);
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    if (!data) {
      const error = new Error('Invalid input data');
      error.statusCode = statusCodes.BAD_REQUEST;
      throw error;
    }
    const [updatedRows, updatedInstances] = await model.update(data, {
      where: { id: id },
      returning: true,
    });
    if (updatedRows === 0) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    return updatedInstances[0];
  } catch (error) {
    throw error;
  }
};

exports.deleteRecord = async (modelName, id) => {
  try {
    const model = db[modelName];
    if (!model) {
      const error = new Error(`Model ${modelName} not found`);
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    const deletedRows = await model.destroy({
      where: { id: id },
    });
    if (deletedRows === 0) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error;
    }
    return deletedRows;
  } catch (error) {
    throw error;
  }
};