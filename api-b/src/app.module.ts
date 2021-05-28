import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { BankModule } from './bank/bank.module';

@Module({
  imports: [UsersModule, DatabaseModule, BankModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
