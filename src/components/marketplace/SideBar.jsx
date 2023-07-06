import React from 'react'

import sneakersData from '../../constants/NFT_collection/nft.json'

const SideBar = ({}) => {
  return (
    <div className="md:w-1/6 lg:w-1- bg-gray-200 p-4 rounded-[10px]">
      <h1 className='font-bold'>Brand</h1>
      <select>
        {sneakersData.sneakers.map((sneakers, index) => (
          <option key={index} value={sneakers.brand}>{sneakers.brand}</option>
        ))}
      </select>
    </div>
  )
}

export default SideBar