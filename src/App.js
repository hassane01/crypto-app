import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { ContextCrypto } from './Helpers/Context';
import Serach from './components/Serach';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import CoinData from './components/CoinData';

function App() {
  const [CryptoDataV1 , setCryptoDataV1] = useState([])
  const [CryptoDataV2 , setCryptoDataV2] = useState([])
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then((res) => res.json())
      .then((data) => {
        setCryptoDataV1(data); 
      });
  
    fetch('https://api.coinlore.net/api/tickers/')
      .then((res) => res.json())
      .then((data) => {
        setCryptoDataV2(data.data); 
      });
  }, []);
  
  
  return (
    <div className="App">
      
      <ContextCrypto.Provider value={{CryptoDataV1 , CryptoDataV2 , setCryptoDataV1 , setCryptoDataV2}}>
      <BrowserRouter>  
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/view/:name' element={<CoinData/>}></Route>
        </Routes>
      </BrowserRouter>
        </ContextCrypto.Provider>
    </div>
  );
}

export default App;
