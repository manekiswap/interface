/**
 * for development only
 * local wallet address using with local hardhat node
 */
export const wallet = {
  address: process.env.ADDRESS ?? '',
  privateKey: process.env.PRIVATE_KEY ?? '',
};
