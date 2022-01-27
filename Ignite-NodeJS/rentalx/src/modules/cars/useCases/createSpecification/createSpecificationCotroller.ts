import { Request, Response } from "express";
import { container } from "tsyringe"
import { CreateSpecificationUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecificationController {

  handle(request: Request, response: Response): Response{
    const {name, description} = request.body
    const createSpecificationSpecificationUseCase = container.resolve(CreateSpecificationUseCase)

    createSpecificationSpecificationUseCase.execute({ name, description})

    return response.status(201).send()
  }
}

export { CreateSpecificationController }