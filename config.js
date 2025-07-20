require('dotenv').config();

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_ADMIN_PASSWORD: process.env.JWT_ADMIN_PASSWORD,
  JWT_USER_PASSWORD: process.env.JWT_USER_PASSWORD
};