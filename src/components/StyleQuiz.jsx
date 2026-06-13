import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'

const STEPS = [
  {
    q: 'What\'s your style?',
    opts: [
      { label: 'Casual & Comfy', icon: '☀️', tag: 'casual' },
      { label: 'Bold & Trendy', icon: '⚡', tag: 'trendy' },
      { label: 'Classic & Timeless', icon: '✨', tag: 'classic' },
      { label: 'Mix It All', icon: '🎨', tag: 'mixed' },
    ]
  },
  {
    q: 'Preferred fit?',
    opts: [
      { label: 'Slim Fit', icon: '👔', tag: 'slim' },
      { label: 'Regular Fit', icon: '👕', tag: 'regular' },
      { label: 'Oversized', icon: '🛍️', tag: 'oversized' },
      { label: 'No Preference', icon: '🤷', tag: 'any' },
    ]
  },
  {
    q: 'Denim style?',
    opts: [
      { label: 'Light Wash', icon: '☁️', tag: 'light' },
      { label: 'Dark Wash', icon: '🌙', tag: 'dark' },
      { label: 'Distressed', icon: '⚙️', tag: 'distressed' },
      { label: 'All Styles!', icon: '🎯', tag: 'all' },
    ]
  },
]

const RESULTS = [
  {
    title: 'Style Enthusiast',
    desc: 'You love bold patterns and trendy pieces. Our premium collection is your playground.',
    emoji: '🌟',
    rec: 'Trending Collections',
  },
  {
    title: 'Comfort First',
    desc: 'Quality 240 GSM cotton and perfect fit are your priorities. We\'ve got you covered.',
    emoji: '☁️',
    rec: 'Premium T-Shirts',
  },
  {
    title: 'Timeless Classic',
    desc: 'You prefer versatile pieces that work with everything. Elegance in simplicity.',
    emoji: '♻️',
    rec: 'Classic Collection',
  },
]

const KitchenQuiz = () => {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])
  const [done, setDone] = useState(false)
  const [selected, setSelected] = useState(null)
  const { navigate } = useContext(ShopContext)

  const pick = (opt) => {
    setSelected(opt.tag)
    setTimeout(() => {
      const next = [...answers, opt.tag]
      setAnswers(next)
      setSelected(null)
      if (step + 1 >= STEPS.length) setDone(true)
      else setStep(s => s + 1)
    }, 400)
  }

  const reset = () => { setStep(0); setAnswers([]); setDone(false); setSelected(null) }

  const resultIdx = answers.includes('cookware') ? 0 : answers.includes('dryfruits') || answers.includes('almonds') || answers.includes('cashews') ? 1 : 2
  const result = RESULTS[done ? resultIdx : 0]

  return (
    <section className='py-20 px-4 sm:px-6 bg-[#e8eef2] relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#0d6b9f]/20 to-transparent' />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='max-w-2xl mx-auto text-center'>

        <div className='inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-[#0d6b9f]/20'>
          <span className='text-[#0d6b9f] text-xs tracking-widest uppercase'>🎯 Style Finder</span>
        </div>

        <h2 className='font-serif text-4xl sm:text-5xl font-light text-gray-900 mb-2 italic'>
          Find Your <span className='teal-text font-bold not-italic'>Perfect Style</span>
        </h2>
        <p className='text-gray-600 text-sm mb-10 font-light'>3 quick questions — we'll find your perfect pieces</p>

        <div className='glass rounded-3xl p-8 border border-[#0d6b9f]/15'>
          {!done && (
            <div className='mb-8'>
              <div className='flex justify-between text-xs text-gray-500 mb-2'>
                <span>Question {step + 1} of {STEPS.length}</span>
                <span>{Math.round((step / STEPS.length) * 100)}% done</span>
              </div>
              <div className='h-1 bg-gray-200 rounded-full overflow-hidden'>
                <motion.div animate={{ width: `${(step / STEPS.length) * 100}%` }} transition={{ duration: 0.4 }}
                  className='h-full rounded-full bg-gradient-to-r from-[#0d6b9f] to-[#1e8bc3]' />
              </div>
            </div>
          )}

          <AnimatePresence mode='wait'>
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}>
                <h3 className='text-gray-900 text-xl font-semibold mb-6'>{STEPS[step].q}</h3>
                <div className='grid grid-cols-2 gap-3'>
                  {STEPS[step].opts.map(opt => (
                    <motion.button key={opt.tag} onClick={() => pick(opt)} whileTap={{ scale: 0.96 }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                        selected === opt.tag
                          ? 'border-[#0d6b9f] bg-[#0d6b9f]/10'
                          : 'border-[#0d6b9f]/15 hover:border-[#0d6b9f]/40 hover:bg-gray-100'
                      }`}>
                      <div className='text-2xl mb-2'>{opt.icon}</div>
                      <p className='text-gray-800 text-sm font-medium'>{opt.label}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key='result' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}>
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.6 }}
                  className='text-6xl mb-4 inline-block'>{result.emoji}</motion.div>
                <p className='text-gray-500 text-xs tracking-widest uppercase mb-2'>Your style type is</p>
                <h3 className='teal-text font-serif text-3xl font-bold mb-3'>{result.title}</h3>
                <p className='text-gray-700 text-sm mb-2 leading-relaxed'>{result.desc}</p>
                <p className='text-[#0d6b9f] text-xs tracking-widest uppercase mb-8'>Recommended: {result.rec}</p>
                <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                  <button onClick={() => navigate('/collection')}
                    className='btn-teal px-8 py-3 rounded-full text-xs tracking-widest uppercase'>
                    Shop My Match ✦
                  </button>
                  <button onClick={reset}
                    className='glass text-gray-700 hover:text-gray-900 px-8 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300'>
                    Retake Quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  )
}

export default KitchenQuiz
