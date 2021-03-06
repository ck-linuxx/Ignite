import {parse} from "csv-parse"
import fs from "fs" //file system
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{ //fazer somente a leitura das categorias
    return new Promise((resolve,reject) =>{
      const stream = fs.createReadStream(file.path) //leitura do arquivo em partes
      const categories:IImportCategory[] = []

      const parseFile = parse()
      stream.pipe(parseFile) //dentro da função coloca

      parseFile.on("data", async (line) => {
        const [ name, description ] = line 
        categories.push({
          name,
          description,
        })
      })
      .on("end", () => {
        fs.promises.unlink(file.path) //remoção do arquivo
        resolve(categories)
      })
      .on("error", (err) =>{
        reject(err)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void>{ //recebendo o arquivo
    const categories = await this.loadCategories(file)
    
    categories.map(async category => {
      const { name,description } = category

      const existsCategory = await this.categoriesRepository.findByName(name)

      if(!existsCategory){
        await this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoryUseCase }