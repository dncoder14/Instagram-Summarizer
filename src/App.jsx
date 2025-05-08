import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import VideoInputForm from './components/VideoInputForm'
import ResultsDisplay from './components/ResultsDisplay'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import { processInstagramReel, processVideoFile } from './services/videoProcessingService'
import './styles/App.css'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [transcript, setTranscript] = useState('')
  const [summary, setSummary] = useState('')
  
  const handleProcessVideo = async (input, type) => {
    setLoading(true)
    setError(null)
    setTranscript('')
    setSummary('')
    
    try {
      let result
      
      if (type === 'url') {
        result = await processInstagramReel(input)
      } else if (type === 'file') {
        result = await processVideoFile(input)
      }
      
      if (result && result.transcript && result.summary) {
        setTranscript(result.transcript)
        setSummary(result.summary)
      } else {
        throw new Error('Failed to process the video. Please try again with a different video.')
      }
    } catch (err) {
      console.error('Error processing video:', err)
      setError(err.message || 'An unexpected error occurred. Please try again with a different video.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="app">
      <Header />
      <main className="app-content">
        <VideoInputForm onSubmit={handleProcessVideo} disabled={loading} />
        
        {loading && (
          <div className="loading-container">
            <LoadingSpinner />
            <p>Processing your video... This may take a moment</p>
          </div>
        )}
        
        {error && <ErrorMessage message={error} />}
        
        {(transcript || summary) && (
          <ResultsDisplay transcript={transcript} summary={summary} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App