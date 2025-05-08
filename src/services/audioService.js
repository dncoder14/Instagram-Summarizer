/**
 * Extract audio from a video file
 * @param {Blob|File} videoBlob - The video file/blob to extract audio from
 * @returns {Promise<Blob>} - Audio blob in a suitable format
 */
export const extractAudioFromVideo = async (videoBlob) => {
  try {
    // Create URL for the video blob
    const videoUrl = URL.createObjectURL(videoBlob)
    
    // Create video element
    const videoElement = document.createElement('video')
    videoElement.src = videoUrl
    videoElement.muted = true
    
    // Create audio context
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const destination = audioContext.createMediaStreamDestination()
    
    // Load the video
    await new Promise((resolve, reject) => {
      videoElement.onloadedmetadata = resolve
      videoElement.onerror = reject
      setTimeout(reject, 5000, new Error('Video loading timed out'))
    })
    
    // Create media source from video element
    const videoStream = videoElement.captureStream ? videoElement.captureStream() : videoElement.mozCaptureStream()
    const videoSource = audioContext.createMediaStreamSource(videoStream)
    
    // Connect to the destination
    videoSource.connect(destination)
    
    // Start recording
    const mediaRecorder = new MediaRecorder(destination.stream)
    const audioChunks = []
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data)
      }
    }
    
    // Start video playback
    await videoElement.play()
    
    // Start recording
    mediaRecorder.start()
    
    // Record until video ends
    return new Promise((resolve, reject) => {
      videoElement.onended = () => {
        mediaRecorder.stop()
      }
      
      mediaRecorder.onstop = () => {
        // Clean up resources
        videoElement.pause()
        URL.revokeObjectURL(videoUrl)
        audioContext.close()
        
        // Create audio blob
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' })
        resolve(audioBlob)
      }
      
      // Set timeout for long videos
      const timeout = setTimeout(() => {
        videoElement.pause()
        mediaRecorder.stop()
        reject(new Error('Audio extraction timed out. The video may be too long.'))
      }, 120000) // 2 minute timeout
      
      mediaRecorder.onerror = (event) => {
        clearTimeout(timeout)
        reject(new Error(`MediaRecorder error: ${event.error}`))
      }
      
      // For demonstration, limit to 20 seconds for mock implementation
      setTimeout(() => {
        videoElement.pause()
        mediaRecorder.stop()
      }, 20000)
    })
  } catch (error) {
    console.error('Error extracting audio:', error)
    throw new Error('Failed to extract audio from the video.')
  }
}