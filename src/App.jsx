import { useState } from 'react'
import {ethers } from 'ethers'
import axios from 'axios';
import './App.css'


const App = () => {
  const [seedPhrase, setSeedPhrase] = useState('');
  const [wallets, setWallets] = useState([]);


const generate_Seed_phrase = () =>{
    const mnemonic = ethers.Mnemonic.entrytoPhrase(ethers.randomBytes(16));
    setSeedPhrase(mnemonic);
};

const create_Wallet_from_Seed =()=>{
    if(!seedPhrase) return;

    const hdNode = ethers.HDNodeWallet.fromPhrase(seedPhrase, `m/44'/60'/0'/0/${wallets.length}`);

    const wallet_with_id = {
      id: wallets.length +1,
      address: hdNode.address,
      privateKey: hdNode.privateKey,
      publicKey: hdNode.publicKey,
      mnemonic: hdNode.mnemonic.phrase,
      signingKey: hdNode.signingKey,
      path: hdNode.path,
    };

    setSelectedWallet(hdNode);
    const newWallets = [...wallets, walletWithId];
    setWallets(newWallets);


    fetchBalance(walletWithId);

};

const fetchBalance = async( wallet) => {
   if(wallet){
    const response = await axios.post(import.meta.env.VITE_ALCHMEY_RPC_URL,
      {"jsonrpc":"2.0",
        "id": 1,
        "method": "eth_getBalance",
        "params": [wallet.address,"latest"]
      },
      {
        headers : {
          "Content-type": "application/json",
        }
      }
    )
   }
}
}
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
    </>
  )
}

export default App;
