import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() createUserDto): Promise<CreateUserDto> {
    return this.usersService.createUser(createUserDto)
  }

  @Get()
  public async getUsers(): Promise<CreateUserDto[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  public async getUser(@Param('id') id: string) {
    return this.usersService.getUser(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

}
