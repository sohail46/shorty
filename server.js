const dotenv = require('dotenv');
// eslint-disable-next-line no-unused-vars
const sequelize = require('./sequelize');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥: Shutting down...');
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on Port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message, err.stack);
  console.log('UNHANDLED REJECTION 💥: Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
