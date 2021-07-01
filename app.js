const http = require('http')
const express = require('express')

const app = express()

const index = require('./src/routes/index')

app.use('/', index)

http
  .createServer(app)
  .listen(3000, () => console.log('Servidor rodando local na porta 3000'))
