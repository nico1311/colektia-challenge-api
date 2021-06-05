const { DataTypes, Model } = require('sequelize');

/**
 * Product model
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          readOnly: true
 *          description: '(Auto-generated) ID of the product'
 *          example: 2
 *        name:
 *          type: string
 *          description: Product name
 *          required: true
 *        description:
 *          type: string
 *          description: 'Description of the product'
 *          required: true
 *        price:
 *          type: number
 *          format: double
 *          description: 'Price of the product'
 *          required: true
 *        image:
 *          type: string
 *          readOnly: true
 *          nullable: true
 *          description: 'Name of the uploaded image of the product. Present only in responses for products that have an image attached'
 *          example: 'upload_a91d4e4b79e6995d963cb0a8048d5cbc.png'
 *        imageFile:
 *          type: string
 *          format: binary
 *          description: 'Image file to upload'
 *          writeOnly: true
 */
class Product extends Model {
  /**
   * Initialize this model on a Sequelize instance.
   * @param {import('sequelize').Sequelize} sequelize
   */
  static init(sequelize) {
    return super.init({
      name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.DECIMAL(14, 2)
      },
      image: {
        type: DataTypes.STRING
      }
    }, { sequelize });
  }
}

module.exports = Product;
