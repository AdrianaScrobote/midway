const ProductModel = require('../models/productModel')

module.exports = class ProductService {
  constructor() {
    this.productModel = new ProductModel()
  }

  async getProducts() {
    return await this.productModel.getProducts()
  }
}
