<h1>Simulação de um app para criar uma conta bancária, feito em NodeJS.</h1>

[![Package][nodemon-image]][nodemon-url] 
[![Technology][node-image]][node-url] 
[![License][license-image]][license-url]


[nodemon-url]: https://www.npmjs.com/package/nodemon
[nodemon-image]: https://img.shields.io/badge/Nodemon-green?style=for-the-badge&logo=Nodemon&logoColor=black

[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=github

[node-url]: https://nodejs.org/
[node-image]: https://img.shields.io/badge/NodeJS-green?style=for-the-badge&logo=Node-dot-js&logoColor=black

---

1º - yarn install

2º - yarn dev

---

### Requisitos
- Deve ser possível criar uma conta.
- Deve ser possível buscar o extrato bancário do cliente.
- Deve ser possível realizar um depósito.
- Deve ser possível realizar um saque.
- Deve ser possível buscar o extrato bancário do cliente por data.
- Deve ser possível atualizar dados da conta do cliente.
- Deve ser possível obter dados da conta do cliente.
- Deve ser possível deletar uma conta.



## Regras de negócio
- Não deve ser possível cadastrar uma conta com cpf já existente
- Não deve ser possível fazer depósito em uma conta não existente
- Não deve ser possível buscar extrato em uma conta não existente
- Não deve ser possível fazer saque em uma conta não existente
- Não deve ser possível excluir uma conta não existente
- Não deve ser possível fazer saque quando o saldo for insuficiente