// const userRepository = require('../data/userRepository');
const logger = require('../utils/logger');

exports.getLoggedInUserInfo = async (userProfileFromToken) => {
  try {
    // 1. Extract necessary info from the token claims (userProfileFromToken)
      const userId = userProfileFromToken.sub; // Example: Keycloak uses 'sub' for user ID
      const username = userProfileFromToken.preferred_username;
      const email = userProfileFromToken.email;
      //... extract other relevant info

    // 2. You can optionally fetch additional user details from a database or other source
    //    if needed.  This is useful if you have user data beyond what's in the token.
    // const additionalUserInfo = await userRepository.getUserById(userId);
    // const user = {...userProfileFromToken,...additionalUserInfo }; // Combine

    const user = {
        id: userId,
        username: username,
        email: email,
        //...other properties
    }
    return user;

  } catch (error) {
    logger.error("Error in service:", error);
    throw error; // Re-throw the error for the controller to handle
  }
};
