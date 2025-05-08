import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaLink, FaUpload } from 'react-icons/fa'
import '../styles/VideoInputForm.css'

const VideoInputForm = ({ onSubmit, disabled }) => {
  const [activeTab, setActiveTab] = useState('url')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (activeTab === 'url' && url) {
      onSubmit(url, 'url')
    } else if (activeTab === 'file' && file) {
      onSubmit(file, 'file')
    }
  }
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type.includes('video')) {
      setFile(selectedFile)
      setFileName(selectedFile.name)
    } else {
      setFile(null)
      setFileName('')
      alert('Please select a valid video file')
    }
  }
  
  const tabVariants = {
    active: { 
      backgroundColor: 'var(--color-primary-100)',
      color: 'var(--color-primary-700)',
      borderBottom: '3px solid var(--color-primary-600)'
    },
    inactive: { 
      backgroundColor: 'var(--color-neutral-100)',
      color: 'var(--color-neutral-700)',
      borderBottom: '3px solid transparent'
    }
  }
  
  return (
    <motion.div 
      className="input-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="tabs">
        <motion.button
          type="button"
          variants={tabVariants}
          animate={activeTab === 'url' ? 'active' : 'inactive'}
          whileHover={{ backgroundColor: 'var(--color-primary-50)' }}
          className={`tab ${activeTab === 'url' ? 'active' : ''}`}
          onClick={() => setActiveTab('url')}
          disabled={disabled}
        >
          <FaLink /> Instagram URL
        </motion.button>
        <motion.button
          type="button"
          variants={tabVariants}
          animate={activeTab === 'file' ? 'active' : 'inactive'}
          whileHover={{ backgroundColor: 'var(--color-primary-50)' }}
          className={`tab ${activeTab === 'file' ? 'active' : ''}`}
          onClick={() => setActiveTab('file')}
          disabled={disabled}
        >
          <FaUpload /> Upload Video
        </motion.button>
      </div>
      
      <form onSubmit={handleSubmit} className="input-form">
        {activeTab === 'url' && (
          <div className="input-group">
            <label htmlFor="reelUrl">Paste Instagram Reel URL:</label>
            <input
              id="reelUrl"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.instagram.com/reel/..."
              disabled={disabled}
              required={activeTab === 'url'}
              className="text-input"
            />
            <div className="hint">Only public Instagram reels are supported</div>
          </div>
        )}
        
        {activeTab === 'file' && (
          <div className="input-group">
            <label htmlFor="videoFile">Upload MP4 Video File:</label>
            <div className="file-input-container">
              <input
                id="videoFile"
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
                disabled={disabled}
                required={activeTab === 'file'}
                className="file-input"
              />
              <div className="file-input-label">
                {fileName ? fileName : 'Choose a video file'}
              </div>
              <button 
                type="button" 
                className="file-browse-button"
                disabled={disabled}
                onClick={() => document.getElementById('videoFile').click()}
              >
                Browse
              </button>
            </div>
            <div className="hint">MP4 format only, maximum 20MB</div>
          </div>
        )}
        
        <motion.button
          type="submit"
          className="submit-button"
          disabled={disabled || (activeTab === 'url' && !url) || (activeTab === 'file' && !file)}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Summarize Video
        </motion.button>
      </form>
    </motion.div>
  )
}

export default VideoInputForm