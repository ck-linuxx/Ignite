import "reflect-metadata"
import { container } from "tsyringe"

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository"
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository"

import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationsRepository"
import { SpecificationRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository"

import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository"
import { UsersRepository } from "../../modules/accounts/repositories/implementetions/UsersRepository"

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository", //Nome do Container
  CategoriesRepository //Classe em que o container vai chamar
)

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository", //Nome do Container
  SpecificationRepository //Classe em que o container vai chamar
)

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
)
// 12:37