const express = require('express')

const router = express.Router()
const SaleService = require('../services/saleService')

const saleService = new SaleService()

router.post('/', async (req, res) => {
  try {
    const result = await saleService.saleProduct(req.body)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.toString() })
  }
})

router.patch('/cancellation', async (req, res) => {
  try {
    const result = await saleService.cancelSaleProduct(req.body)
    res.json(result)
  } catch (error) {
    res.status(error.status || 500).json({ message: error.toString() })
  }
})

module.exports = router
