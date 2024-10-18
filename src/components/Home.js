import React, { useContext } from 'react';
import '../styles/Home.css';
import { ContextCrypto } from '../Helpers/Context';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Serach from './Serach';
import { Link } from 'react-router-dom';
const Home = () => {
  const { CryptoDataV1, CryptoDataV2 } = useContext(ContextCrypto);
  let iconStyles = {
    fontSize: '50px'
  };
  return (
    <div className='home'>
      <div id="scroll-container">
        <div className="scroll-text">{CryptoDataV1.map((coin , key)=>(
          <div className='datacoin'>
            <p id={coin.price_change_percentage_24h > 0 ?'greeni':'redi'}>{coin.price_change_percentage_24h > 0?<ArrowDropUpIcon style={iconStyles}/> :<ArrowDropDownIcon style={iconStyles}/>}</p>
            <img src={coin.image} alt="coin icon"/>
            <p>{coin.symbol}:  </p>
            <p >{coin.price_change_percentage_24h.toFixed(2)}&nbsp;&nbsp;</p>
          </div>
        ))}</div>
      </div>
      <Serach/>
      <div className='container'>
        
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Supply</th>
              <th>Price $</th>
              <th>1H Change%</th>
              <th>Volume USD 24H</th>
             
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {CryptoDataV2.map((data, index) => {
              const matchingDataV1 = CryptoDataV1.find((data1) => data1.name === data.name);

              if (matchingDataV1) {
                return (
                  <tr key={index}>
                    <td>{data.rank}</td>
                    <td id='imgname'>
                      <div className='imgname'>
                      <img src={matchingDataV1.image} alt={data.name}  alt="coin icon"/>
                      <div className='tittle'>
                        <div >{data.name} </div> 
                        <div className='dot'>•</div>
                         
                        <div >{data.symbol}</div> 
                        </div>
                      
                      </div>
                    </td>
                    <td>{data.csupply}</td>
                    <td>{data.price_usd} $</td>
                    <td id='change' >
                      <div id={data.percent_change_1h > 0 ?'green':'red'}>
                      {data.percent_change_1h > 0?<ArrowDropUpIcon/> :<ArrowDropDownIcon/>}
                      {data.percent_change_1h}
                      </div>
                    </td>
                    <td>{data.volume24}</td>
                   
                    <td>
                      <Link to={`/view/${data.name}`}>
                        <button>See More...</button>
                      </Link>
                      
                    </td>
                  </tr>
                );
              } 
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
