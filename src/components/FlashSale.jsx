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
    <section className='py-20 px-4 sm:px-6 bg-white relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent' />
      <div className='absolute inset-0 stripe-bg pointer-events-none opacity-30' />

      {/* Animated bg orb */}
      <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 6, repeat: Infinity }}
        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full pointer-events-none'
        style={{ background: 'radial-gradient(ellipse, rgba(17,17,17,0.08) 0%, transparent 70%)' }} />

      <div className='max-w-6xl mx-auto relative z-10'>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className='flex flex-col sm:flex-row items-center justify-between gap-6 mb-10'>
          <div>
            <div className='flex items-center gap-3 mb-2'>
              <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
                className='text-3xl'>⚡</motion.span>
              <h2 className='font-serif text-4xl font-bold text-gray-900'>Flash Sale</h2>
            </div>
            <p className='text-gray-600 text-sm font-light'>Today only — premium apparel at unbeatable prices</p>
          </div>

          {/* Countdown */}
          <div className='flex items-center gap-3'>
            <span className='text-gray-500 text-xs tracking-widest uppercase'>Ends in</span>
            {[time.h, time.m, time.s].map((val, i) => (
              <React.Fragment key={i}>
                <motion.div key={val + i} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                  className='bg-gray-50 border border-gray-200 rounded-xl w-14 h-14 flex flex-col items-center justify-center shadow-sm'>
                  <span className='font-bold text-gray-900 text-xl font-mono leading-none'>{val}</span>
                  <span className='text-gray-400 text-[9px] tracking-widest uppercase mt-0.5'>
                    {['HRS', 'MIN', 'SEC'][i]}
                  </span>
                </motion.div>
                {i < 2 && <span className='text-gray-900 font-bold text-xl'>:</span>}
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
                className='bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-300 transition-all duration-300 cursor-pointer group card-lift shadow-sm'>

                <div className='relative overflow-hidden'>
                  <img src={item.image?.[0]} alt={item.name}
                    className='w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500' />
                  {/* Discount badge */}
                  <div className='absolute top-3 left-3 bg-gray-900 text-white text-xs font-black px-2 py-1 rounded-full'>
                    -{discount}%
                  </div>
                  {/* Flash icon */}
                  <div className='absolute top-3 right-3 w-7 h-7 bg-gray-100/80 rounded-full flex items-center justify-center text-sm'>
                    ⚡
                  </div>
                </div>

                <div className='p-3'>
                  <p className='text-gray-800 text-xs font-medium truncate mb-1'>{item.name}</p>
                  <div className='flex items-center gap-2'>
                    <span className='font-bold text-gray-900 text-sm'>₹{Math.round(item.price * (1 - discount / 100))}</span>
                    <span className='text-gray-400 text-xs line-through'>₹{item.price}</span>
                  </div>
                  {/* Stock bar */}
                  <div className='mt-2'>
                    <div className='flex justify-between text-[10px] text-gray-500 mb-1'>
                      <span>Selling fast</span>
                      <span>{[72, 45, 88, 61][i]}% sold</span>
                    </div>
                    <div className='h-1 bg-gray-200 rounded-full overflow-hidden'>
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${[72, 45, 88, 61][i]}%` }}
                        viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.1 }}
                        className='h-full rounded-full bg-gradient-to-r from-gray-700 to-gray-500' />
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
            className='bg-gray-900 text-white px-10 py-3 rounded-full text-xs tracking-widest uppercase hover:bg-black transition-all'>
            Shop All Sale Items ⚡
          </button>
        </motion.div>
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent' />
    </section>
  )
}

export default FlashSale
