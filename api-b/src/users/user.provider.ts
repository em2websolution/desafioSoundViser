import { User } from './entities/user.entity';
import { USER_REPOSITORY } from '../utils/constants';

export const userProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];