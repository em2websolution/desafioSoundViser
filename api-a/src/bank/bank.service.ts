import { BadRequestException, Inject, Injectable, NotFoundException, Body, HttpService, ServiceUnavailableException } from '@nestjs/common';
import { USER_REPOSITORY } from '../utils/constants';
import { Bank } from './entities/bank.entity';
import { User } from '../users/entities/user.entity';
import { Sequelize } from 'sequelize-typescript';
const Op = require('Sequelize').Op

@Injectable()
export class BankService {
  constructor(
    private  httpService: HttpService,
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async createDeposit(createDeposit: Bank, userId): Promise<Bank>  {

    if(createDeposit.userIdTransfer === createDeposit.userId) {
      throw new BadRequestException('You cannot transfer to your own account');
    }

    switch (createDeposit.type) {
      case "Deposito":
        let resDeposito = await this.httpService.post<Bank>(`http://localhost:4000/api/v1/bank/`, createDeposit, userId) 
        .toPromise()
        .then((res)=>  { 
          return res
        })
        .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

        return resDeposito?.data
        break;
        
      case "Transferencia":
        const saldo = await this.getSaldoBank(createDeposit.userId)
        console.log('SALDO:', saldo?.data)

        if (saldo?.data < createDeposit.value) {
            throw new BadRequestException(`Balance unavailable: ${saldo}`);
        }

        const data = await this.getUser(createDeposit.userIdTransfer)
        .then( async (res) => { 
          if (res?.userId) {

            let resTransferencia = await this.httpService.post<Bank>(`http://localhost:4000/api/v1/bank/`, createDeposit, userId) 
            .toPromise()
            .then((res)=>  { 
              if (res.data) {
                return res
              } 
              else {
                  throw new NotFoundException('User not found');
              }
              return res
            })
            .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

            return resTransferencia?.data
          } 
          else {
              throw new NotFoundException('User of transfer not found');
          }
        })
        return data
        break;
    
      case "Pagamento":
        let resPagamento = await this.httpService.post<Bank>(`http://localhost:4000/api/v1/bank/`, createDeposit, userId) 
        .toPromise()
        .then((res)=>  { 
          return res
        })
        .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

        return resPagamento?.data

        break;
    }
    
    
  }

  async getUser(_id: number): Promise<User> {
    return await this.userRepository.findByPk<User>(_id);
  }

  async getSaldoBank(_id: number) {   
    let saldo = await this.httpService.get<number>(`http://localhost:4000/api/v1/bank/saldo/${_id}`) 
    .toPromise()
    .then((res)=>  { 
      return res
    })
    .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

    return saldo 

  } 

  async getHistory(_id: number) {
    let response = await this.httpService.get<number>(`http://localhost:4000/api/v1/bank/history/${_id}`) 
    .toPromise()
    .then((res)=>  { 
      return res
    })
    .catch((error) => { throw new ServiceUnavailableException('Internal Server Error', error['errors'][0]['message'])})

    return response 
  }
  
}
