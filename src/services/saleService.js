const createError = require('http-errors')
const ProductService = require('./productService')
const SaleModel = require('../models/saleModel')
const validator = require('../helpers/validator')
const date = require('../helpers/date')

const MIN_PRODUCT_STOCK = 1

module.exports = class SaleService {
  constructor() {
    this.productService = new ProductService()
    this.saleModel = new SaleModel()
  }

  async saleProduct(params) {
    const result = {}

    this.validParamsSaleProduct(params)

    params.hasStock = true
    let product = await this.productService.getProduct(params)

    if (product.length < 1 || product[0].estoque < MIN_PRODUCT_STOCK) {
      throw createError(
        400,
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
      throw createError(
        400,
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
      throw createError(
        400,
        `a data de venda deve ser menor do que a data atual!`
      )
    }

    const qtyStock = product.estoque - 1
    await this.productService.updateProductStock(params.idProduto, qtyStock)

    const taxInvoice = await this.saleModel.generateTaxInvoice(
      params.idProduto,
      params.cpf,
      params.dataVenda
    )

    if (taxInvoice.length > 0) {
      result['idProduto'] = product.id
      result['nome'] = product.nome
      result['tamanho'] = product.tamanho
      result['tipo'] = product.tipo
      result['descricao'] = product.descricao
      result['cpf'] = taxInvoice[0].cpf
      result['idNotaFiscal'] = taxInvoice[0].idNotaFiscal
      result['dataVenda'] = date.getLocalDate(taxInvoice[0].dataVenda)
    }

    return result
  }

  validParamsSaleProduct(params) {
    if (!params.idProduto) {
      throw createError(400, `informe o parâmetro idProduto!`)
    } else if (!validator.isValidNumber(params.idProduto)) {
      throw createError(
        400,
        `o parâmetro idProduto deve ser um valor numérico!`
      )
    }

    if (!params.dataVenda) {
      throw createError(400, `informe o parâmetro dataVenda!`)
    } else {
      if (!validator.isValidDatetimeString(params.dataVenda)) {
        throw createError(400, `o parâmetro dataVenda é inválido!`)
      }

      let dataVenda = new Date(params.dataVenda)
      dataVenda = date.getLocalDate(dataVenda)
      params.dataVenda = dataVenda.toISOString()
    }

    if (!params.cpf) {
      throw createError(400, `informe o parâmetro cpf!`)
    } else {
      params.cpf = params.cpf.replace(/[.-\s]+/g, '')
      if (!validator.isValidNumber(params.cpf)) {
        throw createError(400, `o parâmetro cpf é inválido!`)
      }
    }
  }

  async cancelSaleProduct(params) {
    this.validParamsCancelSaleProduct(params)

    const getTaxInvoice = await this.saleModel.getTaxInvoice(
      params.idNotaFiscal,
      params.idProduto,
      params.cpf
    )

    if (getTaxInvoice.length < 1) {
      throw createError(
        400,
        `a nota fiscal não foi encontrada! Por favor, verifique as informações enviadas!`
      )
    }

    if (getTaxInvoice[0].status === 'Cancelado') {
      throw createError(400, `a nota fiscal informada já foi cancelada!`)
    }

    await this.saleModel.cancelTaxInvoice(params.idNotaFiscal)

    const product = await this.productService.getProduct(params)

    const qtyStock = product[0].estoque + 1
    await this.productService.updateProductStock(params.idProduto, qtyStock)

    return { message: 'A venda do produto foi cancelada com sucesso!' }
  }

  validParamsCancelSaleProduct(params) {
    if (!params.idProduto) {
      throw createError(400, `informe o parâmetro idProduto!`)
    } else if (!validator.isValidNumber(params.idProduto)) {
      throw createError(
        400,
        `o parâmetro idProduto deve ser um valor numérico!`
      )
    }

    if (!params.cpf) {
      throw createError(400, `informe o parâmetro cpf!`)
    } else {
      params.cpf = params.cpf.replace(/[.-\s]+/g, '')
      if (!validator.isValidNumber(params.cpf)) {
        throw createError(400, `o parâmetro cpf é inválido!`)
      }
    }

    if (!params.idNotaFiscal) {
      throw createError(400, `informe o parâmetro idNotaFiscal!`)
    } else if (!validator.isValidUUID(params.idNotaFiscal)) {
      throw createError(400, `o parâmetro idNotaFiscal é inválido!`)
    }
  }
}
