"use client";

import { motion } from 'framer-motion';

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface AnimatedTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedText = ({ children, delay = 0, className }: AnimatedTextProps) => {
  return (
    <motion.div
      variants={textVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;