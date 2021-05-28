import { PartialType } from '@nestjs/mapped-types';
import { CreateBankDto } from './create-bank.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateBankDto extends PartialType(CreateBankDto) {
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
