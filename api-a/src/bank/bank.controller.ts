import { Controller, Get, Post, Body, Patch, Param, Delete, ServiceUnavailableException } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  public async createDeposit(@Body() createBankDto: CreateBankDto) {
    const data = await this.bankService.createDeposit(createBankDto)
    .then((res) => { 

      if (res['error'] == 0) {
        console.log('res 1 ' , res)
        return res.value
      }

      return res
    })
    .catch((error) => { return error })

    return data
  } 

  @Get('saldo/:id')
  public async getSaldoBank(@Param('id') id: number) {
    let saldo = await this.bankService.getSaldoBank(id)
    .then((res) => { 
      return res
    })
    .catch((error) => { return error })

    return saldo?.data
  }

  @Get('history/:id')
  public async getHistory(@Param('id') id: number) {
    let history = await this.bankService.getHistory(id)
    .then((res) => { 
      return res
    })
    .catch((error) => { return error })

    return history?.data
  }

}
