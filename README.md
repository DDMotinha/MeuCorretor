Autenticação
POST /api/auth/register: Cria uma nova conta de usuário. Espera um objeto JSON com as seguintes propriedades: name, email e password.

POST /api/auth/login: Faz o login com um usuário existente e retorna um token JWT. Espera um objeto JSON com as seguintes propriedades: email e password.

Usuários
GET /api/users: Retorna uma lista de todos os usuários cadastrados.

GET /api/users/:id: Retorna os detalhes de um usuário específico.

PUT /api/users/:id: Atualiza os detalhes de um usuário específico. Espera um objeto JSON com as seguintes propriedades: name e email.

DELETE /api/users/:id: Exclui um usuário específico.

Para usar a API, primeiro é necessário se registrar usando o endpoint /api/auth/register. Em seguida, você pode fazer login usando o endpoint /api/auth/login, que retornará um token JWT. Esse token deve ser incluído no cabeçalho de todas as solicitações subsequentes como um token de autenticação.

A API é protegida por autenticação JWT, o que significa que é necessário um token válido para acessar os endpoints protegidos. O token pode ser incluído no cabeçalho da solicitação com a chave Authorization e o valor Bearer {token}.

Isso é tudo! Claro, essa é apenas uma API básica e há muitas outras coisas que podem ser feitas para melhorá-la e adicioná-la, mas espero que isso ajude a entender como construir uma API RESTful básica com autenticação JWT.

# Meu Projeto

Este é um projeto simples desenvolvido em Node.js com o objetivo de demonstrar o uso de autenticação de usuários.

## Funcionalidades

* Login e autenticação de usuários
* Cadastro de novos usuários
* Atualização de informações do usuário
* Exclusão de usuários

## Como usar

1. Clone o repositório em sua máquina
2. Instale as dependências com o comando `npm install`
3. Inicie o servidor com o comando `npm start`
4. Acesse a aplicação em seu navegador através do endereço `http://localhost:3000`

## Licença

Este projeto está licenciado sob a licença MIT. Para mais informações, consulte o arquivo LICENSE.md.
