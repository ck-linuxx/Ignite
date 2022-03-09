import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt"

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepostirory: IUserRepository
  ){}
  
  async execute({ name, password, email ,driver_license }: ICreateUserDTO): Promise<void> {
    const userAlredyExists = await this.userRepostirory.findByEmail(email)
    if(userAlredyExists) {
      throw new Error("User already exists ")
    }

    const passwordHash = await hash(password, 8)

    await this.userRepostirory.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    })
  }
}