require('dotenv').config({ path: `${__dirname}/../../.env` });
const Keycloak = require('keycloak-connect');
const session = require('express-session'); // Important: Session handling is required
const { v4: uuidv4 } = require('uuid');

//const memoryStore = new session.MemoryStore(); // Or a better store for production like Redis
const sessionStore = new session.MemoryStore();  // NEVER use MemoryStore in production!

exports.keycloak = new Keycloak({
  store: sessionStore, // Use a session store
}, {
  "realm": process.env.KEYCLOAK_REALM,
  "auth-server-url": 'https://deepthoughtkeycloak-b7ecewdebaecgsh2.canadacentral-01.azurewebsites.net',//process.env.KEYCLOAK_URL, // Corrected key
  "ssl-required": "external",
  "resource": process.env.KEYCLOAK_CLIENT_ID,
  "credentials": {
    "secret": process.env.KEYCLOAK_CLIENT_SECRET
  }
});

// Session middleware is essential for Keycloak
exports.sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || uuidv4(), // // Generate secret if not provided
  resave: false,
  saveUninitialized: false, // or false if you want to be more strict
  store: sessionStore, // Use a session store
});