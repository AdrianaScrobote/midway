require('dotenv').config()
const axios = require('axios')

test('should get main route', async () => {
  const response = await axios({
    url: process.env.URL,
    method: 'get'
  })

  expect(response.status).toEqual(200)
  expect(response.data).toBe('Servidor rodando com ExpressJS')
})
