const express = require('express'),
  router = express.Router();

/**
 * Example API route
 * @swagger
 *
 * /api/:
 *   get:
 *    responses:
 *      '200':
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: 'string'
 *                  example: 'Hello world!'
 *
 */
router.get('/', (req, res, next) => {
  res.json({
    message: 'Hello world!',
  });
});

module.exports = router;
