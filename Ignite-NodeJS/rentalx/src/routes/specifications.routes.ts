import { Router } from "express"
import { createSpecificationController } from "../modules/cars/useCases/createSpecification"

const specificationsRoutes = Router()

specificationsRoutes.post("/", (request, response) => { //10:26
  return createSpecificationController.handle(request, response)
})

export { specificationsRoutes }