import React, { useState } from 'react'
import { motion } from 'framer-motion'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section className='py-20 px-4 sm:px-6 bg-white relative overflow-hidden'>
      {/* Gold orb */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full pointer-events-none'
        style={{ background: 'radial-gradient(ellipse, rgba(17,17,17,0.04) 0%, transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='max-w-xl mx-auto text-center relative z-10'>

        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
          className='text-4xl mb-6 inline-block'>✉️</motion.div>

        <h2 className='font-serif text-3xl sm:text-4xl font-light text-gray-900 mb-2 italic'>
          Stay in the <span className='font-bold not-italic'>Loop</span>
        </h2>
        <p className='text-gray-500 text-sm mb-8 font-light'>
          Subscribe & get <span className='text-gray-900 font-semibold'>20% off</span> your first order. New drops, exclusive deals on VibeCulture premium apparel.
        </p>

        {submitted ? (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className='glass rounded-2xl p-6 border border-gray-200'>
            <div className='text-3xl mb-2'>🎉</div>
            <p className='font-semibold text-gray-900'>You're in! Check your inbox.</p>
          </motion.div>
        ) : (
          <form onSubmit={onSubmit} className='flex gap-0 bg-gray-50 rounded-full border border-gray-200 overflow-hidden p-1'>
            <input
              type='email' required value={email} onChange={e => setEmail(e.target.value)}
              placeholder='Enter your email address'
              className='flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-base px-5 py-3 outline-none'
            />
            <button type='submit' className='btn-teal px-6 py-3 rounded-full text-xs tracking-widest uppercase whitespace-nowrap'>
              Subscribe
            </button>
          </form>
        )}
      </motion.div>
    </section>
  )
}

export default NewsletterBox
