import { IHistory } from 'app/shared/model/history.model';

export interface IStatus {
  id?: number;
  name?: string;
  histories?: IHistory[] | null;
}

export const defaultValue: Readonly<IStatus> = {};
