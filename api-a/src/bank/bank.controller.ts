import { Controller, Get, Post, Body, Patch, Param, Delete, ServiceUnavailableException } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  public async createDeposit(@Body() createBankDto, idUser: number): Promise<CreateBankDto> {
    const data = await this.bankService.createDeposit(createBankDto, idUser)
    .then((res) => { 
      console.log('res >', res);
      return res
    })
    .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

    return data
  } 

  @Get('saldo/:id')
  public async getSaldoBank(@Param('id') id: number) {
    let saldo = await this.bankService.getSaldoBank(id)
    .then((res) => { 
      return res
    })
    .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

    return saldo?.data
  }

  @Get('history/:id')
  public async getHistory(@Param('id') id: number) {
    let history = await this.bankService.getHistory(id)
    .then((res) => { 
      return res
    })
    .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

    return history?.data
  }

}
