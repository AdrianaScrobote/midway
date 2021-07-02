const database = require('../database/database')

module.exports = class SaleModel {
  generateTaxInvoice(idProduto, cpf, dataVenda) {
    const sql = `
      insert into nota_fiscal 
      (
        "idProduto",
        cpf, 
        "dataVenda", 
        "dataCadastro"
      )
      values 
      (
        ${idProduto}, 
        '${cpf}', 
        '${dataVenda}', 
        now()
      )
      RETURNING 
        "idProduto",
        id as "idNotaFiscal",
        cpf,
        "dataVenda"
    `
    return database.query(sql)
  }
}
