import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/CoinData.css';
import { ContextCrypto } from '../Helpers/Context';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TradingViewWidget from './TradingViewWidget'

const CoinData = () => {
  const { name } = useParams();
  const { CryptoDataV1, CryptoDataV2, setCryptoDataV1, setCryptoDataV2 } = useContext(ContextCrypto);
  const selectedCoinData = CryptoDataV1.find((coin) => coin.name === name);
  const selectedCoinDatav2 = CryptoDataV2.find((coin) => coin.name === name);
  
  

  useEffect(() => {
    if (!selectedCoinData || !selectedCoinDatav2) {
      const fetchData = async () => {
        try {
          if (!selectedCoinData) {
            const responseV1 = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`);
            const dataV1 = await responseV1.json();
            setCryptoDataV1(dataV1);
          }

          if (!selectedCoinDatav2) {
            const responseV2 = await fetch(`https://api.coinlore.net/api/tickers/`);
            const dataV2 = await responseV2.json();
            setCryptoDataV2(dataV2.data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [selectedCoinData, selectedCoinDatav2 , setCryptoDataV1 ,setCryptoDataV2 ]);

  if (!selectedCoinData || !selectedCoinDatav2) {
    return <div>Loading...</div>; // Add a loading state or redirect to Home
  }

  return (
    <div className='coindata'>
      <div className='navdata'>
        
      </div>
      <div className='navbar'>
        
        <div className='right'>
          <Link to='/'>Home</Link>
        </div>
      </div>
      <div className='content'>
        {console.log(selectedCoinData.symbol)}
        <div className='leftcontent'>
          <div className='leftcontenthead'>
            <img src={selectedCoinData.image} alt='non' />
            <h3>
              {selectedCoinData.name} • <p>{selectedCoinData.symbol} </p> <p id='rank'>#{selectedCoinDatav2.rank}</p>
            </h3>
          </div>
          <div className='leftcontentdata'>
            <div className='curr_price'>
              <h2>${selectedCoinDatav2.price_usd}</h2>
              <div id={selectedCoinDatav2.percent_change_1h > 0 ? 'up' : 'down'}>
                <>
                  {selectedCoinDatav2.percent_change_1h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </>
                <p>{selectedCoinDatav2.percent_change_1h}%</p>
              </div>
            </div>
            <div className='datalist'>
            <div className='singledata' ><p>market_cap</p><p>{selectedCoinData.market_cap}</p></div>
              <div className='singledata' ><p>market_cap_rank</p><p>{selectedCoinData.market_cap_rank}</p></div>
              <div className='singledata' ><p>fully_diluted_valuation</p><p>{selectedCoinData.fully_diluted_valuation}</p></div>
              <div className='singledata' ><p>total_volume</p><p>{selectedCoinData.total_volume}</p></div>
              <div className='singledata' ><p>high_24h</p><p>{selectedCoinData.high_24h}</p></div>
              <div className='singledata' ><p>low_24h</p><p>{selectedCoinData.low_24h}</p></div>
              <div className='singledata' ><p>price_change_24h</p><p>{selectedCoinData.price_change_24h}</p></div>
              <div className='singledata' ><p>price_change_percentage_24h</p><p>{selectedCoinData.price_change_percentage_24h}</p></div>
              <div className='singledata' ><p>market_cap_change_24h</p><p>{selectedCoinData.market_cap_change_24h}</p></div>
              <div className='singledata' ><p>market_cap_change_percentage_24h</p><p>{selectedCoinData.market_cap_change_percentage_24h}</p></div>
              <div className='singledata' ><p>circulating_supply</p><p>{selectedCoinData.circulating_supply}</p></div>
              <div className='singledata' ><p>total_supply</p><p>{selectedCoinData.total_supply}</p></div>
              <div className='singledata' ><p>market_cap_change_percentage_24h</p><p>{selectedCoinData.market_cap_change_percentage_24h}</p></div>
              <div className='singledata' ><p>max_supply</p><p>{selectedCoinData.max_supply}</p></div>
              <div className='singledata' ><p>ath</p><p>{selectedCoinData.ath}</p></div>
              <div className='singledata' ><p>ath_change_percentage</p><p>{selectedCoinData.ath_change_percentage}</p></div>
              <div className='singledata' ><p>ath_date</p><p>{selectedCoinData.ath_date}</p></div>
              <div className='singledata' ><p>atl</p><p>{selectedCoinData.atl}</p></div>
              <div className='singledata' ><p>atl_change_percentage</p><p>{selectedCoinData.atl_change_percentage}</p></div>
              <div className='singledata' ><p>atl_date</p><p>{selectedCoinData.atl_date}</p></div>
            </div>
          </div>
        </div>
        <div className='rightcontent'>
          <TradingViewWidget symbol={selectedCoinData.symbol}/>
          
        </div>
      </div>
    </div>
  );
};

export default CoinData;
