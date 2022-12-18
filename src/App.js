import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react'
import { Routes, Route, useLocation } from "react-router-dom";
import { Web3Auth } from "@web3auth/modal";
import { ADAPTER_EVENTS } from "@web3auth/base";
import Web3 from "web3";
import { ethers } from 'ethers';

import styled from 'styled-components';
import { useEffect, useState } from 'react';

import Livepeer from './features/livepeer';
import Construction from './pages/Construction';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Scene from './scene'

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: "process.env.LIVEPEER_STUDIO_API_KEY",
  }),
});

const clientId = "BHLo_UiLxdZoLMDI8wX36AqjH7Cgaaq6JBRZ2onTWv8_n7RRuhimG54VTldatIT7jSYBKGKrLJ4J1Xdfynb3x4c"

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;

  background: black;
  font-family: 'VT323', monospace;
`

function App() {

  const [walletAddress, setWalletAddress] = useState("")
  const [web3auth, setWeb3auth] = useState(null);
  const [provider, setProvider] = useState(null);
  const location = useLocation();

  const subscribeAuthEvents = (web3auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
      console.log("connected to wallet", data);

      const web3authProvider = await web3auth.connect()
      const provider = new ethers.providers.Web3Provider(web3authProvider);

      await getAccounts(provider)
      await getBalance(provider)
      await getPrivateKey()
    });
    web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
      console.log("connecting");
    });
    web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
      console.log("disconnected");
      setWalletAddress("")
    });
    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("error", error);
    });
    web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
      console.log("error", error);
    });
  };

  const login = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
  };

  const disconnect = async () => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
  };

  const getAccounts = async (provider) => {
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    console.log("address", address)
    setWalletAddress(address)
  };

  const getBalance = async (provider) => {
    const balance = ethers.utils.formatEther(
      await provider.getBalance(walletAddress) // Balance is in wei
    );
    console.log(balance);
  };

  const sendTransaction = async (provider, destination, amount) => {
    const signer = provider.getSigner();
    const foormatAmount = ethers.utils.parseEther(amount);

    const tx = await signer.sendTransaction({
      to: destination,
      value: foormatAmount,
      maxPriorityFeePerGas: "5000000000",
      maxFeePerGas: "6000000000000",
    });

    const receipt = await tx.wait();
    console.log(receipt);
  };

  const signMessage = async (message) => {
    const web3authProvider = await web3auth.connect()
    const provider = new ethers.providers.Web3Provider(web3authProvider);
    const signer = provider.getSigner();
    const signedMessage = await signer.signMessage(message);
    console.log(signedMessage);
  };

  const readFromContract = async (provider, contractABI, contractAddress) => {
    const signer = provider.getSigner();

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const message = await contract.message();
  }

  const writeOnContract = async (provider, contractABI, contractAddress) => {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const tx = await contract.update("NEW_MESSAGE");
    const receipt = await tx.wait();

    console.log(receipt)
  }

  const getPrivateKey = async () => {
    const privateKey = await web3auth.provider.request({
      method: "eth_private_key"
    });
    console.log('private', privateKey)
  };

  useEffect(() => {
    const init = async () => {
      try {
        const web3auth = new Web3Auth({
          clientId: clientId, // Get your Client ID from Web3Auth Dashboard
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0x13881",
            displayName: "Polygon Testnet",
            blockExplorer: "https://mumbai.polygonscan.com",
            ticker: "MATIC",
            tickerName: "Matic",
          },
          uiConfig: {
            theme: "dark",
            loginMethodsOrder: ["google", "facebook", "twitter", "reddit", "discord", "twitch", "apple", "line", "github", "kakao", "linkedin", "weibo", "wechat", "email_passwordless"],
            appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
          },
          defaultLanguage: "en",
        });

        setWeb3auth(web3auth);
        subscribeAuthEvents(web3auth)

        await web3auth.initModal();
        if (web3auth.provider) {
          setProvider(web3auth.provider);
        };

      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, [])


  return (
    <LivepeerConfig client={livepeerClient}>
      <Wrapper className="App">
        <Routes>
          <Route path="/" element={
            <Home connect={login} disconnect={disconnect} sign={signMessage} walletAddress={walletAddress} />
          } />
          <Route path='/demo/space' element={<Scene charID={1} bgID={0} />} />
          {
            walletAddress ?
              <>
                <Route path="/contract/:id/livepeer" element={<Livepeer />} />
                <Route path="/profile/employee/:id" element={<Profile sign={signMessage} />} />
              </>
              : ""
          }
          <Route path="*" element={<Construction />} />
        </Routes>
      </Wrapper >
    </LivepeerConfig>
  );
}

export default App;
