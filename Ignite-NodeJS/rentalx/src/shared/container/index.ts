import "reflect-metadata"
import { container } from "tsyringe"

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository"
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", //Nome do Container
  CategoriesRepository //Classe em que o container vai chamar
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository", //Nome do Container
  SpecificationRepository //Classe em que o container vai chamar
)