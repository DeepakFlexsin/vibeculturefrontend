import React, { useState, useEffect, useContext, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import axios from 'axios'

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1.5,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 3,
}))

// Kitchen Combo Builder game data
const CATEGORIES = [
  {
    label: 'Kitchen', icon: '🍳', color: '#c9a84c',
    items: ['Non-stick Pan', 'Glass Dispenser', 'Kadai Set', 'Pressure Cooker'],
    tag: 'Best Seller', desc: 'Premium cookware for every kitchen'
  },
  {
    label: 'Dry Fruits', icon: '🥜', color: '#10b981',
    items: ['Premium Cashews', 'Almonds 500g', 'Mixed Nuts', 'Pistachios'],
    tag: 'Fresh Stock', desc: 'Pure & natural, sourced directly'
  },
  {
    label: 'Spices', icon: '🌶️', color: '#f97316',
    items: ['Saffron Premium', 'Cardamom', 'Black Pepper', 'Turmeric Pure'],
    tag: 'Hand Picked', desc: 'Authentic flavours from the source'
  },
  {
    label: 'Gifting', icon: '🎁', color: '#8b5cf6',
    items: ['Dry Fruit Box', 'Kitchen Hamper', 'Spice Collection', 'Wellness Kit'],
    tag: 'Trending', desc: 'Curated gift sets for every occasion'
  },
]

const BRAND_LETTERS = ['K', 'R', 'I', 'V', 'A', 'N', 'T', 'E']

