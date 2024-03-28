import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
// import { useWeb3ModalTheme } from '@web3modal/ethers/react';

export const SUPPORTED_CHAIN = 11155111;

const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: import.meta.env.VITE_ALCHEMY_RPC
  }
  
  const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://localhost:5173', 
    icons: ['https://localhost:5173']
  }

  export const configWeb3Modal = () => createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [sepolia],
    projectId: import.meta.env.VITE_PROJECT_ID,
    enableAnalytics: false,
  })