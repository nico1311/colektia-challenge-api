const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const formidable = require('formidable');
const path = require('path');
const consola = require('consola');

const swaggerSpec = require('./swagger');

const { sequelize } = require('./db');
const Product = require('./db/models/Product');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// parse multipart/form-data
app.use((req, res, next) => {
  if (req.formParsed) return next();

  const form = formidable({
    encoding: 'utf-8',
    filter({ mimetype }) {
      return mimetype && mimetype.includes('image');
    },
    hashAlgorithm: 'sha256',
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024,
    uploadDir: path.resolve('./uploads'),
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      consola.error('Form parsing error', err);
      return next(err);
    }

    Object.assign(req, {
      fields,
      files,
      formParsed: true,
    });

    next();
  });
});

// Initializing models
Product.init(sequelize);

// Routes
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/images', express.static(path.resolve('./uploads')));

const setup = async () => {
  await sequelize.authenticate();
  await Product.sync();
};

module.exports = {
  app,
  setup,
};
