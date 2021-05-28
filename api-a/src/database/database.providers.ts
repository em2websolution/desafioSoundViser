import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE } from '../utils/constants';

import { User } from '../users/entities/user.entity';
import { Bank } from '../bank/entities/bank.entity';

 export const databaseProviders = [
   {
     provide: SEQUELIZE,
     useFactory: async () => {
       const sequelize = new Sequelize({
         dialect: 'mysql',
         host: 'localhost',
         port: 3306,
         username: 'root',
         password: 'mysql',
         database: 'usersdb',
       });
 
       /**
        * Add Models Here
        * ===============
        * You can add the models to 
        * Sequelize later on.
        */
       sequelize.addModels([User]);
       sequelize.addModels([Bank]);
 
       await sequelize.sync();
       return sequelize;
     },
   },
 ];