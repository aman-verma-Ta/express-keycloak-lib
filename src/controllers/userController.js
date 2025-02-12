const userService = require('../services/userService');
const logger = require('../utils/logger');

exports.getLoggedInUserInfo = async (req, res) => {
    try {
      const user = await userService.getLoggedInUserInfo(req.kauth.grant.access_token.content);
      res.json({ user });
    } catch (error) {
      logger.error("Error in controller:", error);
      res.status(500).json({ error: 'Error fetching user info' });
    }
};