const express = require("express")
const { v4: uuidv4 } = require("uuid")

const app = express()

app.use(express.json())

const costumers = [] //database

//criação da conta
app.post("/account", (request,response) => {
  const { cpf, name } = request.body
  const custumerAlreadyExists = costumers.some(
      (customer) => customer.cpf === cpf
    )   //some(): faz uma busca e retorna true or false

    if(custumerAlreadyExists){
      return response.status(400).json({ error: "Customer already exists!" })
    }

  costumers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return response.status(201).send()

})

app.listen(3333)