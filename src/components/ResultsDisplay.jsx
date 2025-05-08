import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCopy, FaCheck } from 'react-icons/fa'
import '../styles/ResultsDisplay.css'

const ResultsDisplay = ({ transcript, summary }) => {
  const [copiedTranscript, setCopiedTranscript] = useState(false)
  const [copiedSummary, setCopiedSummary] = useState(false)
  
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'transcript') {
        setCopiedTranscript(true)
        setTimeout(() => setCopiedTranscript(false), 2000)
      } else {
        setCopiedSummary(true)
        setTimeout(() => setCopiedSummary(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  return (
    <motion.div 
      className="results-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="result-section">
        <div className="result-header">
          <h2>Summary</h2>
          <motion.button 
            className="copy-button"
            onClick={() => copyToClipboard(summary, 'summary')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {copiedSummary ? <FaCheck /> : <FaCopy />}
            {copiedSummary ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>
        <div className="result-content">
          {summary}
        </div>
      </div>
      
      <div className="result-section">
        <div className="result-header">
          <h2>Full Transcript</h2>
          <motion.button 
            className="copy-button"
            onClick={() => copyToClipboard(transcript, 'transcript')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {copiedTranscript ? <FaCheck /> : <FaCopy />}
            {copiedTranscript ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>
        <div className="result-content transcript">
          {transcript}
        </div>
      </div>
    </motion.div>
  )
}

export default ResultsDisplay