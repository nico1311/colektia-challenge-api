const express = require('express'),
  cookieParser = require('cookie-parser'),
  logger = require('morgan'),
  swaggerUI = require('swagger-ui-express');

const swaggerSpec = require('./swagger');

const indexRouter = require('./routes/index'),
  apiRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = app;
