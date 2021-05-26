const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.listen(3333);

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find((customer) => customer.cpf === cpf);
  
  if (!customer) {
    return response.status(400).json({error: 'Customer not found.'})
  }

  request.customer = customer;
  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc, uni) => {
    if (uni.type === 'credit') {
      return acc + uni.amount;
    } else {
      return acc + uni.amount;
    }
  }, 0);

  return balance;
};

app.post('/account', (request, response) => {
  const {cpf, name} = request.body;
  const customerAlreadyExists = customers.some( customer => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({error: 'Customer already exists.'});
  }

  customers.push({
    name,
    cpf,
    id: uuidv4(),
    statement: []
  });

  return response.status(201).send();
})

app.use(verifyIfExistsAccountCPF);

app.get('/statement', (request, response) => {
  const { customer } = request;

  return response.status(200).json(customer.statement);
});

app.post('/deposit', (request, response) => {
  const { description, amount } = request.body;
  const { customer } = request;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  customer.statement.push(statementOperation);

  return response.status(201).send();

})

app.post('/withdraw', (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if(amount > balance) {
    return response.status(406).json({ message: "You can't withdraw more than you have." });
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit"
  };

  customer.statement.push(statementOperation);

  return response.status(201).send()
})

app.get('/statement/date', (request, response) => {
  const { customer } = request;
  const { date } = request.query;

  const dateFormat = new Date(date + " 00:00");

  const statement = customer.statement.filter( statement => 
    statement.created_at.toDateString() === new Date(dateFormat).toDateString());

  return response.json(statement);
})

app.put('/account', (request, response) => {
  const { name } = request.body;
  const { customer } = request;

  customer.name = name;

  return response.status(201).json(customer);
})

app.get('/account', (request, response) => {
  const { customer } = request;
  
  return response.status(201).json(customer);
});

app.delete('/account', (request, response) => {
  const { customer } = request;

  const account = customers.findIndex( f => customer.cpf == f.cpf);

  customers.splice(account, 1);
 
  return response.status(201).json({message : 'Your account has been deleted.', customersLeft: customers});
});

app.get('/balance', (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement);

  return response.status(201).json({message : 'Your balance is: '+ balance});
});