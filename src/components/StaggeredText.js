import React from "react";
import { motion } from "framer-motion";

const StaggeredText = ({ text }) => {
  const textArray = text.split(""); 

  const staggerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <h1>
      {textArray.map((letter, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
          transition={{ delay: index * 0.1, bounce: 0.1 }}
          style={{ display: "inline-block"}}
        >
          {letter}
        </motion.span>
      ))}
    </h1>
  );
};

export default StaggeredText;