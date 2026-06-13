import React, { useState, useEffect, useContext, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.5,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 3,
}))

const CATEGORIES = [
  {
    label: 'T-Shirts', icon: '👕', color: '#111111',
    items: ['Premium Cotton', 'Oversized Fit', 'Crew Neck', 'Graphic Tees'],
    tag: 'Best Seller', desc: 'Premium 240 GSM tees for everyday wear'
  },
  {
    label: 'Tank Tops', icon: '💪', color: '#222222',
    items: ['Gym Stringer', 'Classic Racer', 'Muscle Fit', 'Breathable'],
    tag: 'New Arrivals', desc: 'Breathable tank tops for active lifestyle'
  },
  {
    label: 'Gym Wear', icon: '🏋️', color: '#111111',
    items: ['Sleeveless Tees', 'Muscle Fit', 'Performance', 'Pro Series'],
    tag: 'Hot Deal', desc: 'Sleeveless gym tees for max performance'
  },
  {
    label: 'Jeans', icon: '👖', color: '#222222',
    items: ['Slim Fit', 'Regular Fit', 'Stretch Denim', 'Premium Wash'],
    tag: 'Trending', desc: 'Premium denim jeans for every occasion'
  },
]

const BRAND_LETTERS = ['V', 'I', 'B', 'E', 'C', 'U', 'L', 'T', 'U', 'R', 'E']

const HEADLINES = [
  { top: 'Premium Quality', bold: 'T-Shirts.', sub: 'Comfort. Style. Confidence.', badge: '👕 Best T-Shirts' },
  { top: 'Sleek', bold: 'Tank Tops.', sub: 'Perfect for Gym & Summer.', badge: '💪 Tank Collection' },
  { top: 'Elevate Your', bold: 'Gym Game.', sub: 'Performance. Comfort. Style.', badge: '🏋️ Sleeveless Tees' },
  { top: 'Premium', bold: 'Jeans.', sub: 'Denim That Moves With You.', badge: '👖 Denim Collection' },
  { top: 'Wear What', bold: 'Feels Right.', sub: 'Premium Quality Always.', badge: '✦ Best Sellers' },
  { top: 'Upgrade Your', bold: 'Wardrobe.', sub: 'Comfort Meets Style.', badge: '🎨 New Collections' },
]

