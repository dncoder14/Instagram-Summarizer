import { motion } from 'framer-motion'
import { FaInstagram } from 'react-icons/fa'
import '../styles/Header.css'

const Header = () => {
  return (
    <header className="header">
      <motion.div 
        className="header-content"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="logo">
          <FaInstagram className="logo-icon" />
          <motion.span 
            className="logo-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Reel Summarizer
          </motion.span>
        </div>
        <h1>Transform Instagram Reels into concise summaries</h1>
        <p>Paste a public Instagram Reel URL or upload your own video to get an AI-generated transcript and summary</p>
      </motion.div>
    </header>
  )
}

export default Header