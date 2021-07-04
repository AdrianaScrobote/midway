const ProductModel = require('../models/productModel')

module.exports = class ProductService {
  constructor() {
    this.productModel = new ProductModel()
  }

  async getProducts() {
    return await this.productModel.getProducts()
  }

  async getProduct(params) {
    return await this.productModel.getProduct(params)
  }

  async removeDuplicatesAndUpdateStock() {
    const productsDuplicates =
      await this.productModel.getDuplicatesWithSumStock()

    if (productsDuplicates.length > 0) {
      await this.productModel.removeDuplicates()

      await Promise.all(
        productsDuplicates.map(async (item) => {
          await this.productModel.updateProductStock(item.id, item.estoque)
          return item
        })
      )
    }

    return await this.getProducts()
  }

  async updateProductStock(id, qtyStock) {
    return await this.productModel.updateProductStock(id, qtyStock)
  }
}
