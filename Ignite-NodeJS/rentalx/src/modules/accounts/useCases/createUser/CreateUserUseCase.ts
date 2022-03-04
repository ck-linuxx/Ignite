import { inject } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepostirory: IUserRepository
  ){}
  
  async execute({ name, username, password, email ,driver_license }: ICreateUserDTO): Promise<void> {
    await this.userRepostirory.create({
      name,
      username,
      password,
      email,
      driver_license,
    })
  }
}