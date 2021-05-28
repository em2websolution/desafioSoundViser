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

  async createDeposit(createDeposit: Bank, userId): Promise<Bank>  {

    if(createDeposit.userIdTransfer === createDeposit.userId) {
      throw new BadRequestException('You cannot transfer to your own account');
    }

    switch (createDeposit.type) {
      case "Deposito":
        const dataDeposito = await this.bankRepository.create<Bank>(createDeposit, userId )
        .catch((error) => { throw new BadRequestException('Internal Server Error', error['errors'][0]['message'])})
        return dataDeposito
        break;

      case "Transferencia":
        const saldo = await this.getSaldo(createDeposit.userId)

        if (saldo < createDeposit.value) {
          throw new BadRequestException(`Balance unavailable: ${saldo}`);
        }

        const data = await this.getUser(createDeposit.userIdTransfer)
        .then( async (res) => { 
          if (res?.userId) {
            const resDeposito = await this.bankRepository.create<Bank>(createDeposit, userId )
              .then((res) => { 
                console.log('res user send', res)
                if (res?.userId) {
                  return res
                } 
                else {
                    throw new NotFoundException('User not found');
                }
              })
              .catch((error) => { throw new NotFoundException('Internal Server Error', error['errors'][0]['message'])})
              return resDeposito
          } 
          else {
              throw new NotFoundException('User of transfer not found');
          }
        })
        .catch((error) => { throw new BadRequestException('Internal Server Error', error['errors'][0]['message'])})

        return data
        break;
    
      case "Pagamento":
        const dataPagamento = await this.bankRepository.create<Bank>(createDeposit, userId )
        .catch((error) => { throw new BadRequestException('Internal Server Error', error['errors'][0]['message'])})
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
              SUM(value) + ( SELECT SUM(value) FROM Banks WHERE Banks.userIdTransfer = ${_id} )
            )
           -           
            (
              SELECT SUM(value) FROM Banks WHERE Banks.userId = ${_id} and Banks.type in ("Transferencia","Pagamento")
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
        throw new NotFoundException('Transaction History not found');
      }
      return res
    })

    return data
  }
  
}
