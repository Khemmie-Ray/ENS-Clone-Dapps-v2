import React, { useState, useEffect } from 'react'
import useCreateName from '../customhooks/useCreateName';
import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes"
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AvatarUpload = () => {
  const [address, setAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [imageUrl, setImageUrl] = useState("")
  const handleCreateName = useCreateName(userName, address, imageUrl);
  const [selectedFile, setSelectedFile] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const { walletProvider } = useWeb3ModalProvider()
  const [isConnected, setIsConnected] = useState(false);
  
    useEffect(() => {
      if (walletProvider) {
        setIsConnected(true);
      }
    }, [walletProvider]);

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "Avatar",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setImageUrl(resData.IpfsHash);
   
      console.log(savedData);
      toast.success("Upload Successful", {
        position: "top-center",
      })
  
      // https://coral-willowy-felidae-848.mypinata.cloud/ipfs/
  
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className='flex justify-between items-center flex-col lg:flex-row md:flex-row my-16'>        
      <section className='lg:w-[47%] md:w-[47%] w-[90%] shadow-xl px-4 py-8 rounded-lg text-center border-gray-100 mb-4 flex justify-center flex-col items-center border-2 h-auto lg:h-[250px]'>
      <h3 className='lg:text-3xl md:text-3xl text-xl mb-4'>Step one</h3>
      <p className='mb-8'>Upload your user avatar</p>
      <Dialog.Root>
        <Dialog.Trigger>
           {isConnected ? ( <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full px-20 py-6">Upload Avatar</Button> ) : (<p className='font-black text-red-400 underline'>Wallet not connected!</p>) }
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
            <Dialog.Title>Upload your user avatar</Dialog.Title>
            <Dialog.Description size="2" mb="4">
            Make changes to your avatar image
            </Dialog.Description>

            <Flex direction="column" gap="3">
            <label>
                <Text as="div" size="2" mb="1" weight="bold">
                Image
                </Text>
                <input type="file" onChange={changeHandler}/>
            </label>
            </Flex>
            <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
                <Button variant="soft" color="gray">
                Cancel
                </Button>
            </Dialog.Close>
            <Dialog.Close>
                <Button onClick={handleSubmission}>Save</Button>
            </Dialog.Close>
            </Flex>
        </Dialog.Content>
    </Dialog.Root>
    </section>
    <section className='lg:w-[47%] md:w-[47%] w-[90%] shadow-xl px-4 py-8 rounded-lg text-center border-2 border-gray-100 mb-4 h-auto lg:h-[250px] flex justify-center flex-col items-center'>
      <h3 className='lg:text-3xl md:text-3xl text-xl mb-4'>Step two</h3>
      <p className='mb-8'>Create your Web3 username.</p>
      <Dialog.Root>
  <Dialog.Trigger>
    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full px-20 py-6">Create Name</Button>
  </Dialog.Trigger>

  <Dialog.Content maxWidth="450px">
    <Dialog.Title>Create your username</Dialog.Title>
    <Dialog.Description size="2" mb="4">
      Make changes to your name.
    </Dialog.Description>

    <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Username
        </Text>
        <TextField.Root
          value={userName}
          placeholder="Enter your username"
          onChange={(e) => setUserName(e.target.value)}
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Wallet address
        </Text>
        <TextField.Root
          value={address}
          placeholder="0x098bg.."
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Image URL
        </Text>
        <TextField.Root
          defaultValue={imageUrl}
          readOnly
          placeholder="0x098bg.."
        />
      </label>
    </Flex>

    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button onClick={handleCreateName}>Save</Button>
      </Dialog.Close>
    </Flex>
  </Dialog.Content>
</Dialog.Root>
    </section>
    </div>
  );
}

export default AvatarUpload