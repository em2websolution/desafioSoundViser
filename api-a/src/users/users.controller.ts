import { Controller, Get, Post, Body, Patch, Param, Delete, ServiceUnavailableException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getUsers(): Promise<CreateUserDto[]> {
    const data = this.usersService.getAllUsers()
    .then((res) => { 
      return res
    })
    .catch((error) => { return error })
    return data
  }

  @Get(':id')
  public async getUser(@Param('id') id: string) {
    const data = this.usersService.getUser(+id)
    .then((res) => { 
      return res
    })
    .catch((error) => { return error })

    return data
  }

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    const data = this.usersService.createUser(createUserDto)
    .then((res) => { 
      return res
    })
    .catch((error) => { return error })

    return data

  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const data = this.usersService.deleteUser(id)
    .then((res) => { 
      return res
    })
    .catch((error) => { return error })

    return data
  }

}
