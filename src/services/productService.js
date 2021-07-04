const ProductModel = require('../models/productModel')
const date = require('../helpers/date')

module.exports = class ProductService {
  constructor() {
    this.productModel = new ProductModel()
  }

  async getProducts() {
    const products = await this.productModel.getProducts()

    products.map((item) => {
      item.dataCadastro = date.getLocalDate(item.dataCadastro)
      item.dataAtualizacao = item.dataAtualizacao
        ? date.getLocalDate(item.dataAtualizacao)
        : null
      return item
    })

    return products
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
