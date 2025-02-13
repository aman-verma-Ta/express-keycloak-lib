require('dotenv').config({ path: `${__dirname}/../.env` });
const express = require('express');
//const cors = require('cors');
const userRouter = require('./routes/userRoute');
const crudRouter = require('./routes/crudRoute');
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/database'); // Import the Sequelize instance
const logger = require('./utils/logger');
const { keycloak, sessionMiddleware }  = require('./config/keycloak');
const helmetConfig = require('./config/helmetConfig');

const app = express();

app.use(helmetConfig);
app.use(express.json());
app.use(sessionMiddleware); // Session middleware MUST be before Keycloak
app.use(keycloak.middleware());

// Initialize database
sequelize.sync()
.then(() => logger.info('Database synced'))
.catch(err => logger.error('Database sync failed:', err));

//register routes
app.use('/api/v1/user', userRouter);
app.use('/api', crudRouter);

// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;