import "reflect-metadata"
import { container } from "tsyringe"

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", //Nome do Container
  CategoriesRepository //Classe em que o container vai chamar
)