import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  public async createDeposit(@Body() createBankDto) {
    const data = await this.bankService.createDeposit(createBankDto)
    .then((res) => { 

      if (res['error'] == 0) {
        console.log('res 1 ' , res)
        return res.value
      }

      let conta = res?.userId
      let transferencia = res?.userIdTransfer
      let dtaTransferencia = res?.createdAt
      let valor = res?.value
      let type = res?.type

      switch (type) {
        case "Deposito":
          return Object.assign({
            "Numero da conta:": conta,
            "Data do Deposito:": dtaTransferencia,
            "Valor que foi depositado:": valor
          })
          break;
        case "Transferencia":
          return Object.assign({
            "Numero da conta:": conta,
            "Conta da Transferência:": transferencia,
            "Data da Transferência:": dtaTransferencia,
            "Valor que foi depositado:": valor
          })
          break;
        case "Pagamento":
          return Object.assign({
            "Numero da conta:": conta,
            "Data do Pagamento:": dtaTransferencia,
            "Valor pago:": valor
          })
          break;
      }
      
    })
    .catch((error) => { return error })

    return data
  } 

  @Get('saldo/:id')
  public async getSaldo(@Param('id') id: number) {
    return this.bankService.getSaldo(id)
    .catch((error) => { return error })
  }

  @Get('history/:id')
  public async getHistory(@Param('id') id: number) {
    return this.bankService.getHistory(id)
    .catch((error) => { return error })
  }

}
