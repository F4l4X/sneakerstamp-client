import React from "react";
import { motion } from "framer-motion";

import styles from "../../styles";
import { startingFeatures, technology } from "../../constants";
import { staggerContainer, fadeIn, planetVariants } from "../../utils/motion";
import {
  StartSteps,
  TechnoSteps,
  TitleText,
  TypingText,
} from "../../components";

import new_balance from "/nfts/new_balance.jpg";

const Technology = () => {
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={fadeIn("right", "tween", 0.2, 1)}
          className="flex-[0.95] flex justify-center flex-col"
        >
          <TypingText title="| The technology" />
          <TitleText title={<>How does it work?</>} />
          <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
            {technology.map((feature) => (
              <TechnoSteps key={feature.title} {...feature} />
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={planetVariants("right")}
          className={`flex-1 ${styles.flexCenter}`}
        >
          <img
            src={new_balance}
            alt="get-started"
            className="w-[70%] h-[70%] object-contain"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Technology;
