const authMiddleware = require('../middlewares/authMiddleware');
const { logger } = require('../utils/logger');
const statusCodes = require('../utils/statusCodes');

exports.getLoggedInUserInfo = async (req, res, next) => {
  try {
    const user = await authMiddleware.getLoggedInUserInfo(req.kauth.grant.access_token.content);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = statusCodes.NOT_FOUND;
      throw error; // Pass to error handler
    }
    res.status(statusCodes.SUCCESS).json({
      success: true,
      message: 'User info fetched successfully',
      data: user,
    });
  } catch (error) {
    logger.error({
        message: 'Error in auth controller (getLoggedInUserInfo)',
        error: error.message,
        stack: error.stack, // Include stack trace as part of the log object
    });
    next(error); // Pass to global error handler
  }
};