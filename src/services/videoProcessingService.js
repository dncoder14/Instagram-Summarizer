import axios from 'axios'
import { extractAudioFromVideo } from './audioService'
import { transcribeAudio } from './aiService'
import { generateSummary } from './aiService'

const INSTAGRAM_API_KEY = process.env.INSTAGRAM_API_KEY;
const INSTAGRAM_API_ENDPOINT = 'https://instagram-downloader-download-instagram-videos-reels.p.rapidapi.com/index'

export const processInstagramReel = async (reelUrl) => {
  try {
    if (!isValidInstagramUrl(reelUrl)) {
      throw new Error('Please provide a valid Instagram Reel or Post URL (e.g., https://www.instagram.com/reel/...).')
    }
    
    const videoData = await downloadInstagramVideo(reelUrl)
    if (!videoData || !videoData.url) {
      throw new Error('Unable to access this Instagram video. Please ensure the video is public and the URL is correct.')
    }
    
    try {
      const videoResponse = await axios.get(videoData.url, { 
        responseType: 'blob',
        timeout: 30000,
        maxContentLength: 100 * 1024 * 1024
      })
      
      if (!videoResponse.data || videoResponse.data.size === 0) {
        throw new Error('The video content appears to be empty or inaccessible. Please try a different video.')
      }
      
      const videoBlob = new Blob([videoResponse.data], { type: 'video/mp4' })
      const audioBlob = await extractAudioFromVideo(videoBlob)
      const transcript = await transcribeAudio(audioBlob)
      const summary = await generateSummary(transcript)
      
      return { transcript, summary }
    } catch (downloadError) {
      if (downloadError.code === 'ECONNABORTED') {
        throw new Error('The video download timed out. Please try again or use a shorter video.')
      }
      throw new Error('Failed to download the video content. The video might be unavailable or too large.')
    }
  } catch (error) {
    console.error('Error processing Instagram Reel:', error)
    throw error
  }
}

export const processVideoFile = async (videoFile) => {
  try {
    if (!videoFile.type.includes('video')) {
      throw new Error('Invalid file type. Please upload a video file.')
    }
    
    if (videoFile.size > 20 * 1024 * 1024) {
      throw new Error('Video file is too large. Please upload a video smaller than 20MB.')
    }
    
    const audioBlob = await extractAudioFromVideo(videoFile)
    const transcript = await transcribeAudio(audioBlob)
    const summary = await generateSummary(transcript)
    
    return { transcript, summary }
  } catch (error) {
    console.error('Error processing video file:', error)
    throw error
  }
}

const downloadInstagramVideo = async (url) => {
  try {
    const options = {
      method: 'GET',
      url: INSTAGRAM_API_ENDPOINT,
      params: { url },
      headers: {
        'X-RapidAPI-Key': INSTAGRAM_API_KEY,
        'X-RapidAPI-Host': 'instagram-downloader-download-instagram-videos-reels.p.rapidapi.com'
      },
      timeout: 15000
    }
    
    const response = await axios.request(options)
    
    if (!response.data || !response.data.url) {
      throw new Error('This Instagram video appears to be private or has been deleted. Please try a different public video.')
    }
    
    return response.data
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('This Instagram video could not be found. Please verify the URL and ensure the video is public.')
      } else if (error.response.status === 429) {
        throw new Error('Service is temporarily unavailable. Please try again in a few minutes.')
      }
      throw new Error('Unable to access this Instagram video. Please ensure the video is public and try again.')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please check your internet connection and try again.')
    }
    throw new Error('Failed to process the Instagram video. Please ensure the URL is correct and the video is public.')
  }
}

const isValidInstagramUrl = (url) => {
  try {
    const parsedUrl = new URL(url)
    const isInstagramDomain = parsedUrl.hostname === 'www.instagram.com' || parsedUrl.hostname === 'instagram.com'
    const hasValidPath = url.includes('/reel/') || url.includes('/p/')
    return isInstagramDomain && hasValidPath
  } catch (error) {
    return false
  }
}