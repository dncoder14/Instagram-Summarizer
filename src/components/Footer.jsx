import { FaHeart, FaGithub } from 'react-icons/fa'
import '../styles/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Made with <FaHeart className="heart-icon" /> in {currentYear}
        </p>
        <p className="disclaimer">
          This tool only works with public videos. We don't store your videos or data.
        </p>
        <div className="footer-links">
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Terms of Service</a>
          <a href="#" className="footer-link">
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer