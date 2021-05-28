import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../utils/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
  
  async createUser(createUser: User): Promise<User> {
    return await this.userRepository.create<User>(createUser);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async getUser(_id: number): Promise<User> {
    return await this.userRepository.findByPk<User>(_id);
  }

  async updateUser(userId: string, data)  {
    await this.userRepository.update({ ...data }, { where: { userId }, returning: true });
    return `This action updates a #${userId} user`;
  } 

  async deleteUser(id: string) {
    await this.userRepository.destroy({ where: { id } });
    return `This action removes a #${id} user`;
  }

}
