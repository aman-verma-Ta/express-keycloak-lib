# Express.js Keycloak Project Template

This template provides a solid foundation for building Express.js applications with Keycloak authentication, CRUD APIs, and Sequelize.

## Getting Started

1.  **Clone:** `git clone https://github.com/aman-verma-Ta/express-keycloak-lib.git`
2.  **Install:** `cd express-keycloak-lib && npm install`
3.  **Configure:**
    *   Copy `.env.example` to `.env` and fill in the required environment variables.  See the `.env.example` file for details.
    *   Set up your PostgreSQL database (or configure the connection in `.env`).
    *   Configure Keycloak (see the Keycloak Configuration section below).
4.  **Run:** `npm start`

## Keycloak Configuration

*   Create a Keycloak client with the appropriate settings... (Detailed instructions here)
*   Define the necessary roles in Keycloak...

## Customization Guide

This template is designed to be easily customized.

### Models

To add a new model:

1.  Create a new file in `src/models` (e.g., `product.js`).
2.  Define your model using Sequelize (see existing models for examples).
3.  Import your model in `src/models/index.js`.

```javascript
// src/models/product.js (Example)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize-config');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2)
  }
});

module.exports = Product;