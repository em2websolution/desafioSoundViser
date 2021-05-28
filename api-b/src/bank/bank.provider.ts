import { Bank } from './entities/bank.entity';
import { BANK_REPOSITORY } from '../utils/constants';

export const bankProviders = [
  {
    provide: BANK_REPOSITORY,
    useValue: Bank,
  },
];