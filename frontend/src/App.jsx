import { useState, useEffect, useMemo } from 'react'
import './App.css'

// To use backend later, add your Render URL here or in .env
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const targets = [
  { id: 1, nameEn: 'Ali Khamenei', nameFa: 'خامنه ای', dead: false, fixedDate: 'February 11, 2026 00:00:00' },
  { id: 2, nameEn: 'Qasem Soleimani', nameFa: 'قاسم سلیمانی', dead: true },
  { id: 3, nameEn: 'Ebrahim Raisi', nameFa: 'ابراهیم رئیسی', dead: true },
  { id: 4, nameEn: 'Hassan Nasrallah', nameFa: 'حسن نصرالله', dead: true },
  { id: 5, nameEn: 'Ismail Haniyeh', nameFa: 'اسماعیل هنیه', dead: true },
  { id: 6, nameEn: 'Yahya Sinwar', nameFa: 'یحیی سنوار', dead: true },
  { id: 7, nameEn: 'H. Amir-Abdollahian', nameFa: 'حسین امیرعبداللهیان', dead: true },
  { id: 8, nameEn: 'Abbas Nilforoushan', nameFa: 'عباس نیلفروشان', dead: true },
  { id: 9, nameEn: 'Mohammad Reza Zahedi', nameFa: 'محمدرضا زاهدی', dead: true },
  { id: 10, nameEn: 'Mohsen Fakhrizadeh', nameFa: 'محسن فخری‌زاده', dead: true },
  { id: 11, nameEn: 'Sayyed Razi Mousavi', nameFa: 'سید رضی موسوی', dead: true },
  { id: 12, nameEn: 'Fuad Shukr', nameFa: 'فؤاد شکر', dead: true },
  { id: 13, nameEn: 'Ibrahim Aqil', nameFa: 'ابراهیم عقیل', dead: true },
  { id: 14, nameEn: 'Mohammad Afif', nameFa: 'محمد عفیف', dead: true },
  { id: 15, nameEn: 'Ali Karaki', nameFa: 'علی کرکی', dead: true },
  { id: 16, nameEn: 'Suhail Husseini', nameFa: 'سهیل حسینی', dead: true },
  { id: 17, nameEn: 'Wissam al-Tawil', nameFa: 'وسام الطویل', dead: true },
  { id: 18, nameEn: 'Saleh al-Arouri', nameFa: 'صالح العاروری', dead: true },
  { id: 19, nameEn: 'Hadi Haji Rahimi', nameFa: 'هادی حاجی‌رحیمی', dead: true },
  { id: 20, nameEn: 'Malek Rahmati', nameFa: 'مالک رحمتی', dead: true },
  { id: 21, nameEn: 'Al-e Hashem', nameFa: 'آل هاشم', dead: true },
  { id: 22, nameEn: 'Hassan Irloo', nameFa: 'حسن ایرلو', dead: true },
  { id: 23, nameEn: 'Razi Mousavi', nameFa: 'رضی موسوی', dead: true },
  { id: 24, nameEn: 'Mohammad Hejazi', nameFa: 'محمد حجازی', dead: true },
  { id: 25, nameEn: 'Esmail Qaani', nameFa: 'اسماعیل قاآنی', dead: false },
  { id: 26, nameEn: 'Hossein Salami', nameFa: 'حسین سلامی', dead: true },
  { id: 27, nameEn: 'Ali Shamkhani', nameFa: 'علی شمخانی', dead: false },
  { id: 28, nameEn: 'Ahmad Jannati', nameFa: 'احمد جنتی', dead: false, fixedDate: 'February 17, 2050 00:00:00' },
  { id: 29, nameEn: 'Mojtaba Khamenei', nameFa: 'مجتبی خامنه‌ای', dead: false },
  { id: 30, nameEn: 'Masoud Pezeshkian', nameFa: 'مسعود پزشکیان', dead: false },
  { id: 31, nameEn: 'M. Mohseni-Ejei', nameFa: 'غلامحسین محسنی اژه‌ای', dead: false },
  { id: 32, nameEn: 'M. Bagher Ghalibaf', nameFa: 'محمدباقر قالیباف', dead: false },
  { id: 33, nameEn: 'Saeed Jalili', nameFa: 'سعید جلیلی', dead: false },
  { id: 34, nameEn: 'Ali Akbar Velayati', nameFa: 'علی‌اکبر ولایتی', dead: false },
  { id: 35, nameEn: 'Mahmoud Ahmadinejad', nameFa: 'محمود احمدی‌نژاد', dead: false },
  { id: 36, nameEn: 'Hassan Rouhani', nameFa: 'حسن روحانی', dead: false },
  { id: 37, nameEn: 'Mohammad Javad Zarif', nameFa: 'محمدجواد ظریف', dead: false },
  { id: 38, nameEn: 'Sadeq Larijani', nameFa: 'صادق لاریجانی', dead: false },
  { id: 39, nameEn: 'Movahedi-Kermani', nameFa: 'موحدی کرمانی', dead: false },
  { id: 40, nameEn: 'Alireza Zakani', nameFa: 'علیرضا زاکانی', dead: false },
  { id: 41, nameEn: 'A. Ghazizadeh Hashemi', nameFa: 'امیرحسین قاضی‌زاده هاشمی', dead: false },
  { id: 42, nameEn: 'Mostafa Pourmohammadi', nameFa: 'مصطفی پورمحمدی', dead: false },
  { id: 43, nameEn: 'Abbas Araghchi', nameFa: 'عباس عراقچی', dead: false },
  { id: 44, nameEn: 'Abdolnaser Hemmati', nameFa: 'عبدالناصر همتی', dead: false },
  { id: 45, nameEn: 'Bizhan Zanganeh', nameFa: 'بیژن زنگنه', dead: false },
  { id: 46, nameEn: 'Ali Larijani', nameFa: 'علی لاریجانی', dead: false },
  { id: 47, nameEn: 'Mohammad Khatami', nameFa: 'محمد خاتمی', dead: false },
  { id: 48, nameEn: 'Mehdi Karroubi', nameFa: 'مهدی کروبی', dead: false },
  { id: 49, nameEn: 'Mir-Hossein Mousavi', nameFa: 'میرحسین موسوی', dead: false },
  { id: 50, nameEn: 'Ali Akbar Salehi', nameFa: 'علی‌اکبر صالحی', dead: false },
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
