import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BUYERS = [
  { name: 'Arjun S.', location: 'Mumbai', product: 'Premium T-Shirt', time: '2 min ago', avatar: 'A' },
  { name: 'Rahul M.', location: 'Delhi', product: 'Gym Tank Top', time: '5 min ago', avatar: 'R' },
  { name: 'Vikram K.', location: 'Bangalore', product: 'Denim Jeans', time: '8 min ago', avatar: 'V' },
  { name: 'Siddharth P.', location: 'Hyderabad', product: 'Sleeveless Tee', time: '11 min ago', avatar: 'S' },
  { name: 'Ankit R.', location: 'Pune', product: 'Combo Pack', time: '14 min ago', avatar: 'A' },
  { name: 'Nikhil T.', location: 'Chennai', product: 'Premium T-Shirt', time: '17 min ago', avatar: 'N' },
]

const REVIEWS = [
  { name: 'Priya S.', stars: 5, text: '240 GSM fabric is insane quality! Best purchase ever 🔥', city: 'Mumbai' },
  { name: 'Rahul M.', stars: 5, text: 'Fits perfectly. Way better than branded stores at double the price 💯', city: 'Delhi' },
  { name: 'Anita K.', stars: 5, text: 'Ordered 3 t-shirts. Delivered in 2 days. Absolutely premium!', city: 'Bangalore' },
  { name: 'Vikram J.', stars: 5, text: 'The gym tank top is 🔥🔥 Everyone at my gym asked where I got it', city: 'Hyderabad' },
  { name: 'Sneha R.', stars: 5, text: 'Gifted to my brother — he loved it! Great packaging too ✨', city: 'Pune' },
  { name: 'Arjun D.', stars: 5, text: 'VibeCulture is the real deal. Premium quality at honest prices 🙌', city: 'Ahmedabad' },
  { name: 'Karan B.', stars: 5, text: 'Ordered jeans — perfect stretch, perfect fit. Zero regrets 👖', city: 'Surat' },
  { name: 'Meera T.', stars: 5, text: 'My husband\'s go-to brand now. Fast delivery + premium quality!', city: 'Jaipur' },
]

// Floating buyer toast (bottom-left)
export const BuyerToast = () => {
  const [current, setCurrent] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let idx = 0
    const show = () => {
      setCurrent(BUYERS[idx % BUYERS.length])
      setVisible(true)
      idx++
      setTimeout(() => setVisible(false), 3500)
    }
    const timer = setTimeout(() => {
      show()
      const interval = setInterval(show, 7000)
      return () => clearInterval(interval)
    }, 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && current && (
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className='fixed bottom-6 left-4 z-50 flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-xl max-w-[280px]'
        >
          <div className='w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-sm flex-shrink-0'>
            {current.avatar}
          </div>
          <div className='min-w-0'>
            <p className='text-gray-900 text-xs font-semibold truncate'>
              {current.name} <span className='text-gray-400 font-normal'>from {current.location}</span>
            </p>
            <p className='text-gray-500 text-[11px] truncate'>Just bought <span className='text-gray-900 font-medium'>{current.product}</span></p>
            <p className='text-gray-400 text-[10px] mt-0.5'>{current.time}</p>
          </div>
          <div className='w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0' />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Scrolling review ticker strip
export const ReviewTicker = () => {
  return (
    <div className='bg-gray-50 border-y border-gray-100 py-4 overflow-hidden relative'>
      <div className='absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none'
        style={{ background: 'linear-gradient(to right, #f9fafb, transparent)' }} />
      <div className='absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none'
        style={{ background: 'linear-gradient(to left, #f9fafb, transparent)' }} />

      <div className='review-ticker-track flex whitespace-nowrap gap-8'>
        {[0, 1].map(ri => (
          <div key={ri} className='flex gap-8 flex-shrink-0'>
            {REVIEWS.map((r, i) => (
              <div key={i} className='flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm flex-shrink-0'>
                <div className='w-7 h-7 rounded-full bg-gray-900 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0'>
                  {r.name[0]}
                </div>
                <div>
                  <div className='flex items-center gap-1.5'>
                    <span className='text-gray-900 text-xs font-semibold'>{r.name}</span>
                    <span className='text-gray-400 text-[10px]'>{r.city}</span>
                    <div className='flex gap-0.5'>
                      {[...Array(r.stars)].map((_, j) => (
                        <span key={j} className='text-amber-400 text-[10px]'>★</span>
                      ))}
                    </div>
                  </div>
                  <p className='text-gray-500 text-[11px] max-w-[220px] truncate'>{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Trust bar — shown above footer
export const TrustBar = () => {
  const items = [
    { icon: '🔒', label: 'Secure Checkout', sub: 'SSL encrypted' },
    { icon: '🚚', label: 'Fast Delivery', sub: '2–5 business days' },
    { icon: '↩️', label: '7-Day Returns', sub: 'No questions asked' },
    { icon: '🧵', label: '240 GSM Fabric', sub: 'Premium quality' },
    { icon: '⭐', label: '4.8 / 5 Rating', sub: '500+ reviews' },
    { icon: '🇮🇳', label: 'Made in India', sub: 'Proudly Indian brand' },
  ]
  return (
    <section className='bg-gray-900 py-8 px-4 overflow-hidden'>
      <div className='max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
        {items.map((item, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            className='flex flex-col items-center text-center gap-1'>
            <span className='text-2xl'>{item.icon}</span>
            <p className='text-white text-xs font-semibold tracking-wide'>{item.label}</p>
            <p className='text-gray-400 text-[10px]'>{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
