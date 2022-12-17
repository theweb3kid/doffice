import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react'
import { Routes, Route, useLocation } from "react-router-dom";
import { Web3Auth } from "@web3auth/modal";
import { ADAPTER_EVENTS } from "@web3auth/base";

import styled from 'styled-components';
import { ethers } from "ethers";
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

const web3auth = new Web3Auth({
  clientId: "BHLo_UiLxdZoLMDI8wX36AqjH7Cgaaq6JBRZ2onTWv8_n7RRuhimG54VTldatIT7jSYBKGKrLJ4J1Xdfynb3x4c", // Get your Client ID from Web3Auth Dashboard
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
  const location = useLocation();

  const init = async () => {
    await web3auth.initModal()
  }

  const subscribeAuthEvents = (web3auth) => {
    web3auth.on(ADAPTER_EVENTS.CONNECTED, async (data) => {
      console.log("connected to wallet", data);

      const web3authProvider = await web3auth.connect()
      const provider = new ethers.providers.Web3Provider(web3authProvider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      console.log("address", address)
      setWalletAddress(address)
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
    await web3auth.connect()
  }

  const userInfo = async () => {
    const info = await web3auth.getUserInfo()
    console.log("user info", info)
  }

  const disconnect = async () => {
    await web3auth.logout()
  }

  const authenticate = async () => {
    const auth_info = await web3auth.authenticateUser();
    console.log("auth_info", auth_info)
  }

  const signMessage = async (message) => {
    const web3authProvider = await web3auth.connect()
    const provider = new ethers.providers.Web3Provider(web3authProvider);
    const signer = provider.getSigner();
    const signedMessage = await signer.signMessage(message);
    console.log(signedMessage)
  }

  useEffect(() => {
    init()
    subscribeAuthEvents(web3auth)
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
