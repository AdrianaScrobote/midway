const ProductService = require('./productService')
const SaleModel = require('../models/saleModel')
const validator = require('../helpers/validator')

const MIN_STOCK_PRODUCT = 1
const MIN_SIZE_ARRAY = 1

module.exports = class SaleService {
  constructor() {
    this.productService = new ProductService()
    this.saleModel = new SaleModel()
  }

  async saleProduct(body) {
    const result = {}
    let dataVenda
    let cpf

    if (!body.idProduto) {
      throw new Error('informe o parâmetro idProduto')
    } else if (!validator.isValidNumber(body.idProduto)) {
      throw new Error(`o parâmetro idProduto deve ser um valor numérico!`)
    }

    if (!body.dataVenda) {
      throw new Error('informe o parâmetro dataVenda')
    } else {
      dataVenda = validator.getDatetimeString(body.dataVenda)

      if (!dataVenda) {
        throw new Error('o parâmetro dataVenda é inválido!')
      }
    }

    if (!body.cpf) {
      throw new Error('informe o parâmetro cpf')
    } else {
      cpf = body.cpf.replace(/[.-\s]+/g, '')
      if (!validator.isValidNumber(cpf)) {
        throw new Error(`o parâmetro cpf é inválido!`)
      }
    }

    let product = await this.productService.getProduct(body.idProduto)

    if (
      product.length < MIN_SIZE_ARRAY ||
      product[0].estoque < MIN_STOCK_PRODUCT
    ) {
      throw new Error(
        `o idProduto ${body.idProduto} não está disponível no estoque!`
      )
    }

    product = product[0]

    if (
      !validator.isValidDifferenceDates(
        new Date(dataVenda),
        new Date(product.dataCadastro)
      )
    ) {
      throw new Error(
        `o idProduto ${body.idProduto} não estava à venda na data ${body.dataVenda}!`
      )
    }

    const qtyStock = product.estoque - 1
    await this.productService.updateProductStock(body.idProduto, qtyStock)

    const taxInvoice = await this.saleModel.generateTaxInvoice(
      body.idProduto,
      cpf,
      dataVenda
    )

    if (taxInvoice.length >= MIN_SIZE_ARRAY) {
      result['idProduto'] = product.id
      result['nome'] = product.nome
      result['tamanho'] = product.tamanho
      result['tipo'] = product.tipo
      result['descricao'] = product.descricao
      result['cpf'] = taxInvoice[0].cpf
      result['idNotaFiscal'] = taxInvoice[0].idNotaFiscal
      result['dataVenda'] = taxInvoice[0].dataVenda
    }

    return result
  }
}
