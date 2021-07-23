import { Tags, TokenInfo, Version } from '../../constants/tokens/types';

export type List = {
  name?: string;
  timestamp?: string;
  version?: Version;
  keywords?: string[];
  tags?: Tags;
  logoURI?: string;
};

export interface ListState {
  activeListUrls: string[];
  lists: {
    [url: string]: List & {
      requestId?: string;
      error?: string;
    };
  };
  tokens: {
    [url: string]: TokenInfo[];
  };
}
