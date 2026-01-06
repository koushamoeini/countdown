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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [balance, setBalance] = useState(() => Number(localStorage.getItem('balance')) || 10000)
  const [bets, setBets] = useState(() => JSON.parse(localStorage.getItem('bets')) || [])
  const [betAmount, setBetAmount] = useState(100)
  const [adminUser, setAdminUser] = useState(() => JSON.parse(localStorage.getItem('adminUser')) || null)
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [resolvedStatus, setResolvedStatus] = useState(() => JSON.parse(localStorage.getItem('resolvedStatus')) || {})

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('balance', balance.toString())
    localStorage.setItem('bets', JSON.stringify(bets))
    localStorage.setItem('adminUser', JSON.stringify(adminUser))
    localStorage.setItem('resolvedStatus', JSON.stringify(resolvedStatus))
  }, [balance, bets, adminUser, resolvedStatus])

  // Get effective dead status (original or admin override)
  const isTargetDead = (target) => {
    if (resolvedStatus[target.id] !== undefined) return resolvedStatus[target.id]
    return target.dead
  }

  // Storage for random deadlines so they remain consistent for the session
  const deadlines = useMemo(() => {
    const map = {}
    // We use a FIXED reference date instead of "now" to ensure consistency across refreshes
    const baseDate = new Date('January 1, 2026 00:00:00').getTime()
    const maxDate = new Date('February 11, 2026 00:00:00').getTime()
    const minDiff = 2 * 24 * 60 * 60 * 1000 // 2 days

    targets.forEach(t => {
      const isDead = isTargetDead(t)
      if (isDead) {
        map[t.id] = baseDate - 1000 // Already passed relative to reference
      } else if (t.fixedDate) {
        map[t.id] = new Date(t.fixedDate).getTime()
      } else {
        // Deterministic random date based on ID and the fixed baseDate
        const seed = t.id * 86421
        const pseudoRandom = (Math.sin(seed) + 1) / 2
        const range = maxDate - (baseDate + minDiff)
        map[t.id] = baseDate + minDiff + (pseudoRandom * range)
      }
    })
    return map
  }, [resolvedStatus])

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calculateTimeLeft() {
      const now = new Date().getTime()
      const deadline = deadlines[selectedTarget.id]
      const difference = deadline - now
      const isDead = isTargetDead(selectedTarget)

      if (difference > 0 && !isDead) {
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

    setTimeLeft(calculateTimeLeft())
    return () => clearInterval(timer)
  }, [selectedTarget, deadlines, resolvedStatus])

  const handleBet = (type) => {
    if (balance < betAmount) return alert('Not enough money!')
    if (betAmount <= 0) return alert('Invalid amount')
    
    const newBet = {
      id: Date.now(),
      targetId: selectedTarget.id,
      targetName: selectedTarget.nameEn,
      amount: betAmount,
      type: type, // 'die' or 'live'
      settled: false
    }

    setBalance(prev => prev - betAmount)
    setBets(prev => [newBet, ...prev])
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginData.username === 'kousha' && loginData.password === '1234') {
      setAdminUser({ username: 'kousha' })
      setLoginData({ username: '', password: '' })
    } else {
      alert('Wrong credentials')
    }
  }

  const settleAllBets = (targetId, outcome) => {
    // outcome: true (dead) or false (alive)
    setResolvedStatus(prev => ({ ...prev, [targetId]: outcome }))
    
    setBets(currentBets => {
      let winTotal = 0
      const updated = currentBets.map(bet => {
        if (bet.targetId === targetId && !bet.settled) {
          const won = (bet.type === 'die' && outcome === true) || (bet.type === 'live' && outcome === false)
          const multiplier = bet.type === 'die' ? 10 : 1.6
          if (won) {
            winTotal += bet.amount * multiplier
          }
          return { ...bet, settled: true, won }
        }
        return bet
      })
      if (winTotal > 0) setBalance(prev => prev + winTotal)
      return updated
    })
  }

  const isEliminated = isTargetDead(selectedTarget) || (deadlines[selectedTarget.id] <= new Date().getTime())

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-header">TARGETS</div>
        <div className="targets-list">
          {targets.map(t => {
            const dead = isTargetDead(t)
            const countdownEnded = deadlines[t.id] <= new Date().getTime()
            const eliminated = dead || countdownEnded
            
            return (
              <button 
                key={t.id} 
                className={`target-btn ${selectedTarget.id === t.id ? 'active' : ''} ${eliminated ? 'dead' : ''}`}
                onClick={() => setSelectedTarget(t)}
              >
                <span className="target-name">{t.nameEn}</span>
                {eliminated && <span className="status-tag">DONE</span>}
              </button>
            )
          })}
        </div>
        <div className="creator-credit-sidebar">
          <span className="credit-text">Created by Soheil Elahi</span>
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
        <h1 className="title-farsi">مانده به گاییده شدن {selectedTarget.nameFa}</h1>
        
        {adminUser && (
          <div style={{ marginTop: '2rem', display: 'flex', gap: '10px' }}>
            <button className="settle-btn" onClick={() => settleAllBets(selectedTarget.id, true)}>Confirm DEAD</button>
            <button className="settle-btn" style={{background: '#4caf50'}} onClick={() => settleAllBets(selectedTarget.id, false)}>Confirm ALIVE</button>
          </div>
        )}
      </div>

      <div className="betting-sidebar">
        <div className="balance-box">
          <div className="balance-title">Your Balance</div>
          <div className="balance-amount">${balance.toLocaleString()}</div>
        </div>

        {!isEliminated && (
          <div className="bet-card">
            <h3>Place Bet on {selectedTarget.nameEn}</h3>
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
          <div className="sidebar-header" style={{fontSize: '0.8rem', marginBottom: '10px'}}>BET HISTORY</div>
          {bets.slice(0, 5).map(bet => (
            <div key={bet.id} className={`history-item ${bet.settled ? (bet.won ? 'won' : 'lost') : ''}`}>
              {bet.targetName}: ${bet.amount} on {bet.type.toUpperCase()}
              {bet.settled && <span> - {bet.won ? 'WON' : 'LOST'}</span>}
            </div>
          ))}
        </div>

        <div className="admin-section">
          {adminUser ? (
            <div>
              <p style={{fontSize: '0.7rem'}}>Logged in: {adminUser.username}</p>
              <button className="login-btn" onClick={() => setAdminUser(null)}>Logout</button>
            </div>
          ) : (
            <form className="login-form" onSubmit={handleLogin}>
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
              <button className="login-btn" type="submit">Admin Login</button>
            </form>
          )}
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
