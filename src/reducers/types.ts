import { ApplicationState } from './application/types';
import { ListState } from './list/types';
import { MulticallState } from './multicall/types';
import { PoolState } from './pool/types';
import { SwapState } from './swap/types';
import { TokenState } from './token/types';
import { UserState } from './user/types';

export interface RootState {
  application: ApplicationState;
  list: ListState;
  multicall: MulticallState;
  pool: PoolState;
  swap: SwapState;
  token: TokenState;
  user: UserState;
}
