import { Router } from "express"
import { SpecificationRepository } from "../modules/cars/repositories/SpecificationsRepository"
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationsServices"

const specificationsRoutes = Router()

const specificationRepository = new SpecificationRepository()

specificationsRoutes.post("/", (request, response) => { //10:26
  const {name, description} = request.body
  const createSpecificationService = new CreateSpecificationService(specificationRepository)

  createSpecificationService.execute({ name, description})

  return response.status(201).send()
})

export { specificationsRoutes }