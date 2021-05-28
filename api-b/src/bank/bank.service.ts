import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BANK_REPOSITORY, USER_REPOSITORY } from '../utils/constants';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';
import { User } from '../users/entities/user.entity';
import sequelize from 'sequelize';
import { Length } from 'class-validator';
import { Sequelize } from 'sequelize-typescript';
const Op = require('Sequelize').Op

@Injectable()
export class BankService {
  constructor(
    @Inject(BANK_REPOSITORY) private readonly bankRepository: typeof Bank,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async createDeposit(createDeposit)  {

    if(createDeposit.userIdTransfer === createDeposit.userId) {
      throw new BadRequestException('Você não pode transferir para sua conta');
    }

    switch (createDeposit.type) {
      
      case "Deposito":
  

        const dataDeposito = await this.bankRepository.create<Bank>(createDeposit )
        .catch((error) => { 
          
          throw new BadRequestException(error.message);

        
        })
        return dataDeposito
        break;

      case "Transferencia":
        const saldoTransferencia = await this.getSaldo(createDeposit.userId)

        if (saldoTransferencia < createDeposit.value) {
          throw new BadRequestException(`Saldo insuficiente: R$ ${saldoTransferencia}`);
        }

        const data = await this.getUser(createDeposit.userIdTransfer)
        .then( async (res) => { 
          if (res?.userId) {
            const resDeposito = await this.bankRepository.create<Bank>(createDeposit)
              .then((res) => { 
                if (res?.userId) {
                  return res
                } 
                else {
                  return ('Usuário não encontrado');
                }
              })
              .catch((error) => { 
                throw new BadRequestException(error.message);

                const errObj = {};
                error.errors.map( er => {
                   errObj[er.path] = er.message;
                })
                errObj
                const body = { ...errObj, "error": 0 };

                return body
              })
              return resDeposito
          } 
          else {
              return ('Usuário não encontrado');
          }
        })
        .catch((error) => { return error })

        return data
        break;
    
      case "Pagamento":
        const saldoPagamento = await this.getSaldo(createDeposit.userId)

        if (saldoPagamento < createDeposit.value) {
          throw new BadRequestException(`Saldo insuficiente: R$ ${saldoPagamento}`);
          break
        }

        const dataPagamento = await this.bankRepository.create<Bank>(createDeposit )
        .catch((error) => { 
          throw new BadRequestException(error.message);
        })
        
        return dataPagamento
        break;
    }
    
    
  }

  async getUser(_id: number): Promise<User> {
    return await this.userRepository.findByPk<User>(_id);
  }

  async getSaldo(_id: number) {


    const data = await this.bankRepository.findAll({
      attributes: [
        [
        sequelize.literal
        (
          `
            (
              COALESCE(sum(value),0) + ( SELECT COALESCE(sum(value),0) FROM Banks WHERE Banks.userIdTransfer = ${_id} )
            )
           -           
            (
              SELECT COALESCE(sum(value),0) FROM Banks WHERE Banks.userId = ${_id} and Banks.type in ("Transferencia","Pagamento")
            ) 
          `
        ),
        'saldo'
        ]
      ],
      where: {
        type: 'Deposito',
        userId: _id
      },
      group: ['userId'],
      raw: true
    })
    .then((res) => {
      if (res.length <= 0 ) {
        return 0
      }
      return res[0]['saldo']
    })

    return data
  } 

  async getHistory(_id: number) {
    const data = await this.bankRepository.findAll({
      where: sequelize.or(
        {userId: _id},
        {userIdTransfer: _id},
      ),
      raw: true
    })
    .then((res) => { 
      if (res.length <= 0 ) {
        throw new NotFoundException('Transação não permitida');
      }
      return res
    })

    return data
  }
  
}
