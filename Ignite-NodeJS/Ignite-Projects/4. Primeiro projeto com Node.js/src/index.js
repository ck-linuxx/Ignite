const express = require("express")
const { v4: uuidv4 } = require("uuid")

const app = express()

app.use(express.json())

const custumers = [] //database

// Middleware
function verifyIfExistAccountCPF(request, response, next){
  const {cpf} = request.header
  const customer = custumers.find(customer => customer.cpf === cpf)

  if(!customer){
    return response.status(400).json({ error: "Customer not found" })
  }

  request.customer = customer //deixar o customer visivel para as rotas filhas

  return next()

}

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if(operation.type === 'credit'){
      acc += operation.amount
    }else{
      acc -= operation.amount
    }
    return acc;
  }, 0);

  return balance;
}

//criação da conta
app.post("/account", (request,response) => {
  const { cpf, name } = request.body
  const custumerAlreadyExists = custumers.some((customer) => customer.cpf === cpf)  //some(): faz uma busca e retorna true or false

    console.log(custumerAlreadyExists)

    if(custumerAlreadyExists){
      return response.status(400).json({ error: "Customer already exists!" })
    }

  custumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return response.status(201).send()

})

//debug
app.get("/test", (request, response) => {
  return response.json(custumers)
})

app.get("/statement",verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request //exemplo de rota filha 
  return response.json(customer.statement)
})

app.post("/deposit", verifyIfExistAccountCPF, (request, response) => {
  const { description, amount } = request.body

  const { customer } = request

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit",
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()

})

app.post("/withdraw", verifyIfExistAccountCPF, (request, response) => {
  const { amount } = request.body
  const {customer} = request

  const balance = getBalance(customer.statement)
  console.log(customer.statement)

  if(balance < amount){
    return response.status(400).json({ error: "Insufficient funds!" })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: "debit",
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.get("/statement/date", verifyIfExistAccountCPF, (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + " 00:00")

  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date
  (dateFormat).toDateString())

  return response.json(statement)
}) 

app.put("/account", verifyIfExistAccountCPF,(request, response) => {
  const { name } = request.body
  const { customer } = request

  customer.name = name

  return response.status(201).send()
})

app.get("/account", verifyIfExistAccountCPF,(request, response) => {
  const { customer } = request

  return response.json(customer)
})

app.delete("/account", verifyIfExistAccountCPF,(request, response) => {
  const customer = request

  custumers.splice(customer, 1)

  return response.status(200).json(custumers)
})

app.get("/balance", verifyIfExistAccountCPF, (request, response) => {
  const {customer} = request
  const balance = getBalance(customer.statement)

  return response.json(balance)
})

app.listen(3333)