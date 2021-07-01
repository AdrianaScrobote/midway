const express = require('express')

const router = express.Router()
const ProductService = require('../services/productService')

const productService = new ProductService()

router.get('/product/', async (req, res) => {
  try {
    const products = await productService.getProducts()
    return res.json(products)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.toString() })
  }
})

module.exports = router
