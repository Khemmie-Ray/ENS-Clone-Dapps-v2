import { useCallback, useState } from "react";
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

  const useRetrieval = (userName) => {
    const { chainId } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const [address, setaddress] = useState("")
    const [retrievedAddress, setRetrievedAddress] = useState("");
  
    return useCallback(async () => {
      if (!isSupportedChain(chainId)) return console.error("Wrong network");
    //   if (!isAddress(address)) return console.error("Invalid address");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
  
      const contract = getENSContract(signer);
      const toBytes = ethers.toUtf8Bytes(userName)

  
      try {
        const transaction = await contract.getAddress(toBytes);
        // const receipt = await transaction.wait();
  
        // console.log("receipt: ", retrievedAddress);
  
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
    }, [chainId, walletProvider]);
  };

export default useRetrieval