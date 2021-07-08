# midway

Foi criada uma API backend, com endpoints para remover produtos duplicados no estoque, vender produto e cancelar venda.

### Como rodar localmente?

1. Faça o clone deste projeto no seu computador.
2. Neste projeto foi utilizado o banco de dados Postgres. É necessário criar um database com as configurações abaixo. As configurações do banco de dados estão disponíveis no arquivo .env do projeto e se for necessário alterá-las para facilitar os testes, pode ser realizado no arquivo .env.

- DB_HOST = 'localhost'
- DB_PORT = 5432
- DB_USER = 'postgres'
- DB_PASSWORD = 'admin'
- DB_NAME = 'midway'

3. Execute os scripts disponíveis no arquivo src\database\migrations\createProduto.sql para criar a tabela de produtos e para inserir os dados iniciais.
4. Execute os scripts disponíveis no arquivo src\database\migrations\createNotaFiscal.sql para criar a tabela de nota fiscal.
5. Certifique-se de ter o npm instalado em sua máquina (comando: npm -v).
6. Garanta que o Node está instalado em sua máquina (comando node -v)
7. No diretório principal do projeto clonado em sua máquina, execute o comando para instalar as dependências do projeto: npm i
8. Execute o comando para iniciar o servidor localmente (irá utilizar a porta 3000):
   npm run start
9. Após o servidor estar rodando, pode-se fazer requisições no endereço:
   http://localhost:3000/

### Informações importantes sobre a API:

- A API tem uma documentação técnica disponível no link:
  http://localhost:3000/api-docs/
- Para consultar exemplos de requests e responses pode ser usada a documentação informada. No link da documentação, também é possível testar requisições.

### Endpoints criados:

- Método: get. Endpoint: /product/
  Descrição: retorna todos os produtos cadastrados no banco.

---

- Método: delete. Endpoint: /product/remove-duplicates/
  Descrição: remove todos os produtos duplicados a atualiza quantidade de estoque.

---

- Método: post. Endpoint: /sale/
  Descrição: realiza uma venda e gera nota fiscal.

---

- Método: patch. Endpoint: /sale/cancellation/
  Descrição: realiza o cancelamento de uma venda.

---

### Como rodar os testes?

Para executar os testes é necessário executar o comando:
npm run test

#END
