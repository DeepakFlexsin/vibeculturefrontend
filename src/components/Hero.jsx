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

const BRAND_LETTERS = ['V', 'I', 'B', 'E', 'C', 'U', 'L', 'T', 'U', 'R', 'E']

const HEADLINES = [
  { top: 'Premium Quality', bold: 'T-Shirts.', sub: 'Comfort. Style. Confidence.', badge: '👕 Best T-Shirts' },
  { top: 'Sleek', bold: 'Tank Tops.', sub: 'Perfect for Gym & Summer.', badge: '💪 Tank Collection' },
  { top: 'Elevate Your', bold: 'Gym Game.', sub: 'Performance. Comfort. Style.', badge: '🏋️ Sleeveless Tees' },
  { top: 'Premium', bold: 'Jeans.', sub: 'Denim That Moves With You.', badge: '👖 Denim Collection' },
  { top: 'Wear What', bold: 'Feels Right.', sub: 'Premium Quality Always.', badge: '✦ Best Sellers' },
  { top: 'Upgrade Your', bold: 'Wardrobe.', sub: 'Comfort Meets Style.', badge: '🎨 New Collections' },
]

// fallback taglines per category name keyword
const getCatMeta = (name = '') => {
  const n = name.toLowerCase()
  if (n.includes('t-shirt') || n.includes('tshirt') || n.includes('tee'))
    return { emoji: '👕', tag: 'Best Seller', line: '240 GSM premium cotton' }
  if (n.includes('tank') || n.includes('stringer'))
    return { emoji: '💪', tag: 'Gym Pick', line: 'Breathable & muscle-fit' }
  if (n.includes('gym') || n.includes('workout') || n.includes('sport'))
    return { emoji: '🏋️', tag: 'Performance', line: 'Built for every rep' }
  if (n.includes('jean') || n.includes('denim'))
    return { emoji: '👖', tag: 'Trending', line: 'Stretch denim, sharp fit' }
  if (n.includes('lower') || n.includes('track') || n.includes('jogger'))
    return { emoji: '🩳', tag: 'New Drop', line: 'All-day comfort wear' }
  if (n.includes('combo') || n.includes('set'))
    return { emoji: '🎁', tag: 'Best Value', line: 'Save more, style more' }
  return { emoji: '✦', tag: 'Premium', line: 'VibeCulture collection' }
}

const Hero = () => {
  const [bannerData, setBannerData] = useState(null)
  const [categories, setCategories] = useState([])
  const { backendUrl, navigate } = useContext(ShopContext)
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const [headlineIdx, setHeadlineIdx] = useState(0)

  useEffect(() => {
    axios.get(backendUrl + '/api/banner/get')
      .then(r => r.data.success && setBannerData(r.data.data))
      .catch(() => {})
    axios.get(backendUrl + '/api/category/list')
      .then(r => r.data.success && setCategories(r.data.categories))
      .catch(() => {})
  }, [])

  useEffect(() => {
    const t = setInterval(() => setHeadlineIdx(i => (i + 1) % HEADLINES.length), 3500)
    return () => clearInterval(t)
  }, [])

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

            {/* Brand name */}
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
                    className='px-10 py-4 rounded-lg text-sm tracking-widest uppercase font-bold accent-glow transition-all duration-300'
                    style={{ background: '#e8c96d', color: '#111111', boxShadow: '0 4px 20px rgba(232,201,109,0.4)' }}>
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
                  {[['10+', 'Products'], ['100+', 'Happy Customers'], ['4.8★', 'Rating']].map(([num, label]) => (
                    <div key={label} className='text-center lg:text-left'>
                      <div className='font-serif text-3xl font-bold text-gray-900'>{num}</div>
                      <div className='text-gray-400 text-[10px] tracking-widest uppercase mt-1'>{label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right column — Premium Category Grid */}
              <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
                className='w-full lg:w-[400px] flex-shrink-0'>

                {categories.length > 0 ? (
                  <div className='grid grid-cols-2 gap-3'>
                    {categories.slice(0, 4).map((cat, i) => {
                      const meta = getCatMeta(cat.name)
                      return (
                        <motion.div key={cat._id}
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          whileHover={{ y: -4 }}
                          onClick={() => { navigate(`/collection?category=${cat._id}`); window.scrollTo(0, 0) }}
                          className='relative group cursor-pointer rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 bg-white'>

                          {/* Image or gradient bg */}
                          {cat.image ? (
                            <div className='relative h-32 overflow-hidden'>
                              <img src={cat.image} alt={cat.name}
                                className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' />
                              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent' />
                              {/* Tag badge */}
                              <span className='absolute top-2.5 left-2.5 text-[9px] font-black tracking-wider uppercase bg-white text-gray-900 px-2 py-0.5 rounded-full'>
                                {meta.tag}
                              </span>
                              {/* Name on image */}
                              <div className='absolute bottom-2.5 left-3 right-3'>
                                <p className='text-white font-bold text-sm leading-tight'>{cat.name}</p>
                                <p className='text-white/70 text-[10px] mt-0.5'>{meta.line}</p>
                              </div>
                            </div>
                          ) : (
                            <div className='h-32 flex flex-col items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 relative'>
                              <span className='absolute top-2.5 left-2.5 text-[9px] font-black tracking-wider uppercase bg-gray-900 text-white px-2 py-0.5 rounded-full'>
                                {meta.tag}
                              </span>
                              <span className='text-4xl mb-1'>{meta.emoji}</span>
                              <p className='text-gray-900 font-bold text-sm'>{cat.name}</p>
                              <p className='text-gray-400 text-[10px] mt-0.5 px-2 text-center'>{meta.line}</p>
                            </div>
                          )}

                          {/* Footer */}
                          <div className='px-3 py-2.5 flex items-center justify-between'>
                            <span className='text-gray-900 text-xs font-semibold'>Shop now</span>
                            <motion.span
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className='text-gray-400 text-sm'>→</motion.span>
                          </div>
                        </motion.div>
                      )
                    })}

                    {/* View all card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                      whileHover={{ y: -4 }}
                      onClick={() => navigate('/collection')}
                      className='col-span-2 cursor-pointer rounded-2xl border border-gray-200 bg-gray-900 hover:bg-black transition-all duration-300 flex items-center justify-between px-5 py-4 group shadow-sm hover:shadow-lg'>
                      <div>
                        <p className='text-white font-bold text-sm tracking-wide'>View All Collections</p>
                        <p className='text-gray-400 text-[11px] mt-0.5'>T-Shirts · Jeans · Tank Tops · Gym Wear</p>
                      </div>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className='w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white text-sm'>
                        →
                      </motion.div>
                    </motion.div>
                  </div>
                ) : (
                  /* fallback skeleton while loading */
                  <div className='grid grid-cols-2 gap-3'>
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className='rounded-2xl h-44 shimmer' />
                    ))}
                    <div className='col-span-2 rounded-2xl h-16 shimmer' />
                  </div>
                )}

                {/* Banner image if available */}
                {bannerData?.images?.[0] && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                    className='mt-3 relative group rounded-xl overflow-hidden cursor-pointer'
                    onClick={() => navigate('/collection')}>
                    <img src={bannerData.images[0]} alt='Collection'
                      className='w-full h-28 object-cover group-hover:scale-105 transition-transform duration-500' />
                    <div className='absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent flex items-center px-5'>
                      <div>
                        <p className='text-white text-xs font-bold tracking-widest uppercase'>Featured Drop</p>
                        <p className='text-white/70 text-[10px] mt-0.5'>Shop the collection →</p>
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
