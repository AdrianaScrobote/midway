const ProductService = require('./productService')
const SaleModel = require('../models/saleModel')
const validator = require('../helpers/validator')
const date = require('../helpers/date')

const MIN_PRODUCT_STOCK = 1
const MIN_SIZE_ARRAY = 1

module.exports = class SaleService {
  constructor() {
    this.productService = new ProductService()
    this.saleModel = new SaleModel()
  }

  async saleProduct(params) {
    const result = {}

    this.validParamsSaleProduct(params)

    let product = await this.productService.getProduct(params.idProduto)

    if (
      product.length < MIN_SIZE_ARRAY ||
      product[0].estoque < MIN_PRODUCT_STOCK
    ) {
      throw new Error(
        `o idProduto ${params.idProduto} não está disponível no estoque!`
      )
    }

    product = product[0]

    if (
      !validator.isValidDifferenceDates(
        new Date(params.dataVenda),
        date.getLocalDate(product.dataCadastro)
      )
    ) {
      throw new Error(
        `o idProduto ${params.idProduto} não estava à venda na data informada!`
      )
    }

    const currentDate = new Date()

    if (
      !validator.isValidDifferenceDates(
        date.getLocalDate(currentDate),
        new Date(params.dataVenda)
      )
    ) {
      throw new Error(`a data de venda deve ser menor do que a data atual!`)
    }

    const qtyStock = product.estoque - 1
    await this.productService.updateProductStock(params.idProduto, qtyStock)

    const taxInvoice = await this.saleModel.generateTaxInvoice(
      params.idProduto,
      params.cpf,
      params.dataVenda
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

  validParamsSaleProduct(params) {
    if (!params.idProduto) {
      throw new Error('informe o parâmetro idProduto')
    } else if (!validator.isValidNumber(params.idProduto)) {
      throw new Error(`o parâmetro idProduto deve ser um valor numérico!`)
    }

    if (!params.dataVenda) {
      throw new Error('informe o parâmetro dataVenda')
    } else {
      params.dataVenda = validator.getDatetimeString(params.dataVenda)

      if (!params.dataVenda) {
        throw new Error('o parâmetro dataVenda é inválido!')
      }
    }

    if (!params.cpf) {
      throw new Error('informe o parâmetro cpf')
    } else {
      params.cpf = params.cpf.replace(/[.-\s]+/g, '')
      if (!validator.isValidNumber(params.cpf)) {
        throw new Error(`o parâmetro cpf é inválido!`)
      }
    }
  }
}
