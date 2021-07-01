const express = require('express')

const router = express.Router()
const ProductService = require('../services/productService')

const productService = new ProductService()

router.get('/product/', async (req, res) => {
  try {
    const products = await productService.getProducts()
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.toString() })
  }
})

router.delete('/product/remove-duplicates', async (req, res) => {
  try {
    const products = await productService.removeDuplicatesAndUpdateStock()
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json(error.toString())
  }
})

module.exports = router
