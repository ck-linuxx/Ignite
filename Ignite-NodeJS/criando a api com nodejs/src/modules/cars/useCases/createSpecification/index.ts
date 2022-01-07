import { SpecificationRepository } from "../../repositories/SpecificationsRepository";
import { CreateSpecificationController } from "./createSpecificationCotroller";
import { CreateSpecificationUseCase } from "./CreateSpecificationsUseCase";

const specificationRepository = new SpecificationRepository()
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export { createSpecificationController }