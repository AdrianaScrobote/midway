const database = require('../database/database')

module.exports = class ProductModel {
  getProducts() {
    return database.query('select * from produto order by id')
  }

  getProduct(id) {
    return database.query(`
      select 
        id,
        estoque,
        "dataCadastro",
        nome,
        tamanho,
        tipo,
        descricao 
      from produto 
      where 
        id = ${id}
        and estoque > 0
    `)
  }

  getDuplicatesWithSumStock() {
    return database.query(`
      select 
        min(id) as id, 
        trim(upper(nome)), 
        valor, 
        trim(upper(tamanho)), 
        trim(upper(tipo)), 
        sum(estoque) as estoque
      from produto 
      group by 
        trim(upper(nome)), 
        valor, 
        trim(upper(tamanho)), 
        trim(upper(tipo)) 
      having count(*) > 1
    `)
  }

  updateProductStock(id, qtyStock) {
    return database.query(`
      update produto set "dataAtualizacao" = now(), estoque = ${qtyStock} where id = ${id}
    `)
  }

  removeDuplicates() {
    return database.query(`
      delete from produto where id not in (
        select 
          min(id) as id
        from produto 
        group by 
          trim(upper(nome)), 
          valor, 
          trim(upper(tamanho)), 
          trim(upper(tipo))
      )  
    `)
  }
}
