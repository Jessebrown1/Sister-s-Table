import { motion } from "framer-motion";

const overlayVariants = {
  initial: { y: "100%" },
  animate: { y: "0%" },
  exit: { y: "-100%" },
};

const PageTransition = ({ title }) => {
  return (
    <motion.div
      className="page-transition"
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <h1>{title}</h1>
    </motion.div>
  );
};

export default PageTransition;
