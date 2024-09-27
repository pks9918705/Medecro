 // MetaMaskContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

import Upload from '../artifacts/contracts/Upload.sol/Upload.json';



const MetaMaskContext = createContext();

export const MetaMaskProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState(null);


  const checkIfUserRegistered = async (address) => {
    try {
      console.log('Checking user registration...');
      const response = await axios.get(`http://localhost:5000/api/users/check-user/${address}`);

      if (response.data.exists) {
        console.log('User found:', response.data.user);
        // localStorage.setItem({userType:response.data.user.userType})
        setIsRegistered(true);
        setUser(response.data.user);

        // if (response.data.user.userType === 'patient') {
        //   navigate('/patient');
        // } else if (response.data.user.userType === 'doctor') {
        //   navigate('/doctor');
        // }
      } else {
        setIsRegistered(false);
        console.log('User not registered');
        // navigate('/register');
      }
     }catch (error) {
      console.error('Error checking user registration', error);
    }
  };

  useEffect(() => {
    const loadProvider = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);

      if (provider) {
        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });

        window.ethereum.on('accountsChanged', () => {
          window.location.reload();
        });

        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        setAccount(address);
        checkIfUserRegistered(address);

         
        // const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
        const contractAddress = '0x0165878A594ca255338adfa4d48449f69242Eb8F';
        const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error('Metamask is not installed');
      }
    };

    loadProvider();
  }, []);

  useEffect(()=>{
    console.log("Account detected",account)
  },[account])

  return (
    <MetaMaskContext.Provider value={{ account, contract, provider, isRegistered, user }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => useContext(MetaMaskContext);
