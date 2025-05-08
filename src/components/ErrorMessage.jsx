import { motion } from 'framer-motion'
import { FaExclamationTriangle } from 'react-icons/fa'
import '../styles/ErrorMessage.css'

const ErrorMessage = ({ message }) => {
  return (
    <motion.div 
      className="error-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <FaExclamationTriangle className="error-icon" />
      <p className="error-message">{message}</p>
    </motion.div>
  )
}

export default ErrorMessage