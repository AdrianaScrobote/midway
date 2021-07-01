const http = require('http')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('Servidor rodando com ExpressJS')
})

http
  .createServer(app)
  .listen(3000, () => console.log('Servidor rodando local na porta 3000'))
