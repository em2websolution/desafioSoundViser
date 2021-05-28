import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto {
  @IsNotEmpty()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @ApiProperty()
  value: number;

  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @ApiProperty()
  userIdTransfer: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
