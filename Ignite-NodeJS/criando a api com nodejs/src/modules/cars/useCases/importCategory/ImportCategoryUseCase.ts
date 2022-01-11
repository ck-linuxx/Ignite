import {parse} from "csv-parse"
import fs from "fs" //file system
import { resolve } from "path";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

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
        resolve(categories)
      })
      .on("error", (err) =>{
        reject(err)
      })
    })
  }

  async execute(file: Express.Multer.File): Promise<void>{ //recebendo o arquivo
    const categories = await this.loadCategories(file)
    console.log(categories)
  }
}

export { ImportCategoryUseCase }