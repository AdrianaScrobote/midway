const http = require('http')
const express = require('express')
require('dotenv').config()
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const app = express()

const index = require('./src/routes/index')

app.use(express.json())
app.use('/', index)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

http
  .createServer(app)
  .listen(3000, () => console.log('Servidor rodando local na porta 3000'))
