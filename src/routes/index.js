const express = require('express')

const router = express.Router()

const productRoute = require('./productRoute')
const saleRoute = require('./saleRoute')

router.get('/', (req, res) => {
  res.send('Servidor rodando com ExpressJS')
})

router.use('/product', productRoute)
router.use('/sale', saleRoute)

module.exports = router
