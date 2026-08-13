import React from "react";
import { motion } from "framer-motion";

export const TypewriterText = ({
  children = "",
  className = "",
  duration = 0.8, // total sequence duration in seconds
}) => {
  const text = typeof children === "string" ? children.trim() : "";
  const words = text ? text.split(/\s+/) : [];
  const staggerDelay = words.length > 1 ? (duration - 0.15) / (words.length - 1) : 0.12;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: Math.max(0.08, staggerDelay),
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.22,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <React.Fragment key={index}>
          <motion.span variants={wordVariants} className="inline">
            {word}
          </motion.span>
          {index < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

export default TypewriterText;
