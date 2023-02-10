export interface IModel {
  id?: number;
  name?: string;
  version?: string;
  feePerSecond?: number;
  displayName?: string;
}

export const defaultValue: Readonly<IModel> = {};
