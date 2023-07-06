import React from "react";

import { motion } from "framer-motion";
import styles from "../styles";
import { slideIn, staggerContainer, textVariant } from "../utils/motion";

import nike_nft from "../assets/nike_nft.png";
import GetStarted from "./section_hero/GetStarted";
import Technology from "./section_hero/Technology";

const Hero = () => {
  const address = "0xabc";

  return (
    <section className={`${styles.yPaddings} sm:pl-16 pl-6`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="flex justify-center items-center flex-col relative z-10">
          <motion.div
            variants={textVariant(1.1)}
            className="flex flex-row justify-center items-center"
          >
            <div className={styles.heroDText}></div>
            <h1 className={styles.heroHeading}>ecentralised</h1>
          </motion.div>
          <motion.h1 variants={textVariant(1.2)}>
            <p className={styles.heroHeading}>sneakers</p>
          </motion.h1>
        </div>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="relative w-full md:-mt-[10px] -mt-[12px]"
        >
          <div className="flex items-center justify-center md:mt-[-80px] lg:mt-[-100px] sm:mt-[-50px] mt-[-30px]">
            <img className="max-w-full h-auto" src={nike_nft} alt="Nike NFT" />
          </div>
        </motion.div>
      </motion.div>
      <Technology />
      <GetStarted />
    </section>
  );
};

export default Hero;
