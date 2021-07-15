import { SerializedToken } from '../token/types';

export type List = {
  id: string;
  url: string;
  weight: number;
  logoURI?: string;
  name?: string;
};

export interface ListState {
  listUrls: List[];
  activeListIds: string[];
  tokens: {
    [id: string]: {
      [address: string]: SerializedToken;
    };
  };
}
