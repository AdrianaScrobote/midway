const express = require('express')

let router = express.Router()
const productRoute = require('./productRoute')

router = Object.assign(router, productRoute)

router.get('/', (req, res) => {
  res.send('Servidor rodando com ExpressJS')
})

module.exports = router
