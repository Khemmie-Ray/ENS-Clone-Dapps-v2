import { RiSendPlaneFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useState, useEffect } from "react";

const Header = () => {
  const { walletProvider } = useWeb3ModalProvider()
  const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
      if (walletProvider) {
        setIsConnected(true);
      }
    }, [walletProvider]);

  return (
    <header className='h-[10vh] shadow-md p-2 flex justify-center text-[#3939b2]'>
        <nav className='w-[90%] mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
            <NavLink to="/"><img src="https://seeklogo.com/images/E/ethereum-name-service-ens-logo-9190A647F5-seeklogo.com.png" alt="" className='w-[50px]'/></NavLink>
            <h1 className='font-[700] ml-2 text-2xl'>Clone</h1>
        </div>
        <div className="flex items-center">
       {isConnected ? ( <NavLink to="/chat" className="mr-6 text-[#3939b2] text-2xl px-4 py-2 bg-gray-200 rounded-full"><RiSendPlaneFill  /></NavLink>) : "" }
        <w3m-button />
        </div>
        </nav>
        </header>
  )
}

export default Header