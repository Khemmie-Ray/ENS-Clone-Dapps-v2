import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { ethers, isAddress } from "ethers";
import { getProvider } from "../constants/providers";
import { getENSContract } from "../constants/contracts";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
  } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

  const useCreateName = (userName, address, imageUrl) => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
  
    return useCallback(async () => {
      if (!isSupportedChain(chainId)) return console.error("Wrong network");
      if (!isAddress(address)) return console.error("Invalid address");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
  
      const contract = getENSContract(signer);
  
      try {
        const transaction = await contract.create(userName, address, imageUrl);
        console.log("transaction: ", transaction);
        const receipt = await transaction.wait();
  
        console.log("receipt: ", receipt);
  
        if (receipt.status) {
          return toast.success("UserName creation successful!", {
              position: "top-center",
            });
        }
  
        toast.error("UserName creation failed!", {
          position: "top-center",
        });
      } catch (error) {
        toast.error("UserName creation failed!", {
            position: "top-center",
          });
      }
    }, [address, chainId, walletProvider]);
  };

export default useCreateName