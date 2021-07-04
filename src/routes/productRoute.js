const express = require('express')

const router = express.Router()
const ProductService = require('../services/productService')

const productService = new ProductService()

router.get('/', async (req, res) => {
  try {
    const products = await productService.getProducts()
    res.json(products)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.toString() })
  }
})

router.delete('/remove-duplicates', async (req, res) => {
  try {
    const products = await productService.removeDuplicatesAndUpdateStock()
    res.json(products)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.toString() })
  }
})

module.exports = router
