const service = require('../services/crudService');
const { logger } = require('../utils/logger');
const statusCodes = require('../utils/statusCodes'); // Import status codes

exports.getAll = async (req, res, next) => {
  try {
    const data = await service.getAll(req.params.model);
    if (!data) {
      const error = new Error('No records found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; // Pass to error handler
    }
    res.status(statusCodes.SUCCESS).json({
      success: true,
      message: 'Data fetched successfully',
      data: data,
    });
  } catch (error) {
    logger.error({
        message: 'Error in controller (getAll)',
        error: error.message,
        stack: error.stack, // Include stack trace as part of the log object
    });
    next(error); // Pass to global error handler
  }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await service.getById(req.params.model, req.params.id);
    if (!data) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; // Pass to error handler
    }
    res.status(statusCodes.SUCCESS).json({
      success: true,
      message: 'Data fetched successfully',
      data: data,
    });
  } catch (error) {
    logger.error({
        message: 'Error in controller (getById)',
        error: error.message,
        stack: error.stack, // Include stack trace as part of the log object
    });
    next(error); 
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = await service.create(req.params.model, req.body, {
      context: { user: req.user },
    });
    res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Record created successfully',
      data: data,
    });
  } catch (error) {
    logger.error({
        message: 'Error in controller (create)',
        error: error.message,
        stack: error.stack, // Include stack trace as part of the log object
    });
    next(error); 
  }
};

exports.update = async (req, res, next) => {
  try {
    const data = await service.update(
      req.params.model,
      req.params.id,
      req.body,
      { context: { user: req.user } }
    );
    if (!data) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; // Pass to error handler
    }
    res.status(statusCodes.SUCCESS).json({
      success: true,
      message: 'Data successfully updated',
      data: data,
    });
  } catch (error) {
    logger.error({
        message: 'Error in controller (update)',
        error: error.message,
        stack: error.stack, // Include stack trace as part of the log object
    });
    next(error); 
  }
};

exports.delete = async (req, res, next) => {
  try {
    const data = await service.delete(req.params.model, req.params.id);
    if (!data) {
      const error = new Error('Record not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; // Pass to error handler
    }
    res.status(statusCodes.SUCCESS).json({
      success: true,
      message: 'Data successfully deleted',
      data: data,
    });
  } catch (error) {
    logger.error({
        message: 'Error in controller (delete)',
        error: error.message,
        stack: error.stack, // Include stack trace as part of the log object
    });
    next(error); 
  }
};