import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...userProviders],
  controllers: [UsersController]
})
export class UsersModule {}