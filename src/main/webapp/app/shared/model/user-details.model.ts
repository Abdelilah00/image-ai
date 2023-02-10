import { IUser } from 'app/shared/model/user.model';

export interface IUserDetails {
  id?: number;
  balance?: number;
  user?: IUser;
}

export const defaultValue: Readonly<IUserDetails> = {};