const HEADLINES = [
  { top: 'Cook with', bold: 'Passion & Quality.', sub: 'Every. Single. Meal.', badge: '🍳 Kitchen Essentials' },
  { top: 'Snack on', bold: 'Pure & Premium.', sub: 'Nature. In Every Bite.', badge: '🥜 Dry Fruits & Nuts' },
  { top: 'Spice up', bold: 'Every Dish.', sub: 'Bold. Fresh. Authentic.', badge: '🌶️ Spices & Masalas' },
  { top: 'Style your', bold: 'Home & Kitchen.', sub: 'Elegant. Functional. Yours.', badge: '✨ Premium Lifestyle' },
  { top: 'Gift someone', bold: 'Something Special.', sub: 'Curated. Thoughtful. Loved.', badge: '🎁 Gift Collections' },
  { top: 'Live', bold: 'Healthy & Happy.', sub: 'Wellness. Starts Here.', badge: '💚 Health Essentials' },
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
  const [seconds, setSeconds] = useState(Math.floor(Math.random() * 3600) + 1800)

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
    const t = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      setActiveCat(c => (c + 1) % CATEGORIES.length)
      setActiveItem(0)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const secs = String(seconds % 60).padStart(2, '0')
  const cat = CATEGORIES[activeCat]

  return (
    <>
      <section ref={ref} className='relative min-h-screen overflow-hidden bg-[#0a0a0f] flex flex-col'>

        {/* ── Background layers ── */}
        <div className='absolute inset-0 pointer-events-none overflow-hidden'>
          {/* Large orbs */}
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 9, repeat: Infinity }}
            className='absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full'
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 65%)' }} />
          <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 11, repeat: Infinity, delay: 3 }}
            className='absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full'
            style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.25) 0%, transparent 65%)' }} />
          {/* Grid lines */}
          <div className='absolute inset-0 opacity-[0.04]'
            style={{ backgroundImage: 'linear-gradient(rgba(201,168,76,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,1) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
          {/* Diagonal stripes */}
          <div className='absolute inset-0 stripe-bg opacity-40' />
        </div>

        {/* ── Floating particles ── */}
        <div className='absolute inset-0 pointer-events-none'>
          {PARTICLES.map(p => (
            <motion.div key={p.id}
              className='absolute rounded-full bg-[#c9a84c]'
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
              animate={{ y: [0, -40, 0], opacity: [0, 0.9, 0] }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }} />
          ))}
        </div>

        {/* ── Main content ── */}
        <motion.div style={{ y, opacity }} className='relative z-10 flex-1 flex items-center w-full px-6 sm:px-12 lg:px-20 py-16'>
          <div className='max-w-7xl mx-auto w-full'>

            {/* ── Brand name animated ── */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}
              className='flex justify-center lg:justify-start gap-1 sm:gap-2 mb-6'>
              {BRAND_LETTERS.map((letter, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: -40, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.2, color: '#f0d080' }}
                  className='font-serif text-5xl sm:text-6xl lg:text-7xl font-bold gold-text cursor-default select-none'
                  style={{ display: 'inline-block' }}>
                  {letter}
                </motion.span>
              ))}
            </motion.div>

            <div className='flex flex-col lg:flex-row items-start gap-12 lg:gap-16'>

              {/* ── Left column ── */}
              <div className='flex-1 text-center lg:text-left'>

                {/* Live badge */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}
                  className='inline-flex items-center gap-3 glass rounded-full px-5 py-2.5 mb-6 border border-[#c9a84c]/20'>
                  <span className='relative flex w-2 h-2'>
                    <span className='absolute inset-0 bg-[#c9a84c] rounded-full animate-ping opacity-75' />
                    <span className='relative block w-2 h-2 bg-[#c9a84c] rounded-full' />
                  </span>
                  <AnimatePresence mode='wait'>
                    <motion.span key={headlineIdx}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className='text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-medium'>
                      {HEADLINES[headlineIdx].badge}
                    </motion.span>
                  </AnimatePresence>
                </motion.div>

                {/* Tagline */}
                <AnimatePresence mode='wait'>
                  <motion.div key={headlineIdx}
                    initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -25 }}
                    transition={{ duration: 0.5 }}>
                    <p className='font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-2 italic'>
                      {HEADLINES[headlineIdx].top}
                    </p>
                    <p className='font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-2'>
                      <span className='gold-text'>{HEADLINES[headlineIdx].bold}</span>
                    </p>
                    <p className='font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-white/40 leading-tight italic'>
                      {HEADLINES[headlineIdx].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                  className='text-white/45 text-base mt-6 mb-8 max-w-sm mx-auto lg:mx-0 leading-relaxed font-light'>
                  Premium kitchen utensils, pure dry fruits & hand-picked spices — delivered fresh across India.
                </motion.p>

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
                  className='flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10'>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/collection')}
                    className='btn-gold px-10 py-4 rounded-full text-sm tracking-widest uppercase shadow-lg'>
                    Shop Now ✦
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => navigate('/collection')}
                    className='glass text-white/70 hover:text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 border border-[#c9a84c]/20 hover:border-[#c9a84c]/50'>
                    Browse Products
                  </motion.button>
                </motion.div>

                {/* Stats */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
                  className='flex gap-8 justify-center lg:justify-start'>
                  {[['300+', 'Products'], ['10K+', 'Happy Customers'], ['4.9★', 'Rating']].map(([num, label]) => (
                    <div key={label} className='text-center lg:text-left'>
                      <div className='font-serif text-2xl font-bold gold-text'>{num}</div>
                      <div className='text-white/35 text-[10px] tracking-widest uppercase mt-0.5'>{label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* ── Right column — Product Explorer ── */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
                className='w-full lg:w-[420px] flex-shrink-0'>

                <div className='glass rounded-3xl border border-[#c9a84c]/20 overflow-hidden'
                  style={{ boxShadow: '0 0 60px rgba(201,168,76,0.08), 0 0 0 1px rgba(201,168,76,0.1)' }}>

                  {/* Deal timer header */}
                  <div className='px-6 pt-5 pb-4 border-b border-[#c9a84c]/10 flex items-center justify-between'>
                    <div>
                      <div className='flex items-center gap-2 mb-0.5'>
                        <span className='relative flex w-2 h-2'>
                          <span className='absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75' />
                          <span className='relative block w-2 h-2 bg-red-400 rounded-full' />
                        </span>
                        <span className='text-red-400 text-[10px] tracking-widest uppercase font-bold'>Flash Deal Ends In</span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        {[hrs, mins, secs].map((v, i) => (
                          <React.Fragment key={i}>
                            <div className='bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-lg px-2.5 py-1 text-center'>
                              <span className='font-serif text-lg font-bold gold-text leading-none'>{v}</span>
                            </div>
                            {i < 2 && <span className='gold-text font-bold text-lg'>:</span>}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-white/30 text-[9px] tracking-widest uppercase mb-1'>Up to</div>
                      <div className='font-serif text-2xl font-bold text-red-400'>20% OFF</div>
                    </div>
                  </div>

                  {/* Category tabs */}
                  <div className='flex gap-1 px-4 pt-4'>
                    {CATEGORIES.map((c, i) => (
                      <motion.button key={i} whileTap={{ scale: 0.95 }}
                        onClick={() => { setActiveCat(i); setActiveItem(0) }}
                        className='flex-1 flex flex-col items-center gap-1 py-2 rounded-xl text-[10px] tracking-wider uppercase transition-all duration-300 border'
                        style={{
                          background: activeCat === i ? `${c.color}18` : 'rgba(255,255,255,0.02)',
                          borderColor: activeCat === i ? `${c.color}60` : 'rgba(255,255,255,0.06)',
                          color: activeCat === i ? c.color : 'rgba(255,255,255,0.35)',
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

                      {/* Tag + desc */}
                      <div className='flex items-center gap-2 mb-3'>
                        <span className='text-[10px] px-2.5 py-1 rounded-full font-bold tracking-wider'
                          style={{ background: `${cat.color}20`, color: cat.color, border: `1px solid ${cat.color}40` }}>
                          ✦ {cat.tag}
                        </span>
                        <span className='text-white/30 text-[10px]'>{cat.desc}</span>
                      </div>

                      {/* Items grid */}
                      <div className='grid grid-cols-2 gap-2 mb-4'>
                        {cat.items.map((item, i) => (
                          <motion.button key={i} whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveItem(i)}
                            className='p-3 rounded-xl text-left transition-all duration-200 border'
                            style={{
                              background: activeItem === i ? `${cat.color}15` : 'rgba(255,255,255,0.03)',
                              borderColor: activeItem === i ? `${cat.color}50` : 'rgba(255,255,255,0.06)',
                            }}>
                            <div className='text-xl mb-1'>{cat.icon}</div>
                            <div className='text-xs font-medium leading-tight'
                              style={{ color: activeItem === i ? cat.color : 'rgba(255,255,255,0.6)' }}>
                              {item}
                            </div>
                            {activeItem === i && (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className='text-[9px] mt-1 font-bold' style={{ color: cat.color }}>
                                ✓ Selected
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Selected item CTA */}
                      <div className='flex items-center gap-2 p-3 rounded-xl border mb-3'
                        style={{ background: `${cat.color}08`, borderColor: `${cat.color}25` }}>
                        <span className='text-lg'>{cat.icon}</span>
                        <div className='flex-1 min-w-0'>
                          <div className='text-xs font-semibold text-white/80 truncate'>{cat.items[activeItem]}</div>
                          <div className='text-[10px] text-white/30'>Krivante Premium Quality</div>
                        </div>
                        <div className='text-[10px] font-black px-2 py-1 rounded-lg'
                          style={{ background: `${cat.color}25`, color: cat.color }}>20% OFF</div>
                      </div>

                      <div className='flex gap-2'>
                        <motion.button whileTap={{ scale: 0.96 }}
                          onClick={() => navigate('/collection')}
                          className='flex-1 py-3 rounded-xl text-xs tracking-widest uppercase font-bold transition-all'
                          style={{ background: cat.color, color: '#0a0a0f' }}>
                          Shop Now ✦
                        </motion.button>
                        <motion.button whileTap={{ scale: 0.96 }}
                          onClick={() => navigate('/collection')}
                          className='px-4 py-3 rounded-xl glass border text-xs tracking-wider uppercase transition-all'
                          style={{ borderColor: `${cat.color}30`, color: cat.color }}>
                          All →
                        </motion.button>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Footer */}
                  <div className='px-6 pb-4 flex items-center justify-center gap-4 text-[10px] text-white/20 tracking-wider uppercase'>
                    {['Free Shipping', '7-Day Returns', 'Secure Pay'].map((t, i) => (
                      <React.Fragment key={t}>
                        {i > 0 && <span>•</span>}
                        <span>{t}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Banner image if available */}
                {bannerData?.images?.[0] && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className='mt-4 relative group rounded-2xl overflow-hidden cursor-pointer'
                    onClick={() => navigate('/collection')}>
                    <img src={bannerData.images[0]} alt='Collection'
                      className='w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500' />
                    <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/70 via-transparent to-transparent flex items-center px-5'>
                      <div>
                        <p className='gold-text text-xs font-bold tracking-widest uppercase'>Featured Drop</p>
                        <p className='text-white/60 text-[10px] mt-0.5'>Shop the collection →</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ── */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className='relative z-10 pb-8 flex flex-col items-center gap-2'>
          <span className='text-white/25 text-[10px] tracking-widest uppercase'>Scroll to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className='w-[1px] h-8 bg-gradient-to-b from-[#c9a84c] to-transparent' />
        </motion.div>
      </section>

      {/* ── Marquee ticker ── */}
      <div className='bg-[#c9a84c] py-3 overflow-hidden relative'>
        <div className='marquee-track flex whitespace-nowrap'>
          {[0, 1].map(ri => (
            <div key={ri} className='flex'>
              {['✦ FREE SHIPPING ABOVE ₹299', '⚡ FLASH SALE — UP TO 20% OFF', '🎰 SPIN & WIN DISCOUNTS', '🥜 PREMIUM DRY FRUITS', '🍳 QUALITY KITCHEN UTENSILS', '🌶️ FRESH SPICES & DATES', '🔄 EASY 7-DAY RETURNS', '🎮 BUILD YOUR KITCHEN COMBO'].map((t, i) => (
                <span key={i} className='text-[#0a0a0f] text-xs font-black tracking-widest uppercase px-8'>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Hero
