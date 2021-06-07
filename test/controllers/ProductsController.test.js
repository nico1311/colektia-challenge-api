require('dotenv').config();
process.env.NODE_ENV = 'test';

const consola = require('consola');
const mysql = require('mysql2');
const supertest = require('supertest');
const { expect } = require('chai');
const { app, setup } = require('../../src/app');

describe('ProductsController', function() {
  this.timeout(5000);

  before(function(done) {
    consola.info('Clearing products table');
    const conn = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_TEST_DB
    });
    conn.execute('DROP TABLE IF EXISTS `products`', (err) => {
      if (err) {
        consola.fatal('DB query error: ', err);
        process.exit(1);
      }
      setup().then(done).catch((err) => {
        consola.fatal(err);
        process.exit(1);
      });
    });
  });

  it('initial GET request returns 200 and an empty array', function(done) {
    supertest(app).get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object')
          .to.have.property('products')
          .with.lengthOf(0);
        done();
      });
  });

  it('creates a product', function(done) {
    supertest(app).post('/api/products')
      .field('name', 'Lenovo IdeaPad 3 Laptop')
      .field('description', 'Test description')
      .field('price', 359.99)
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object')
          .to.include({
            id: 1,
            name: 'Lenovo IdeaPad 3 Laptop',
            description: 'Test description',
            price: 359.99
          })
        done();
      });
  });

  it('gets list of products', function(done) {
    supertest(app).get('/api/products')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object')
          .to.have.property('products')
          .with.lengthOf(1);
        done();
      });
  });

  it('edits a product', function(done) {
    supertest(app).patch('/api/products/1')
      .field('description', 'New description')
      .field('price', 599.99)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object')
          .to.include({
            id: 1,
            description: 'New description',
            price: 599.99
          })
        done();
      });
  });

  it('deletes a product', function(done) {
    supertest(app).delete('/api/products/1')
      .expect(204, done);
  });
});
