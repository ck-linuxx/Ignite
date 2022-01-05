import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { CreateCategoryUseCase } from "./CreateCategoriyUseCase";
import { CreateCategoryController } from "./createCategoryController";

const categoriesRepository = new CategoriesRepository
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export { createCategoryController }