import React, { useContext } from 'react'
import '../styles/Search.css'
import { ContextCrypto } from '../Helpers/Context'

const Serach = () => {
    const { CryptoDataV2 , setCryptoDataV2} = useContext(ContextCrypto)
    const handlechange = (name)=>{
     
        const query = name.toLowerCase()
        const Newarray = 
        CryptoDataV2.filter(data=>data.name.toLowerCase().includes(query) )
        setCryptoDataV2(Newarray)
        
    }
  return (
    <div className='search'>
        <h1>Crypto Tracker</h1>
      <input onChange={(e)=>{handlechange(e.target.value)}} type='text' placeholder='Search For A Coin '/>
    </div>
  )
}

export default Serach
