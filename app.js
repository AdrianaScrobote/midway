const http = require('http')
const express = require('express')
require('dotenv').config()

const app = express()

const index = require('./src/routes/index')

app.use(express.json())
app.use('/', index)

http
  .createServer(app)
  .listen(3000, () => console.log('Servidor rodando local na porta 3000'))
