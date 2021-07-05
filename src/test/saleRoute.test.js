require('dotenv').config()
const axios = require('axios')
var idNotaFiscal

describe('Test my saleRoute', () => {
  it('should post sale', async () => {
    const response = await axios.post(process.env.URL + 'sale/', {
      dataVenda: '2021-07-03 20:37:36',
      idProduto: '1',
      cpf: '095.900.739-30'
    })

    expect(response.status).toBe(200)
    expect(typeof response.data).toBe('object')
    expect(response.data).toHaveProperty('idProduto')
    expect(response.data).toHaveProperty('nome')
    expect(response.data).toHaveProperty('tamanho')
    expect(response.data).toHaveProperty('tipo')
    expect(response.data).toHaveProperty('descricao')
    expect(response.data).toHaveProperty('cpf')
    expect(response.data).toHaveProperty('idNotaFiscal')
    expect(response.data).toHaveProperty('dataVenda')

    idNotaFiscal = response.data.idNotaFiscal
  })

  it('should post cancellation', async () => {
    if (idNotaFiscal) {
      const response = await axios.patch(
        process.env.URL + 'sale/cancellation',
        {
          idNotaFiscal: idNotaFiscal,
          idProduto: '1',
          cpf: '095.900.739-30'
        }
      )

      expect(response.status).toBe(200)
      expect(typeof response.data).toBe('object')
      expect(response.data).toHaveProperty('message')
    }
  })
})