const Hero = () => {
  const [bannerData, setBannerData] = useState(null)
  const { backendUrl, navigate } = useContext(ShopContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [activeCat, setActiveCat] = useState(0)
  const [activeItem, setActiveItem] = useState(0)
  const [headlineIdx, setHeadlineIdx] = useState(0)
  const [liveCount, setLiveCount] = useState(Math.floor(Math.random() * 80) + 120)
  const [soldPct, setSoldPct] = useState(Math.floor(Math.random() * 20) + 55)
  const [pulseStep, setPulseStep] = useState(0)

  useEffect(() => {
    axios.get(backendUrl + '/api/banner/get')
      .then(r => r.data.success && setBannerData(r.data.data))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const t = setInterval(() => setHeadlineIdx(i => (i + 1) % HEADLINES.length), 3500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setLiveCount(n => n + Math.floor(Math.random() * 3) - 1)
      setSoldPct(p => Math.min(p + (Math.random() > 0.7 ? 1 : 0), 94))
      setPulseStep(s => (s + 1) % 3)
    }, 2800)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setActiveCat(c => (c + 1) % CATEGORIES.length)
      setActiveItem(0)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const cat = CATEGORIES[activeCat]

  return (
    <>
      <section ref={ref} className='relative min-h-screen overflow-hidden bg-white flex flex-col'>

        {/* Background layers */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
            transition={{ duration: 12, repeat: Infinity }}
            className='absolute -top-60 -right-60 w-[800px] h-[800px] rounded-full'
            style={{ background: 'radial-gradient(circle, rgba(17,17,17,0.12) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1.1, 1, 1.1], opacity: [0.02, 0.05, 0.02] }}
            transition={{ duration: 14, repeat: Infinity, delay: 4 }}
            className='absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full'
            style={{ background: 'radial-gradient(circle, rgba(17,17,17,0.08) 0%, transparent 65%)' }} />
        </div>

        {/* Floating particles */}
        <div className='absolute inset-0 pointer-events-none'>
          {PARTICLES.map(p => (
            <motion.div key={p.id}
              className='absolute rounded-full bg-gray-200'
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              animate={{ y: [0, -30, 0], opacity: [0, 0.4, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </div>

        {/* Main content */}
        <motion.div style={{ y, opacity }} className='relative z-10 flex-1 flex items-center w-full px-6 sm:px-12 lg:px-20 py-16'>
          <div className='max-w-7xl mx-auto w-full'>

            {/* Brand name animated */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className='flex justify-center lg:justify-start gap-0.5 sm:gap-1 mb-6'>
              {BRAND_LETTERS.map((letter, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: -30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.1 }}
                  className='font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 cursor-default select-none'
                  style={{ display: 'inline-block' }}>
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <div className='flex flex-col lg:flex-row items-start gap-12 lg:gap-16'>

              {/* Left column */}
              <div className='flex-1 text-center lg:text-left'>

                {/* Live badge */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                  className='inline-flex items-center gap-3 bg-gray-50 rounded-full px-5 py-2.5 mb-6 border border-gray-200'>
                  <span className='relative flex w-2 h-2'>
                    <span className='absolute inset-0 bg-gray-800 rounded-full animate-ping opacity-75' />
                    <span className='relative block w-2 h-2 bg-gray-800 rounded-full' />
                  </span>
                  <AnimatePresence mode='wait'>
                    <motion.span key={headlineIdx}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className='text-gray-700 text-xs tracking-[0.2em] uppercase font-medium'>
                      {HEADLINES[headlineIdx].badge}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>

                {/* Tagline */}
                <AnimatePresence mode='wait'>
                  <motion.div key={headlineIdx}
                    initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.5 }}>
                    <p className='font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-gray-500 leading-tight mb-2 italic'>
                      {HEADLINES[headlineIdx].top}
                    </p>
                    <p className='font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-2 text-gray-900'>
                      {HEADLINES[headlineIdx].bold}
                    </p>
                    <p className='font-serif text-xl sm:text-2xl lg:text-3xl font-light text-gray-500 leading-tight italic'>
                      {HEADLINES[headlineIdx].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className='text-gray-500 text-base mt-8 mb-10 max-w-sm mx-auto lg:mx-0 leading-relaxed font-light'>
                  Discover premium quality T-shirts, gym tank tops & jeans designed for comfort and style. 240 GSM fabric. Built to last.
                </motion.p>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                  className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12'>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/collection')}
                    className='px-10 py-4 rounded-lg text-sm tracking-widest uppercase font-bold bg-gray-900 text-white shadow-lg hover:shadow-xl hover:bg-black transition-all duration-300'>
                    Shop Now ✦
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/collection')}
                    className='px-10 py-4 rounded-lg text-sm tracking-widest uppercase font-bold bg-white text-gray-900 border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300'>
                    Browse Collections
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                  className='flex gap-12 justify-center lg:justify-start'>
                  {[['500+', 'Products'], ['50K+', 'Happy Customers'], ['4.8★', 'Rating']].map(([num, label]) => (
                    <div key={label} className='text-center lg:text-left'>
                      <div className='font-serif text-3xl font-bold text-gray-900'>{num}</div>
                      <div className='text-gray-400 text-[10px] tracking-widest uppercase mt-1'>{label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right column — Product Explorer */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
                className='w-full lg:w-[420px] flex-shrink-0'>

                <div className='bg-white rounded-2xl border border-gray-200 overflow-hidden'
                  style={{ boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>

                  {/* Premium Drop Header */}
                  <div className='relative overflow-hidden rounded-t-2xl bg-gray-900 px-5 pt-4 pb-4'>
                    {/* subtle grid pattern */}
                    <div className='absolute inset-0 opacity-[0.04]'
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 20px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 20px)' }} />

                    {/* Top row — live pill + discount */}
                    <div className='flex items-center justify-between mb-3'>
                      <div className='flex items-center gap-2'>
                        <span className='relative flex w-2 h-2'>
                          <span className='absolute inset-0 bg-green-400 rounded-full animate-ping opacity-80' />
                          <span className='relative block w-2 h-2 bg-green-400 rounded-full' />
                        </span>
                        <AnimatePresence mode='wait'>
                          <motion.span key={liveCount}
                            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                            className='text-green-400 text-[10px] font-bold tracking-widest uppercase'>
                            {liveCount} people shopping now
                          </motion.span>
                        </AnimatePresence>
                      </div>
                      <span className='bg-white/10 text-white text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider border border-white/20'>UP TO 30% OFF</span>
                    </div>

                    {/* GSM Quality Bar */}
                    <div className='mb-3'>
                      <div className='flex items-center justify-between mb-1'>
                        <span className='text-white/60 text-[9px] tracking-[0.2em] uppercase'>240 GSM Fabric Quality</span>
                        <span className='text-white text-[10px] font-bold'>Premium ✦</span>
                      </div>
                      <div className='h-1.5 bg-white/10 rounded-full overflow-hidden'>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '92%' }}
                          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.8 }}
                          className='h-full rounded-full'
                          style={{ background: 'linear-gradient(90deg, #6ee7b7, #34d399, #10b981)' }}
                        />
                      </div>
                    </div>

                    {/* Selling fast bar */}
                    <div className='mb-3'>
                      <div className='flex items-center justify-between mb-1'>
                        <span className='text-white/60 text-[9px] tracking-[0.2em] uppercase'>Selling Fast</span>
                        <AnimatePresence mode='wait'>
                          <motion.span key={soldPct}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className='text-amber-400 text-[10px] font-bold'>{soldPct}% claimed</motion.span>
                        </AnimatePresence>
                      </div>
                      <div className='h-1.5 bg-white/10 rounded-full overflow-hidden'>
                        <motion.div
                          animate={{ width: `${soldPct}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className='h-full rounded-full'
                          style={{ background: 'linear-gradient(90deg, #fbbf24, #f59e0b, #d97706)' }}
                        />
                      </div>
                    </div>

                    {/* Style confidence meter */}
                    <div className='flex items-center gap-3'>
                      <span className='text-white/50 text-[9px] tracking-widest uppercase whitespace-nowrap'>Style Score</span>
                      <div className='flex gap-1 flex-1'>
                        {[...Array(5)].map((_, i) => (
                          <motion.div key={i}
                            animate={{ scaleY: pulseStep === i % 3 ? 1.4 : 1, opacity: pulseStep === i % 3 ? 1 : 0.5 }}
                            transition={{ duration: 0.4 }}
                            className='flex-1 h-3 rounded-sm'
                            style={{ background: i < 4 ? '#ffffff' : '#ffffff33' }}
                          />
                        ))}
                      </div>
                      <span className='text-white text-[10px] font-black'>9.4/10</span>
                    </div>
                  </div>

                  {/* Category tabs */}
                  <div className='flex gap-1 px-4 pt-4'>
                    {CATEGORIES.map((c, i) => (
                      <motion.button key={i} whileTap={{ scale: 0.95 }}
                        onClick={() => { setActiveCat(i); setActiveItem(0) }}
                        className='flex-1 flex flex-col items-center gap-1 py-2 rounded-lg text-[10px] tracking-wider uppercase transition-all duration-300 border'
                        style={{
                          background: activeCat === i ? '#111111' : '#ffffff',
                          borderColor: activeCat === i ? '#111111' : '#e5e7eb',
                          color: activeCat === i ? '#ffffff' : '#9ca3af',
                        }}>
                        <span className='text-base'>{c.icon}</span>
                        {c.label}
                      </motion.button>
                    ))}
                  </div>

                  {/* Active category content */}
                  <AnimatePresence mode='wait'>
                    <motion.div key={activeCat}
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className='px-5 py-4'>

                      <div className='flex items-center gap-2 mb-3'>
                        <span className='text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wider bg-gray-100 text-gray-700 border border-gray-200'>
                          ✦ {cat.tag}
                        </span>
                        <span className='text-gray-400 text-[10px]'>{cat.desc}</span>
                      </div>

                      <div className='grid grid-cols-2 gap-2 mb-4'>
                        {cat.items.map((item, i) => (
                          <motion.button key={i} whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveItem(i)}
                            className='p-3 rounded-lg text-left transition-all duration-200 border'
                            style={{
                              background: activeItem === i ? '#111111' : '#ffffff',
                              borderColor: activeItem === i ? '#111111' : '#e5e7eb',
                            }}>
                            <div className='text-xl mb-1'>{cat.icon}</div>
                            <div className={`text-xs font-medium leading-tight ${activeItem === i ? 'text-white' : 'text-gray-800'}`}>
                              {item}
                            </div>
                            {activeItem === i && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className='text-[9px] mt-1 font-bold text-gray-300'>
                                ✓ Selected
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>

                      <div className='flex items-center gap-2 p-3 rounded-lg border mb-3 bg-gray-50 border-gray-200'>
                        <span className='text-lg'>{cat.icon}</span>
                        <div className='flex-1 min-w-0'>
                          <div className='text-xs font-semibold text-gray-900 truncate'>{cat.items[activeItem]}</div>
                          <div className='text-[10px] text-gray-400'>VibeCulture Premium Quality</div>
                        </div>
                        <div className='text-[10px] font-black px-2 py-1 rounded-lg bg-red-50 text-red-600 border border-red-100'>30% OFF</div>
                      </div>

                      <div className='flex gap-2'>
                        <motion.button whileTap={{ scale: 0.96 }}
                          onClick={() => navigate('/collection')}
                          className='flex-1 py-3 rounded-lg text-xs tracking-widest uppercase font-bold transition-all bg-gray-900 text-white hover:bg-black'>
                          Shop Now ✦
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.96 }}
                          onClick={() => navigate('/collection')}
                          className='px-4 py-3 rounded-lg border border-gray-200 text-xs tracking-wider uppercase transition-all text-gray-700 hover:bg-gray-50'>
                          All →
                        </motion.button>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className='px-6 pb-4 flex items-center justify-center gap-4 text-[10px] text-gray-400 tracking-wider uppercase'>
                    {['Free Shipping', '7-Day Returns', 'Secure Pay'].map((t, i) => (
                      <React.Fragment key={t}>
                        {i > 0 && <span>•</span>}
                        <span>{t}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {bannerData?.images?.[0] && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className='mt-4 relative group rounded-xl overflow-hidden cursor-pointer'
                    onClick={() => navigate('/collection')}>
                    <img src={bannerData.images[0]} alt='Collection'
                      className='w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500' />
                    <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent flex items-center px-5'>
                      <div>
                        <p className='text-white text-xs font-bold tracking-widest uppercase'>Featured Drop</p>
                        <p className='text-white/80 text-[10px] mt-0.5'>Shop the collection →</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className='relative z-10 pb-8 flex flex-col items-center gap-2'>
          <span className='text-gray-400 text-[10px] tracking-widest uppercase'>Scroll to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className='w-[1px] h-8 bg-gradient-to-b from-gray-900 to-transparent' />
        </motion.div>
      </section>

      {/* Marquee ticker */}
      <div className='bg-gray-900 text-white py-3 overflow-hidden relative'>
        <div className='marquee-track flex whitespace-nowrap'>
          {[0, 1].map(ri => (
            <div key={ri} className='flex'>
              {['✦ FREE SHIPPING ABOVE ₹499', '⚡ FLASH SALE — UP TO 30% OFF', '👕 PREMIUM T-SHIRTS 240 GSM', '💪 GYM TANK TOPS', '🏋️ SLEEVELESS GYM WEAR', '👖 PREMIUM DENIM JEANS', '🎯 PERFECT FIT GUARANTEED', '🔄 EASY 7-DAY RETURNS'].map((t, i) => (
                <span key={i} className='text-white text-xs font-semibold tracking-widest uppercase px-8'>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Hero
