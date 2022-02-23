# ProFranch Café Backend

<h3> Sistema de backend da empresa ProFranch Café que possui as seguintes funcionalidades: </h3>

    - Autenticação e controle de acesso ao sistema;
    - Controle e gerecniamento de usuários do sistema;
    - Gerenciamento e controle do estoque de ingredientes e produtos;
    - Relatório gerencial para verificação de produtos com seus custos;
    - Função para pesquisa de produtos por palavra-chave;
    - Função de verificação prévia para garantir a fabricação de produtos;

<h2> Tecnologias utilizadas </h2>

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Express.Router](https://expressjs.com/pt-br/guide/routing.html)
- [Node](https://nodejs.org/en/)
- [Eslint](https://eslint.org/)
- [JWT](https://jwt.io/)
- [Multer](https://github.com/expressjs/multer)

 _dentre outras..._

<h2> Pré-Requisitos 📋 </h2>

- Node: `17.5.0`
- MongoDB: `5.0.6`
- Npm: `8.4.1` or higher
- Git: `2.25.1` or higher

<h2> Como Instalar 🏃 </h2>

1. Copie o link ssh: ``` git@github.com:paulrpn/profranch-cafe-backend.git ```

2. Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:
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
 
 <h2> Testes com Insomnia 🖥️ </h2>
 
Para utilizar os testes já configurados para a ferramenta [Insomnia](https://insomnia.rest/) basta abrí-la, clicar no botão `Create` (canto superior direito), no menu `IMPORT FROM` acessar a opção `+ File` e selecionar o arquivo `insomnia-tests.json` que já está na raiz da estrutura de pastas.
<div align="center">
  <img src="https://user-images.githubusercontent.com/84095521/155300053-692e5b48-3ca0-4c5d-abd5-80ebf23fdc2b.png" alt="insomnia-option" height="570" width="250">
  <img src=https://user-images.githubusercontent.com/84095521/155300443-626a2512-5fb9-438a-b28d-c7ccd916edf8.png alt="insomnia-collection" height="570" width="750">
</div>

<h2> Arquitetura Modelo MSC - RESTFUL 🏛️ </h2>

[`CONTROLLERS`] Todas as rotas que se comunicam com `express.router` e divididas por função <br>
[`SERVICES`] Validação de dados e controle de acesso <br>
[`MODELS`] Queries SQL e acesso ao MongoDB <br>
[`MIDDLEWARE`] Tratamento de erros `HTTP`, serviço de autenticação com `JWT` e serviço de storage para upload com `multer` <br>

<h2> Banco de Dados - MongoDB </h2>

A estrutura do banco de dados `ProFranchCafe` é composta por 3 trabelas não-relacionais:<br>
  
  1) `[users]` Cadastro e gerenciamento de usuários. Existem 2 níveis de acesso: `user`, apenas para consultas públicas e `admin`, para funções de gerenciamento e consultas gerenciais. Segue exemplo de uma estrutura máxima para um document desta collection:
  <div align="center">
    <img src=https://user-images.githubusercontent.com/84095521/155309148-df2a1b2b-3a64-4edf-9019-750dc4862b32.png alt="document-user" height="200" width="300">
    ![document-user](https://user-images.githubusercontent.com/84095521/155309148-df2a1b2b-3a64-4edf-9019-750dc4862b32.png)
![document-admin](https://user-images.githubusercontent.com/84095521/155309166-d14aaabd-e387-47d4-ad0c-96af749de2fb.png)

  </div>
 
  2) [`ingredients`] Cadastro, manipulação e consultas de ingredientes
  
  3) `products` - Cadastro, manipulação e consultas de produtos
