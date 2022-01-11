import {parse} from "csv-parse"
import fs from "fs" //file system

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void{ //recebendo o arquivo
    const stream = fs.createReadStream(file.path) //leitura do arquivo em partes

    const parseFile = parse()
    stream.pipe(parseFile) //dentro da função coloca

    parseFile.on("data", async (line) => {
      console.log(line)
    })
  }
}

export { ImportCategoryUseCase }