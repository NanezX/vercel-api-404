export default () => ({
  port: parseInt(process.env.PORT, 10) || 3333,
  sepoliaRpcUrl: process.env.SEPOLIA_RPC_URL,
  globalPrefix: 'api',
});
