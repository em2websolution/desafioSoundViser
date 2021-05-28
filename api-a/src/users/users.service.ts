import { Inject, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { USER_REPOSITORY } from '../utils/constants';

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
    const response = this.userRepository.findByPk<User>(_id)
    .then( async (res) => { 
      console.log('res delete:', res)
      if (res == null ) {
        throw new NotFoundException('User not found');
      }
      return res
    })
    .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

    return response
  }

  async updateUser(userId: string, data)  {
    const response = await this.userRepository.update({ ...data }, { where: { userId }, returning: true })
    .then( async (res) => { 
      console.log('res update:', res[1])
      if (!res[1] ) {
        return `User not found`;
      }
      return `This action updates a #${userId} user`;
    })
    return response
  } 

  async deleteUser(userId: string) {
    const response = await this.userRepository.destroy({ where: { userId } })
    .then( async (res) => { 
      console.log('res delete:', res)
      if (res == 0 ) {
        return `User not found`;
      }
      return `This action removes a #${userId} user`;
    })
    return  response
  }

}
