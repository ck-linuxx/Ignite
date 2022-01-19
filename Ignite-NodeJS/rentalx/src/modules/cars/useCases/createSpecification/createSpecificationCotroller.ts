import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationsUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationSpecificationUseCase: CreateSpecificationUseCase){}

  handle(request: Request, response: Response): Response{
    const {name, description} = request.body
    this.createSpecificationSpecificationUseCase.execute({ name, description})

    return response.status(201).send()
  }
}

export { CreateSpecificationController }