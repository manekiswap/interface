export interface ApplicationState {
  blockNumber: {
    [chainId: number]: number;
  };
}
