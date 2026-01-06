import { useState, useEffect } from 'react'
import './App.css'

// To use backend later, add your Render URL here or in .env
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const targetDate = new Date('February 17, 2026 00:00:00').getTime()
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const now = new Date().getTime()
    const difference = targetDate - now

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return timeLeft
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="App">
      <h1 className="title-farsi">مانده به گاییده شدن مادر خامنه ای</h1>
      <div className="countdown-container">
        <div className="countdown-item">
          <span className="count">{timeLeft.days}</span>
          <span className="label">Days</span>
        </div>
        <div className="countdown-item">
          <span className="count">{timeLeft.hours}</span>
          <span className="label">Hours</span>
        </div>
        <div className="countdown-item">
          <span className="count">{timeLeft.minutes}</span>
          <span className="label">Minutes</span>
        </div>
        <div className="countdown-item">
          <span className="count">{timeLeft.seconds}</span>
          <span className="label">Seconds</span>
        </div>
      </div>
    </div>
  )
}

export default App
