import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  value: number;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  userIdTransfer: number;

  createdAt: Date;

  updatedAt: Date;

  deletedAt: Date;
}
