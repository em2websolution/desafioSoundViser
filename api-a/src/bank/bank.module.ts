import { HttpModule, Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { DatabaseModule } from '../database/database.module';
import { bankProviders } from './bank.provider';
import { userProviders } from '../users/user.provider';


@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [BankController],
  providers: [BankService, ...bankProviders, ...userProviders]
})
export class BankModule {}