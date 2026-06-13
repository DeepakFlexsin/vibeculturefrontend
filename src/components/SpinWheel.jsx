import React, { useState, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'

const SEGMENTS = [
  { label: '10% OFF', color: '#0d6b9f', textColor: '#ffffff' },
  { label: 'FREE SHIP', color: '#e8eef2', textColor: '#0d6b9f' },
  { label: '5% OFF', color: '#0d6b9f', textColor: '#ffffff' },
  { label: 'TRY AGAIN', color: '#f8f9fa', textColor: '#0d6b9f' },
  { label: '20% OFF', color: '#1e8bc3', textColor: '#ffffff' },
  { label: 'FREE TEES', color: '#e8eef2', textColor: '#0d6b9f' },
  { label: '15% OFF', color: '#0d6b9f', textColor: '#ffffff' },
  { label: 'MYSTERY', color: '#f8f9fa', textColor: '#1e8bc3' },
]

const TOTAL = SEGMENTS.length
const ARC = (2 * Math.PI) / TOTAL
const R = 130
const CX = 150
const CY = 150

function segmentPath(i) {
  const start = i * ARC - Math.PI / 2
  const end = start + ARC
  const x1 = CX + R * Math.cos(start)
  const y1 = CY + R * Math.sin(start)
  const x2 = CX + R * Math.cos(end)
  const y2 = CY + R * Math.sin(end)
  return `M${CX},${CY} L${x1},${y1} A${R},${R} 0 0,1 ${x2},${y2} Z`
}

const SpinWheel = () => {
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [rotation, setRotation] = useState(0)
  const [spinsLeft, setSpinsLeft] = useState(1)
  const controls = useAnimation()

  const spin = async () => {
    if (spinning || spinsLeft <= 0) return
    setResult(null)
    setSpinning(true)
    setSpinsLeft(s => s - 1)

    const winIndex = Math.floor(Math.random() * TOTAL)
    const segCenter = winIndex * (360 / TOTAL) + (360 / TOTAL) / 2
    const extra = 360 * 5 + (360 - segCenter)
    const newRot = rotation + extra

    await controls.start({
      rotate: newRot,
      transition: { duration: 4, ease: [0.17, 0.67, 0.35, 1] },
    })
    setRotation(newRot)
    setResult(SEGMENTS[winIndex])
    setSpinning(false)
  }

  return (
    <section className='py-20 px-4 sm:px-6 bg-white relative overflow-hidden'>
      {/* bg glow */}
      <div className='absolute inset-0 pointer-events-none'
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(13,107,159,0.07) 0%, transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='max-w-4xl mx-auto text-center'>

        <div className='inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-[#0d6b9f]/20'>
          <span className='text-[#c9a84c] text-xs tracking-widest uppercase'>🎰 Daily Reward</span>
        </div>

        <h2 className='font-serif text-4xl sm:text-5xl font-light text-white mb-2 italic'>
          Spin &amp; <span className='gold-text font-bold not-italic'>Win</span>
        </h2>
        <p className='text-white/40 text-sm mb-10 font-light'>One spin per visit — win discounts on dry fruits, spices & kitchen utensils!</p>

        <div className='flex flex-col lg:flex-row items-center justify-center gap-12'>
          {/* Wheel */}
          <div className='relative flex-shrink-0'>
            {/* Pointer */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20'>
              <div className='w-0 h-0 border-l-[10px] border-r-[10px] border-b-[22px] border-l-transparent border-r-transparent border-b-[#0d6b9f]
                drop-shadow-[0_0_8px_rgba(13,107,159,0.8)]' />
            </div>

            {/* Outer ring glow */}
            <div className='absolute inset-0 rounded-full teal-glow opacity-60 pointer-events-none' style={{ borderRadius: '50%' }} />

            <motion.svg animate={controls} width='300' height='300' viewBox='0 0 300 300'
              className='rounded-full cursor-pointer drop-shadow-2xl' onClick={spin}
              style={{ filter: 'drop-shadow(0 0 20px rgba(13,107,159,0.3))' }}>
              {SEGMENTS.map((seg, i) => {
                const mid = i * ARC - Math.PI / 2 + ARC / 2
                return (
                  <g key={i}>
                    <path d={segmentPath(i)} fill={seg.color} stroke='rgba(13,107,159,0.3)' strokeWidth='1' />
                    <text
                      x={CX + (R * 0.65) * Math.cos(mid)}
                      y={CY + (R * 0.65) * Math.sin(mid)}
                      textAnchor='middle' dominantBaseline='middle'
                      fill={seg.textColor} fontSize='9' fontWeight='700'
                      fontFamily='Outfit, sans-serif' letterSpacing='0.05em'
                      transform={`rotate(${(mid * 180) / Math.PI + 90}, ${CX + (R * 0.65) * Math.cos(mid)}, ${CY + (R * 0.65) * Math.sin(mid)})`}>
                      {seg.label}
                    </text>
                  </g>
                )
              })}
              {/* Center circle */}
              <circle cx={CX} cy={CY} r='22' fill='white' stroke='#0d6b9f' strokeWidth='2' />
              <text x={CX} y={CY} textAnchor='middle' dominantBaseline='middle' fill='#0d6b9f' fontSize='16'>✦</text>
            </motion.svg>
          </div>

          {/* Right panel */}
          <div className='flex flex-col items-center lg:items-start gap-6 max-w-xs'>
            {result ? (
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className='glass rounded-2xl p-6 border border-[#0d6b9f]/40 text-center w-full'>
                <div className='text-4xl mb-3'>🎉</div>
                <p className='text-gray-500 text-xs tracking-widest uppercase mb-1'>You won</p>
                <p className='teal-text font-bold text-2xl font-serif'>{result.label}</p>
                <p className='text-gray-600 text-xs mt-3'>Use code <span className='text-[#0d6b9f] font-mono'>SPIN{result.label.replace(/\s/g,'').toUpperCase()}</span> at checkout</p>
              </motion.div>
            ) : (
              <div className='glass rounded-2xl p-6 border border-[#0d6b9f]/15 text-center w-full'>
                <div className='text-4xl mb-3'>🎰</div>
                <p className='text-gray-700 text-sm'>Click the wheel or the button to spin!</p>
                <p className='text-gray-500 text-xs mt-2'>Win discounts up to 20% off</p>
              </div>
            )}

            <motion.button onClick={spin} disabled={spinning || spinsLeft <= 0}
              whileTap={{ scale: 0.96 }}
              className={`w-full py-4 rounded-2xl text-sm tracking-widest uppercase font-bold transition-all duration-300 ${
                spinsLeft > 0 && !spinning
                  ? 'btn-teal'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
              }`}>
              {spinning ? '🌀 Spinning...' : spinsLeft > 0 ? '🎰 Spin the Wheel!' : '✓ Spin Used Today'}
            </motion.button>

            <div className='flex gap-6 text-center'>
              {[['🎁', 'Win Discounts'], ['🔄', '1 Spin/Day'], ['⚡', 'Instant Reward']].map(([icon, txt]) => (
                <div key={txt}>
                  <div className='text-xl mb-1'>{icon}</div>
                  <p className='text-gray-600 text-[10px] tracking-wider uppercase'>{txt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default SpinWheel
