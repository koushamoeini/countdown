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
  { id: 33, nameEn: 'Saeed Jalili', nameFa: 'سید جلیلی', dead: false },
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

// قبلی را پاک کنید و این را بگذارید:
const API_URL = 'https://mortezamirkoohi.pythonanywhere.com/api'

function App() {
  const [selectedTarget, setSelectedTarget] = useState(targets[0])
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null)
  const [globalBets, setGlobalBets] = useState([])
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [resolvedStatus, setResolvedStatus] = useState({})
  const [betAmount, setBetAmount] = useState(100)

  // Fetch Global State (Bets & Outcomes)
  const fetchState = async () => {
    try {
      const url = currentUser 
        ? `${API_URL}/state/?username=${currentUser.username}`
        : `${API_URL}/state/`
      
      const res = await fetch(url)
      const data = await res.json()
      setGlobalBets(data.history)
      setResolvedStatus(data.statuses)
      
      // Update balance if logged in
      if (currentUser && data.balance !== null) {
        const updatedUser = { ...currentUser, balance: data.balance }
        setCurrentUser(updatedUser)
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
      }
    } catch (err) {
      console.error("Failed to fetch state", err)
    }
  }

  // Poll for updates every 3 seconds
  useEffect(() => {
    fetchState()
    const interval = setInterval(fetchState, 3000)
    return () => clearInterval(interval)
  }, [currentUser])

  // Get effective dead status
  const isTargetDead = (target) => {
    if (resolvedStatus[target.id] !== undefined) return resolvedStatus[target.id]
    return target.dead
  }

  // Sorting targets: Alive first, then Dead
  const sortedTargets = useMemo(() => {
    return [...targets].sort((a, b) => {
      const aDead = isTargetDead(a)
      const bDead = isTargetDead(b)
      if (aDead === bDead) return 0
      return aDead ? 1 : -1
    })
  }, [resolvedStatus])

  // New Betting Deadline: 30 days from now (static for demo)
  const bettingDeadline = new Date('January 31, 2026 00:00:00').getTime()

  const handleLogin = async (e) => {
    e.preventDefault()
    const { username, password } = loginData
    if (!username || !password) return alert('Fill all fields')

    try {
      const res = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        setCurrentUser(data)
        localStorage.setItem('currentUser', JSON.stringify(data))
      } else {
        alert(data.error || 'Login failed')
      }
    } catch (err) {
      alert('Backend connection failed')
    }
    setLoginData({ username: '', password: '' })
  }

  const handleBet = async (type) => {
    if (!currentUser) return alert('Please Login first')
    if (currentUser.balance < betAmount) return alert('Not enough money!')
    
    try {
      const res = await fetch(`${API_URL}/bet/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: currentUser.username,
          targetId: selectedTarget.id,
          targetName: selectedTarget.nameEn,
          amount: betAmount,
          type: type
        })
      })
      const data = await res.json()
      if (res.ok) {
        const updatedUser = { ...currentUser, balance: data.balance }
        setCurrentUser(updatedUser)
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        fetchState()
      } else {
        alert(data.error || 'Bet failed')
      }
    } catch (err) {
      alert('Backend connection failed')
    }
  }

  const settleAllBets = async (targetId, outcome) => {
    try {
      const res = await fetch(`${API_URL}/settle/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          admin: 'kousha',
          targetId: targetId,
          outcome: outcome
        })
      })
      if (res.ok) {
        fetchState()
        // Refresh to update balances for users
        setTimeout(() => window.location.reload(), 500)
      }
    } catch (err) {
      alert('Settlement failed')
    }
  }

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date().getTime()
      const isDead = isTargetDead(selectedTarget)
      
      const difference = isDead ? 0 : bettingDeadline - now

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    setTimeLeft(calculateTimeLeft())
    return () => clearInterval(timer)
  }, [selectedTarget, resolvedStatus])

  const isEliminated = isTargetDead(selectedTarget)
  const isAdmin = currentUser?.username === 'kousha'

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-header">TARGETS</div>
        <div className="targets-list">
          {sortedTargets.map(t => {
            const dead = isTargetDead(t)
            return (
              <button 
                key={t.id} 
                className={`target-btn ${selectedTarget.id === t.id ? 'active' : ''} ${dead ? 'dead' : ''}`}
                onClick={() => setSelectedTarget(t)}
              >
                <span className="target-name">{t.nameEn}</span>
                {dead && <span className="status-tag">DONE</span>}
              </button>
            )
          })}
        </div>
        <div className="creator-credit-sidebar">
          <span className="credit-text">Created by Donald Trump</span>
        </div>
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
        
        {isAdmin && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
            <button className="settle-btn" onClick={() => settleAllBets(selectedTarget.id, true)}>Confirm DEAD</button>
            <button className="settle-btn" style={{background: '#4caf50'}} onClick={() => settleAllBets(selectedTarget.id, false)}>Confirm ALIVE</button>
          </div>
        )}
      </div>

      <div className="betting-sidebar">
        {!currentUser ? (
          <div className="bet-card" style={{ marginTop: 0 }}>
            <h3>Login to Bet</h3>
            <form className="login-form-side" onSubmit={handleLogin}>
              <input 
                placeholder="Username" 
                value={loginData.username}
                onChange={e => setLoginData({...loginData, username: e.target.value})}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={loginData.password}
                onChange={e => setLoginData({...loginData, password: e.target.value})}
              />
              <button type="submit" className="login-btn-side">Join Game</button>
            </form>
          </div>
        ) : (
          <div className="balance-box">
            <div className="balance-name">{currentUser.username}</div>
            <div className="balance-amount">${currentUser.balance.toLocaleString()}</div>
            <button className="logout-btn-side" onClick={() => {
              setCurrentUser(null)
              localStorage.removeItem('currentUser')
            }}>Logout / Switch Account</button>
          </div>
        )}

        {currentUser && !isEliminated && (
          <div className="bet-card">
            <h3 style={{fontSize: '0.9rem'}}>Bet on {selectedTarget.nameEn}</h3>
            <input 
              type="number" 
              className="bet-input" 
              value={betAmount} 
              onChange={(e) => setBetAmount(Number(e.target.value))}
            />
            <div className="bet-btn-group">
              <button className="bet-btn btn-die" onClick={() => handleBet('die')}>DIE (10x)</button>
              <button className="bet-btn btn-live" onClick={() => handleBet('live')}>LIVE (1.6x)</button>
            </div>
          </div>
        )}

        <div className="bet-history">
          <div className="sidebar-header" style={{fontSize: '0.7rem', opacity: 0.6, marginBottom: '10px'}}>GLOBAL BETS</div>
          {globalBets.slice(0, 100).map(bet => (
            <div key={bet.id} className="history-item-global">
              <span className="history-username">{bet.username}</span> 
              <span style={{color: '#888'}}> bet </span>
              <span className="history-amount">${bet.amount.toLocaleString()}</span> 
              <span style={{color: '#888'}}> on </span>
              <span style={{color: bet.type === 'die' ? '#ff4b2b' : '#4caf50', fontWeight: 'bold'}}>
                {bet.type === 'die' ? 'DIE' : 'LIVE'}
              </span>
              <span style={{color: '#888'}}> for </span>
              <span className="history-target">{bet.targetName}</span>
            </div>
          ))}
        </div>
      </div>

      {isEliminated && (
        <div className="eliminated-overlay animate-gta">
          <div className="gta-bar">
            <span>ELIMINATED</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
