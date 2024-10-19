import React, { useContext } from 'react'
import '../styles/Search.css'
import { ContextCrypto } from '../Helpers/Context'

const Serach = () => {
    const { CryptoDataV1 , setCryptoDataV2} = useContext(ContextCrypto)
    const handlechange = (name) => {
      const query = name.toLowerCase();

      // If search input is empty, restore the original data
      if (query === '') {
          setCryptoDataV2(CryptoDataV1);
      } else {
          // Filter the array based on the search query
          const newArray = CryptoDataV1.filter(data =>
              data.name.toLowerCase().includes(query)
          );
          setCryptoDataV2(newArray);
      }
  };
  return (
    <div className='search'>
        <h1>Crypto Tracker</h1>
      <input onChange={(e)=>{handlechange(e.target.value)}} type='text' placeholder='Search For A Coin '/>
    </div>
  )
}

export default Serach
