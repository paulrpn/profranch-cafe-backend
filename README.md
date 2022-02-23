# ProFranch Café Backend

<h3> Sistema API de backend da empresa ProFranch Café que possui as seguintes funcionalidades: </h3>

    - Autenticação e controle de acesso ao sistema;
    - Controle e gerecniamento de usuários do sistema;
    - Gerenciamento e controle do estoque de ingredientes e produtos;
    - Relatório gerencial para verificação de produtos com seus custos;
    - Função para pesquisa de produtos por palavra-chave;
    - Função de verificação prévia para garantir a fabricação de produtos;

---
## Tecnologias utilizadas

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Express.Router](https://expressjs.com/pt-br/guide/routing.html)
- [Node](https://nodejs.org/en/)
- [Eslint](https://eslint.org/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)

 _dentre outras..._

---
## Pré-Requisitos 📋

- Node: `17.5.0`
- MongoDB: `5.0.6`
- Npm: `8.4.1` or higher
- Git: `2.25.1` or higher

---
## Como Instalar 🏃

1. Copie o link ssh: ``` git@github.com:paulrpn/profranch-cafe-backend.git ```

2. Abra um terminal no seu computador e utilize os comandos abaixo na ordem que são apresentados:
    * `git clone git@github.com:paulrpn/profranch-cafe-backend.git`
    * `cd profranch-cafe-backend`
    * `npm install`
    * `npm start`

3. Renomeie o arquivo `.env.example` para `.env`, abra o mesmo, preencha as variáveis globais conforme as instruções abaixo e salve as modificações:
  
   * Indique o endereço local do seu computador:
      <br>`HOST=localhost`
   * Indique uma porta padrão para o funcionamento do sistema:
      <br>`PORT=3333`
   * Crie sua própria senha para cripitografia do login. Segue sugestão:
      <br>`API_SECRET=HaHaHaHaHaMasEuToRindoAToa`
--- 
## Testes com Insomnia 🖥️
 
Para utilizar os testes já configurados para a ferramenta [Insomnia](https://insomnia.rest/) basta abrí-la, clicar no botão `Create` (canto superior direito), no menu `IMPORT FROM` acessar a opção `+ File` e selecionar o arquivo `insomnia-tests.json` que já está na raiz da estrutura de pastas.
<div align="center">
    <img src="https://user-images.githubusercontent.com/84095521/155300053-692e5b48-3ca0-4c5d-abd5-80ebf23fdc2b.png" alt="insomnia-option" height="350" width="150"> 
    <img src=https://user-images.githubusercontent.com/84095521/155300443-626a2512-5fb9-438a-b28d-c7ccd916edf8.png alt="insomnia-collection" height="350" width="600">
</div>

---
## Arquitetura: Modelo MSC - RESTFUL 🏛️

`CONTROLLERS` Todas as rotas que se comunicam com `express.router` e divididas por função <br>
`SERVICES` Validação de dados e controle de acesso <br>
`MODELS` Queries SQL e acesso ao MongoDB <br>
`MIDDLEWARE` Tratamento de erros `HTTP`, serviço de autenticação com `JWT` e serviço de storage para upload com `multer`

---
## Banco de Dados: MongoDB 🔐

A estrutura do banco de dados `ProFranchCafe` é composta por três tabelas não-relacionais: `users`, `ingredients` e `products`.

1) `USERS` => Cadastro e gerenciamento de usuários. Existem 2 níveis de acesso: `user`, apenas para consultas públicas e `admin`, para funções de gerenciamento e consultas gerenciais. Seguem exemplos de estrutura máxima para documentos desta coleção:
<div align="center">
    <img src=https://user-images.githubusercontent.com/84095521/155309148-df2a1b2b-3a64-4edf-9019-750dc4862b32.png alt="document-user" height="150" width="350"> 
    <img src=https://user-images.githubusercontent.com/84095521/155309166-d14aaabd-e387-47d4-ad0c-96af749de2fb.png alt="document-admin" height="150" width="350">
</div><br>

2) `INGREDIENTS` => Cadastro, manipulação e consultas de ingredientes. Seguem exemplos de estrutura máxima para documentos desta coleção:
<div align="center">
    <img src=https://user-images.githubusercontent.com/84095521/155312241-743be4f5-99f0-4991-a20b-3e5a88894b5c.png alt="document-ovo" height="330" width="320">
    <img src=https://user-images.githubusercontent.com/84095521/155312276-490f4ed1-a9ce-4e0c-b95a-a725393906a9.png alt="document-leite" height="330" width="320">
</div><br>

3) `PRODUCTS` => Cadastro, manipulação e consultas de produtos. Seguem exemplos de estrutura máxima para um documentos desta coleção:
<div align="center">
    <img src=https://user-images.githubusercontent.com/84095521/155315116-9e48ef4b-b7ce-449b-b467-6b379effb073.png alt="document-cookie" height="450" width="360">
    <img src=https://user-images.githubusercontent.com/84095521/155319450-cad567dc-5936-4db1-b0a2-653d736dbf21.png alt="document-pancake" height="450" width="360">
</div><br>

---
## Funcionalidades das Rotas 🛰️

#### Controle de acesso
* `POST` `/users` => Cadastra um novo usuário
* `POST` `/users/login` => Atutentica o login dos usuários com uso de webtoken

#### Gerenciamento de Ingredientes
* `POST` `/ingredient` => Cria um novo ingrediente (ADM)
* `GET` `/ingredient` => Busca todos os ingredientes (ordem alfabética)
* `GET` `/ingredient/search` => Busca ingrediente(s) pelo nome através de palavra-chave `tag` (ordem alfabética)
* `GET` `/ingredient/:id` => Busca um ingrediente através do ID de cadastro
* `PUT` `/ingredient/:id` => Atualiza um ingrediente através do ID de cadastro (ADM)
* `DELETE` `/ingredient/:id` => Apaga um ingredient através do ID de cadastro (ADM)

#### Gerenciamento de Produtos
* `POST` `/products` => Cria um novo produto (ADM)
* `GET` `/products` => Busca todos os produtos (ordem alfabética)
* `GET` `/products/report` => Relatório gerencial com todos os produtos e respectivos preços de custo (ADM)
* `GET` `/products/salecheck` => Funcionalidade gerencial para verificar no estoque a possibilidade de venda de um produto (`product`: nome do produto | `order`: quantidade) (ADM)
* `GET` `/products/search` => Busca ingrediente(s) pelo nome através de palavra-chave `tag` (ordem alfabética)
* `GET` `/products/:id` => Busca um produto através do ID de cadastro
* `PUT` `/products/:id` => Atualiza um produto através do ID de cadastro (ADM)
* `PUT` `/products/:id/image` => Adiciona a imagem de um produto através do ID de cadastro (ADM)
* `DELETE` `/products/:id` => Apaga um produto através do ID de cadastro (ADM)

---
## Contatos 🗣️

# Paulo Nogueira
     
_Fico à disposição para quaisquer esclarecimentos que se fizerem necessários e sinta-se à voltade para realizar um code-review... será muito bem-vindo!_

😁👍🏻
    
[Linkedin](https://www.linkedin.com/in/paulo-rpn/) • [Github](https://github.com/paulrpn) • 📭 paulrpn@live.com 
