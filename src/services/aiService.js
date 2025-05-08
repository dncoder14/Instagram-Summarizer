
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // use env variables instead
const WHISPER_API_ENDPOINT = 'https://api.openai.com/v1/audio/transcriptions'
const GPT_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions'
/**
 * @param {Blob} audioBlob - The audio to transcribe
 * @returns {Promise<string>} - Transcribed text
 */
export const transcribeAudio = async (audioBlob) => {
  try {
    const formData = new FormData()
    formData.append('file', audioBlob, 'audio.mp3')
    formData.append('model', 'whisper-1')
    
    const response = await fetch(WHISPER_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: formData,
      timeout: 30000 // 30 second timeout
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API configuration.')
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.')
      } else {
        throw new Error('Failed to transcribe audio. Please try again.')
      }
    }
    
    const data = await response.json()
    return data.text
  } catch (error) {
    console.error('Error transcribing audio:', error)
    if (error.name === 'AbortError') {
      throw new Error('Transcription request timed out. Please try again.')
    }
    throw new Error(error.message || 'Failed to transcribe the audio. Please try again.')
  }
}

/**
 * @param {string} transcript - The transcript to summarize
 * @returns {Promise<string>} - Generated summary
 */
export const generateSummary = async (transcript) => {
  try {
    const response = await fetch(GPT_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes video transcripts concisely.'
          },
          {
            role: 'user',
            content: `Please summarize this video transcript: ${transcript}`
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      }),
      timeout: 15000 // 15 second timeout
    })
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your OpenAI API configuration.')
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.')
      } else {
        throw new Error('Failed to generate summary. Please try again.')
      }
    }
    
    const data = await response.json()
    return data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error generating summary:', error)
    if (error.name === 'AbortError') {
      throw new Error('Summary generation request timed out. Please try again.')
    }
    throw new Error(error.message || 'Failed to generate a summary. Please try again.')
  }
}