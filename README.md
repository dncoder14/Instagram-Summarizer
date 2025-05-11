# Instagram Reel Summarizer

Transform Instagram Reels and video content into concise, AI-generated summaries.

## Features

- Process public Instagram Reels via URL
- Upload local video files (MP4 format)
- AI-powered transcription using OpenAI's Whisper
- Smart summarization using GPT-3.5
- Copy-to-clipboard functionality
- Responsive design for all devices
- Real-time processing status updates

## Tech Stack

- React 18.3
- Vite
- Framer Motion for animations
- OpenAI API (Whisper & GPT-3.5)
- Instagram Video API
- Axios for HTTP requests

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/dncoder14/Instagram-Summarizer.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Processing Instagram Reels

1. Copy the URL of a public Instagram Reel
2. Paste the URL into the application
3. Click "Summarize Video"
4. Wait for the AI to process the video
5. View the transcript and summary

### Processing Local Videos

1. Click the "Upload Video" tab
2. Select an MP4 video file (max 20MB)
3. Click "Summarize Video"
4. Wait for the AI to process the video
5. View the transcript and summary

## Limitations

- Only public Instagram Reels are supported
- Maximum video file size: 20MB
- MP4 format only for file uploads
- Processing time varies based on video length

## Privacy

- No videos or transcripts are stored
- All processing is done in real-time
- API keys are securely handled server-side

## License

MIT License - feel free to use and modify for your own projects.
