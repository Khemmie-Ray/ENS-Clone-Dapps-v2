import { ethers } from "ethers";
import ABI from "./abi.json"

export const getENSContract = (providerOrSigner) =>
    new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS ,
        ABI,
        providerOrSigner
    );
