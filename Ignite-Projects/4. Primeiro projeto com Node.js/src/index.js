const express = require("express")
const { v4: uuidv4 } = require("uuid")

const app = express()

app.use(express.json())

const custumers = [] //database

//criação da conta
app.post("/account", (request,response) => {
  const { cpf, name } = request.body
  const custumerAlreadyExists = custumers.some(
      (customer) => customer.cpf === cpf
    )   //some(): faz uma busca e retorna true or false

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

app.get("/statement/:cpf", (request, response) => {
  const {cpf} = request.params

  const customer = custumers.find(customer => customer.cpf === cpf)

  return response.json(customer.statement)
})

app.listen(3333)