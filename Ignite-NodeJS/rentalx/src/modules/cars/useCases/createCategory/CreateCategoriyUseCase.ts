import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { inject, injectable } from "tsyringe"

interface IRequest {
  name: string;
  description: string;
}

/*
  [x] - Definir o tipo de retorno
  [x] - Alterar o retorno de erro
  [x] - Acessar o repositorio
*/

@injectable()
class CreateCategoryUseCase {

  constructor ( 
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository ){}

  async execute({ description, name }: IRequest): Promise<void> {
    const categoriyAlreadyExists = await this.categoriesRepository.findByName(name)

    if(categoriyAlreadyExists) {
      throw new Error("Category already exists!")
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }