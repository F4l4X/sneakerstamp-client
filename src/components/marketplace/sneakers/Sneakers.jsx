import React from 'react'
import { motion } from "framer-motion";

//other components

//data
import sneakersData from '../../../constants/NFT_collection/nft.json'
import { fadeIn } from '../../../utils/motion';
import SneakersCard from './SneakersCard';

const Sneakers = () => {
  return (
    
    <motion.div 
    variants={fadeIn('left', 'tween', 0.2, 1)}
    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'
    >
    {sneakersData.sneakers.map((shoe, index) => (
        <SneakersCard 
            key={index}
            price={shoe.price}
            brand={shoe.brand}
            model={shoe.model}
            img={shoe.img}
        />
    ))}
    </motion.div>
      
  )
}

export default Sneakers