import React, { useState, useEffect, useContext } from 'react'
import { motion } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'

function getTimeLeft() {
  const now = new Date()
  const end = new Date()
  end.setHours(23, 59, 59, 0)
  const diff = end - now
  return {
    h: String(Math.floor(diff / 3600000)).padStart(2, '0'),
    m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
    s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
  }
}

const FlashSale = () => {
  const [time, setTime] = useState(getTimeLeft())
  const { products, navigate } = useContext(ShopContext)

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(t)
  }, [])

  const saleItems = products.filter(p => p.bestseller).slice(0, 4)
  if (!saleItems.length) return null

  return (
    <section className='py-20 px-4 sm:px-6 bg-[#12121a] relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent' />
      <div className='absolute inset-0 stripe-bg pointer-events-none opacity-30' />

      {/* Animated bg orb */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 6, repeat: Infinity }}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none'
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.3) 0%, transparent 70%)' }} />

      <div className='max-w-6xl mx-auto relative z-10'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className='flex flex-col sm:flex-row items-center justify-between gap-6 mb-10'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                className='text-3xl'>⚡</motion.span>
              <h2 className='font-serif text-4xl font-bold gold-text'>Flash Sale</h2>
            </div>
            <p className='text-white/40 text-sm font-light'>Today only — kitchen essentials & dry fruits at unbeatable prices</p>
          </div>

          {/* Countdown */}
          <div className='flex items-center gap-3'>
            <span className='text-white/40 text-xs tracking-widest uppercase'>Ends in</span>
            {[time.h, time.m, time.s].map((val, i) => (
              <React.Fragment key={i}>
                <motion.div key={val + i} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                  className='glass rounded-xl w-14 h-14 flex flex-col items-center justify-center border border-[#c9a84c]/30'>
                  <span className='gold-text font-bold text-xl font-mono leading-none'>{val}</span>
                  <span className='text-white/30 text-[9px] tracking-widest uppercase mt-0.5'>
                    {['HRS', 'MIN', 'SEC'][i]}
                  </span>
                </motion.div>
                {i < 2 && <span className='gold-text font-bold text-xl'>:</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Products */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {saleItems.map((item, i) => {
            const discount = [10, 15, 20, 25][i] || 10
            return (
              <motion.div key={item._id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/product/${item._id}`)}
                className='glass rounded-2xl overflow-hidden border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 transition-all duration-300 cursor-pointer group card-lift'>

                <div className='relative overflow-hidden'>
                  <img src={item.image?.[0]} alt={item.name}
                    className='w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500' />
                  {/* Discount badge */}
                  <div className='absolute top-3 left-3 bg-[#c9a84c] text-[#0a0a0f] text-xs font-black px-2 py-1 rounded-full'>
                    -{discount}%
                  </div>
                  {/* Flash icon */}
                  <div className='absolute top-3 right-3 w-7 h-7 bg-[#0a0a0f]/80 rounded-full flex items-center justify-center text-sm'>
                    ⚡
                  </div>
                </div>

                <div className='p-3'>
                  <p className='text-white/80 text-xs font-medium truncate mb-1'>{item.name}</p>
                  <div className='flex items-center gap-2'>
                    <span className='gold-text font-bold text-sm'>₹{Math.round(item.price * (1 - discount / 100))}</span>
                    <span className='text-white/30 text-xs line-through'>₹{item.price}</span>
                  </div>
                  {/* Stock bar */}
                  <div className='mt-2'>
                    <div className='flex justify-between text-[10px] text-white/30 mb-1'>
                      <span>Selling fast</span>
                      <span>{[72, 45, 88, 61][i]}% sold</span>
                    </div>
                    <div className='h-1 bg-white/10 rounded-full overflow-hidden'>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${[72, 45, 88, 61][i]}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                        className='h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d080]' />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className='text-center mt-8'>
          <button onClick={() => navigate('/collection')}
            className='btn-gold px-10 py-3 rounded-full text-xs tracking-widest uppercase'>
            Shop All Sale Items ⚡
          </button>
        </motion.div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent' />
    </section>
  )
}

export default FlashSale
