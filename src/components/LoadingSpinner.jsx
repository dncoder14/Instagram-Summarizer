import { motion } from 'framer-motion'
import '../styles/LoadingSpinner.css'

const LoadingSpinner = () => {
  const spinTransition = {
    repeat: Infinity,
    ease: "linear",
    duration: 1.5
  }
  
  return (
    <div className="spinner-container">
      <motion.div
        className="spinner"
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  )
}

export default LoadingSpinner