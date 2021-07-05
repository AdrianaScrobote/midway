require('dotenv').config()
const axios = require('axios')

describe('Test my productRoute', () => {
  it('should get products', async () => {
    const response = await axios({
      url: process.env.URL + 'product/',
      method: 'get'
    })

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.data)).toBe(true)

    if (response.data.length > 0) {
      let item = response.data[0]
      expect(item).toHaveProperty('id')
    }
  })

  it('should remove duplicates', async () => {
    const response = await axios({
      url: process.env.URL + 'product/remove-duplicates',
      method: 'delete'
    })

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.data)).toBe(true)

    if (response.data.length > 0) {
      let item = response.data[0]
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('nome')
      expect(item).toHaveProperty('valor')
      expect(item).toHaveProperty('estoque')
      expect(item).toHaveProperty('tamanho')
      expect(item).toHaveProperty('tipo')
      expect(item).toHaveProperty('descricao')
      expect(item).toHaveProperty('dataCadastro')
      expect(item).toHaveProperty('dataAtualizacao')
    }
  })
})
