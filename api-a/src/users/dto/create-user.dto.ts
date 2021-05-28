import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(14)
  cpf: string;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
 