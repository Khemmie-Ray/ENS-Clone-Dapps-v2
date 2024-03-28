import { SUPPORTED_CHAIN } from "../connections";
import { getENSContract } from "../constants/contracts";
import { getProvider } from "../constants/providers";

export const isSupportedChain = (chainId) =>
    Number(chainId) === SUPPORTED_CHAIN;

export const getReadWriteENSContract = async (provider) => {
    const readWriteProvider = getProvider(provider);

    const signer = await readWriteProvider.getSigner();

    return getENSContract(signer);
};
