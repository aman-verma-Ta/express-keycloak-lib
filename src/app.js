require('dotenv').config({ path: `${__dirname}/../.env` });
const express = require('express');
//const cors = require('cors');
const authRouter = require('./routes/authRoute');
const crudRouter = require('./routes/crudRoute');
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/database'); // Import the Sequelize instance
const { logger, httpLogger } = require('./utils/logger');
const { keycloak, sessionMiddleware }  = require('./config/keycloak');
const helmetConfig = require('./config/helmetConfig');
const errorHandler = require('./utils/errorHandler'); // Import the error handler

const app = express();

app.use(helmetConfig);
app.use(express.json());
app.use(sessionMiddleware); // Session middleware MUST be before Keycloak
app.use(keycloak.middleware());

// Initialize database
sequelize.sync()
.then(() => logger.info('Database synced'))
.catch(err => logger.error('Database sync failed:', err));

app.use(httpLogger);

//register routes
app.use('/api/v1/user', authRouter);
app.use('/api', crudRouter);

// Register the global error handler (must be after all other middleware and routes)
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;