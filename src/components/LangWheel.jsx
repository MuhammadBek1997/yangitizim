import { useState, useRef } from 'react'

const LANGS = ['uz', 'ru', 'en']

// Har rank uchun vizual parametrlar (0=top/aktiv, 1=o'rta, 2=pastki)
const RANK = [
  { y: 0,  size: 32, opacity: 1,    bg: 'var(--accent)',  color: '#000', weight: 800, border: 'none' },
  { y: 40, size: 24, opacity: 0.6,  bg: 'var(--bg3)',     color: 'var(--text-s)', weight: 600, border: '1px solid var(--border2)' },
  { y: 70, size: 20, opacity: 0.35, bg: 'transparent',    color: 'var(--text-s)', weight: 600, border: '1px solid var(--border2)' },
]

export default function LangWheel({ lang, setLang }) {
  const [order, setOrder] = useState(() => {
    const i = LANGS.indexOf(lang)
    return i >= 0 ? [...LANGS.slice(i), ...LANGS.slice(0, i)] : [...LANGS]
  })

  const touchY = useRef(null)

  const select = (l) => {
    const idx = order.indexOf(l)
    if (idx === 0) return
    const next = [...order.slice(idx), ...order.slice(0, idx)]
    setOrder(next)
    setLang(next[0])
  }

  const swipe = (dir) => {
    setOrder(prev => {
      const next = dir > 0
        ? [...prev.slice(1), prev[0]]          // yuqoriga — keyingi
        : [prev[prev.length - 1], ...prev.slice(0, -1)] // pastga — oldingi
      setLang(next[0])
      return next
    })
  }

  return (
    <div
      className="lang-wheel"
      onTouchStart={e => { touchY.current = e.touches[0].clientY }}
      onTouchEnd={e => {
        if (touchY.current === null) return
        const dy = touchY.current - e.changedTouches[0].clientY
        touchY.current = null
        if (Math.abs(dy) > 18) swipe(dy > 0 ? 1 : -1)
      }}
    >
      {LANGS.map(l => {
        const rank = order.indexOf(l)
        const r    = RANK[rank]
        return (
          <button
            key={l}
            onClick={() => select(l)}
            style={{
              position:      'absolute',
              top:           0,
              left:          '50%',
              marginLeft:    `-${r.size / 2}px`,
              width:         r.size,
              height:        r.size,
              borderRadius:  '50%',
              transform:     `translateY(${r.y}px)`,
              opacity:       r.opacity,
              background:    r.bg,
              color:         r.color,
              fontSize:      Math.round(r.size * 0.32),
              fontWeight:    r.weight,
              border:        r.border,
              cursor:        rank === 0 ? 'default' : 'pointer',
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              letterSpacing: '0.5px',
              transition:    'all 0.42s cubic-bezier(0.34, 1.4, 0.64, 1)',
              userSelect:    'none',
              pointerEvents: rank === 0 ? 'none' : 'auto',
              boxShadow:     rank === 0 ? '0 0 12px var(--accent-glow)' : 'none',
            }}
          >
            {l.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}