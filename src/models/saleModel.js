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

  cancelTaxInvoice(id) {
    return database.query(`
      update nota_fiscal 
      set 
        status = 'Cancelado', 
        "dataAtualizacao" = now() 
      where id = '${id}'
    `)
  }

  getTaxInvoice(idNotaFiscal, idProduto, cpf) {
    return database.query(`
      select 
        id,
        status
      from nota_fiscal 
      where 
        id = '${idNotaFiscal}' 
        and "idProduto" = ${idProduto} 
        and cpf = '${cpf}'
    `)
  }
}
