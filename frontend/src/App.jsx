import { useState, useEffect, useMemo } from 'react'
import './App.css'

// To use backend later, add your Render URL here or in .env
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const targets = [
  { id: 1, nameEn: 'Ali Khamenei', nameFa: 'خامنه ای', dead: false, fixedDate: 'February 11, 2026 00:00:00' },
  { id: 2, nameEn: 'Qasem Soleimani', nameFa: 'قاسم سلیمانی', dead: true },
  { id: 3, nameEn: 'Ebrahim Raisi', nameFa: 'ابراهیم رئیسی', dead: true },
  { id: 4, nameEn: 'Ali Shamkhani', nameFa: 'علی شمخانی', dead: false },
  { id: 5, nameEn: 'Hossein Salami', nameFa: 'حسین سلامی', dead: false },
  { id: 6, nameEn: 'Esmail Qaani', nameFa: 'اسماعیل قاآنی', dead: false },
  { id: 7, nameEn: 'Ahmad Jannati', nameFa: 'احمد جنتی', dead: false, fixedDate: 'February 17, 2050 00:00:00' },
  { id: 8, nameEn: 'Mojtaba Khamenei', nameFa: 'مجتبی خامنه‌ای', dead: false },
  { id: 9, nameEn: 'Sadeq Larijani', nameFa: 'صادق لاریجانی', dead: false },
  { id: 10, nameEn: 'Mohammad Javad Zarif', nameFa: 'جواد ظریف', dead: false },
  { id: 11, nameEn: 'Hassan Rouhani', nameFa: 'حسن روحانی', dead: false },
]

function App() {
  const [selectedTarget, setSelectedTarget] = useState(targets[0])
  
  // Storage for random deadlines so they remain consistent for the session
  const deadlines = useMemo(() => {
    const map = {}
    const now = new Date().getTime()
    const maxDate = new Date('February 11, 2026 00:00:00').getTime()
    const minDiff = 2 * 24 * 60 * 60 * 1000 // 2 days

    targets.forEach(t => {
      if (t.dead) {
        map[t.id] = now - 1000 // Already passed
      } else if (t.fixedDate) {
        map[t.id] = new Date(t.fixedDate).getTime()
      } else {
        // Random date between 2 days from now and Feb 11
        const range = maxDate - (now + minDiff)
        map[t.id] = now + minDiff + Math.random() * range
      }
    })
    return map
  }, [])

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date().getTime()
      const difference = deadlines[selectedTarget.id] - now

      if (difference > 0 && !selectedTarget.dead) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft()) // Initial call

    return () => clearInterval(timer)
  }, [selectedTarget, deadlines])

  const isEliminated = selectedTarget.dead || (deadlines[selectedTarget.id] <= new Date().getTime())

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-header">TARGETS</div>
        {targets.map(t => (
          <button 
            key={t.id} 
            className={`target-btn ${selectedTarget.id === t.id ? 'active' : ''} ${t.dead ? 'dead' : ''}`}
            onClick={() => setSelectedTarget(t)}
          >
            {t.nameEn}
            {t.dead && <span className="status-tag">DONE</span>}
          </button>
        ))}
      </div>

      <div className="main-content">
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
        <h1 className="title-farsi">مانده به گاییده شدن {selectedTarget.nameFa}</h1>
      </div>

      {isEliminated && (
        <div className="eliminated-overlay animate-gta">
          <div className="gta-bar">
            <span>ELIMINATED</span>
          </div>
        </div>
      )}

      <div className="creator-credit">Created by Soheil Elahi</div>
    </div>
  )
}

export default App
