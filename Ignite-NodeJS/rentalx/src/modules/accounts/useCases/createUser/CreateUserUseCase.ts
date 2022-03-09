import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepostirory: IUserRepository
  ){}
  
  async execute({ name, password, email ,driver_license }: ICreateUserDTO): Promise<void> {
    await this.userRepostirory.create({
      name,
      password,
      email,
      driver_license,
    })
  }
}