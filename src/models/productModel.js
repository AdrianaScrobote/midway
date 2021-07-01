const database = require('../database/database')

module.exports = class ProductModel {
  getProducts() {
    return database.query('select * from produto order by id')
  }
}
