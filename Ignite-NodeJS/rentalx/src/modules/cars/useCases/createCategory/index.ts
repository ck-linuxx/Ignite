import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoriyUseCase";
import { CreateCategoryController } from "./createCategoryController";

console.log("Arquivo categories")
const categoriesRepository = CategoriesRepository.getInstance()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }