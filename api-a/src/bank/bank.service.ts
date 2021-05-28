import { BadRequestException, Inject, Injectable, NotFoundException, Body, HttpService, ServiceUnavailableException } from '@nestjs/common';
import { USER_REPOSITORY } from '../utils/constants';
import { Bank } from './entities/bank.entity';
import { User } from '../users/entities/user.entity';
import { Sequelize, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { Length } from 'class-validator';
const Op = require('Sequelize').Op

@Injectable()
export class BankService {
  constructor(
    private  httpService: HttpService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async createDeposit(createDeposit) {

    if(createDeposit.userIdTransfer === createDeposit.userId) {
      throw new NotFoundException('Transação não permitida');

    }

    switch (createDeposit.type) {
      case "Deposito":
        let resDeposito = await this.httpService.post(`http://localhost:4000/api/v1/bank/`, createDeposit) 
        .toPromise()
        .then((res)=>  { 

          return res
        })
        .catch((error) => { return error })

        return resDeposito?.data
        break;
        
      case "Transferencia":
        const saldo = await this.getSaldoBank(createDeposit.userId)

        if (saldo?.data < createDeposit.value) {
           return Object.assign(
            {"Saldo INDISPÓNIVEL": saldo?.data },
             {"Conta User": createDeposit.userId },
             {"Tipo de Transação": "Transferência" },
             {"Data": new Date()}
            );
        }

        const data = await this.getUser(createDeposit.userIdTransfer)
        .then( async (res) => { 
          if (res?.userId) {

            let resTransferencia = await this.httpService.post(`http://localhost:4000/api/v1/bank/`, createDeposit) 
            .toPromise()
            .then((res)=>  { 
              if (res.data || res.data.Length > 0) {
                return res
              } 
              else {
                throw new NotFoundException('User not found');
              }
            })
            .catch((error) => { return error })

            return resTransferencia?.data
          } 
          else {
            return Object.assign(
              {"Conta User": "Conta de usuário não encontrada"},
              {"Tipo de Transação": "Transferência" },
              {"Data": new Date()}
              );
          }
        })
        return data
        break;
    
      case "Pagamento":
        let resPagamento = await this.httpService.post<Bank>(`http://localhost:4000/api/v1/bank/`, createDeposit) 
        .toPromise()
        .then((res)=>  { 
          return res
        })
        .catch((error) => { return error })

        return resPagamento?.data

        break;
    }
    
    
  }

  async getUser(_id: number): Promise<User> {
    return await this.userRepository.findByPk<User>(_id);
  }

  async getSaldoBank(_id: number) {   
   
   console.log('saldo1')
    let saldo = await this.httpService.get<number>(`http://localhost:4000/api/v1/bank/saldo/${_id}`) 
    .toPromise()
    .then((res)=>  { 
      return res
    })
    .catch((error) => { return error })

    return saldo 

  } 

  async getHistory(_id: number) {
    let response = await this.httpService.get<number>(`http://localhost:4000/api/v1/bank/history/${_id}`) 
    .toPromise()
    .then((res)=>  { 
      return res
    })
    .catch((error) => { return error })

    return response 
  }
  
}
