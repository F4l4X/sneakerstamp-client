import React from "react";
import { motion } from "framer-motion";

import styles from "../../styles";
import { startingFeatures } from "../../constants";
import { staggerContainer, fadeIn, planetVariants } from "../../utils/motion";
import { StartSteps, TitleText, TypingText } from "../../components";

import metamask from "../../assets/metamask.png";

const GetStarted = () => {
  return (
    <section className={`${styles.paddings} relative z-10`}>
      <div className="fixed right-1/3 bottom-1/2">
        <div className="absolute inset-0 gradient-04" />
      </div>
      <motion.div className="mx-auto flex lg:flex-row flex-col gap-8">
        <motion.div
          variants={planetVariants("left")}
          className={`flex-1 ${styles.flexCenter}`}
        >
          <img
            src={metamask}
            alt="get-started"
            className="w-[50%] h-[50%] object-contain z-20"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col z-20"
        >
          <TypingText title="| Get started with SneakerStamp" />
          <TitleText title={<>Get started with just a few clicks</>} />
          <div className="mt-[31px] flex flex-col max-w-[370px] gap-[24px] z-20">
            {startingFeatures.map((feature, index) => (
              <StartSteps
                key={feature}
                number={`${index < 10 ? "0" : ""} ${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GetStarted;
