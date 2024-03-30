import React, { useState } from 'react'
import { getProvider } from '../constants/providers';
import { getENSContract } from '../constants/contracts';
import { isSupportedChain } from "../utils";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Retrieval = () => {
    const [userName, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [retrievedUserName, setRetrievedUserName] = useState("");
    const { chainId } = useWeb3ModalAccount();
    const [retrievedAddress, setRetrievedAddress] = useState("");
    const { walletProvider } = useWeb3ModalProvider();

    async function retrieveAddress() {
      if (!isSupportedChain(chainId)) return toast.error("Wrong network", {
        position: "top-center",
      });
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
  
      const contract = getENSContract(signer);
    
        try {
          const tx = await contract.getUserAddress(userName);
          setRetrievedAddress(tx);
          toast.success("Data retrieval successful", {
            position: "top-center",
          });
        } catch (err) {
          toast.error("Data retrieval Failed", {
            position: "top-center",
          });
      }
    }

      async function retrieveName() {
        if (!isSupportedChain(chainId)) return toast.error("Wrong network", {
          position: "top-center",
        });
        const readWriteProvider = getProvider(walletProvider);
        const signer = await readWriteProvider.getSigner();
    
        const contract = getENSContract(signer);
      
          try {
            const tx = await contract.getUserName(address);
            setRetrievedUserName(tx)
            toast.success("Data retrieval successful", {
              position: "top-center",
            });
          } catch (err) {
            toast.error("Data retrieval Failed", {
              position: "top-center",
            });
          }
        }
    
  return (
    <div className='flex justify-between items-center flex-col lg:flex-row md:flex-row'>
        <section className='lg:w-[47%] md:w-[47%] w-[90%] mx-auto shadow-xl px-4 py-8 rounded-lg text-center border-gray-100 mb-4 flex justify-center flex-col items-center border-2'>
            <h3 className='lg:text-3xl md:text-3xl text-xl mb-4'>Retrieve an Address</h3>
            <div className='my-4 w-full'>
                <input type="text" placeholder='Enter userName' onChange={(e) => setUsername(e.target.value)} className='border p-2 lg:w-[70%] md:w-[70%] w-[100%] rounded-lg my-4' />
                <button onClick={retrieveAddress} className='lg:w-[30%] md:w-[30%] w-[100%] rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2'>Submit</button>
            </div>
              <div className='my-2'>
                <p className='break-all'>{retrievedAddress}</p>
        </div>
      </section>
      <section className='lg:w-[47%] md:w-[47%] w-[90%] mx-auto shadow-xl px-4 py-8 rounded-lg text-center border-gray-100 mb-4 flex justify-center flex-col items-center border-2'>
            <h3 className='lg:text-3xl md:text-3xl text-xl mb-4'>Retrieve a UserName</h3>
            <div className='my-4 w-full'>
                <input type="text" placeholder='Enter userAddress' onChange={(e) => setAddress(e.target.value)} className='border p-2 lg:w-[70%] md:w-[70%] w-[100%] rounded-lg my-4' />
                <button onClick={retrieveName} className='lg:w-[30%] md:w-[30%] w-[100%] rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-2'>Submit</button>
            </div>
                <div className='my-2'>
                  <p className='break-all font-black'>{retrievedUserName}</p>
        </div>
      </section>
  </div>
  )
}

export default Retrieval