const express = require('express'),
  cookieParser = require('cookie-parser'),
  formidableMiddleware = require('express-formidable'),
  path = require('path'),
  consola = require('consola'),
  logger = require('morgan'),
  swaggerUI = require('swagger-ui-express');

const swaggerSpec = require('./swagger');

const { sequelize } = require('./db'),
  Product = require('./db/models/Product');

const indexRouter = require('./routes/index'),
  apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(formidableMiddleware({
  encoding: 'utf-8',
  filter: function ({mimetype}) {
    return mimetype && mimetype.includes('image');
  },
  hashAlgorithm: 'sha256',
  keepExtensions: true,
  maxFileSize: 2 * 1024 * 1024,
  uploadDir: path.resolve('./uploads')
}));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const setup = async () => {
  await sequelize.authenticate();
  Product.init(sequelize);
  await Product.sync();
  consola.success('Connected to the database');
}

module.exports = {
  app,
  setup
};
