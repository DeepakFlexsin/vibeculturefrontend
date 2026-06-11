import React from 'react'
import { motion } from 'framer-motion'

const policies = [
  { icon: '🔄', title: 'Easy Exchange', desc: 'Hassle-free exchange within 7 days' },
  { icon: '↩️', title: '7-Day Returns', desc: 'No questions asked return policy' },
  { icon: '🎧', title: '24/7 Support', desc: 'Always here when you need us' },
  { icon: '🚚', title: 'Free Shipping', desc: 'On orders above ₹299' },
]

const OurPolicy = () => {
  return (
    <section className='py-20 px-4 sm:px-6 bg-[#0a0a0f] relative'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent' />

      <div className='max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {policies.map((p, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
            className='glass rounded-2xl p-6 text-center border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 transition-all duration-300 group card-lift'>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              className='text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block'>
              {p.icon}
            </motion.div>
            <p className='text-white/90 font-semibold text-sm mb-1'>{p.title}</p>
            <p className='text-white/40 text-xs leading-relaxed'>{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default OurPolicy
