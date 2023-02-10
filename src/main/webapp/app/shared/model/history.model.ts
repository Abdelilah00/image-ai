import { IUser } from 'app/shared/model/user.model';
import { IModel } from 'app/shared/model/model.model';
import { IStatus } from 'app/shared/model/status.model';

export interface IHistory {
  id?: number;
  imageSource?: string;
  imageDestination?: string | null;
  duration?: number | null;
  user?: IUser;
  model?: IModel | null;
  status?: IStatus | null;
}

export const defaultValue: Readonly<IHistory> = {};
