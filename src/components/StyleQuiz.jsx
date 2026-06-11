import React, { useState, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'

const STEPS = [
  {
    q: 'How do you cook?',
    opts: [
      { label: 'Quick & Easy', icon: '⚡', tag: 'quick' },
      { label: 'Slow & Hearty', icon: '🍲', tag: 'slow' },
      { label: 'Healthy & Light', icon: '🥗', tag: 'healthy' },
      { label: 'Rich & Indulgent', icon: '🧈', tag: 'rich' },
    ]
  },
  {
    q: 'Favourite dry fruit?',
    opts: [
      { label: 'Almonds', icon: '🤎', tag: 'almonds' },
      { label: 'Cashews', icon: '🌰', tag: 'cashews' },
      { label: 'Dates & Figs', icon: '🍯', tag: 'dates' },
      { label: 'Mixed Nuts', icon: '🥜', tag: 'mixed' },
    ]
  },
  {
    q: 'Kitchen priority?',
    opts: [
      { label: 'Premium Cookware', icon: '🍳', tag: 'cookware' },
      { label: 'Spices & Masalas', icon: '🌶️', tag: 'spices' },
      { label: 'Dry Fruits & Nuts', icon: '🫘', tag: 'dryfruits' },
      { label: 'All of the above!', icon: '✨', tag: 'all' },
    ]
  },
]

const RESULTS = [
  {
    title: 'The Master Chef',
    desc: 'You need top-grade cookware and premium spices. Your kitchen deserves the best.',
    emoji: '👨‍🍳',
    rec: 'Kitchen Utensils',
  },
  {
    title: 'The Nutrition Guru',
    desc: 'Pure, natural dry fruits and nuts are your go-to. Health is your wealth.',
    emoji: '🥜',
    rec: 'Dry Fruits & Nuts',
  },
  {
    title: 'The Flavour Hunter',
    desc: 'Rare spices, saffron, and exotic dates — you cook with soul.',
    emoji: '🌶️',
    rec: 'Spices & Dates',
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
    <section className='py-20 px-4 sm:px-6 bg-[#0a0a0f] relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent' />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='max-w-2xl mx-auto text-center'>

        <div className='inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-[#c9a84c]/20'>
          <span className='text-[#c9a84c] text-xs tracking-widest uppercase'>🎯 Kitchen Finder</span>
        </div>

        <h2 className='font-serif text-4xl sm:text-5xl font-light text-white mb-2 italic'>
          Find Your <span className='gold-text font-bold not-italic'>Kitchen Match</span>
        </h2>
        <p className='text-white/40 text-sm mb-10 font-light'>3 quick questions — we'll find your perfect products</p>

        <div className='glass rounded-3xl p-8 border border-[#c9a84c]/15'>
          {!done && (
            <div className='mb-8'>
              <div className='flex justify-between text-xs text-white/30 mb-2'>
                <span>Question {step + 1} of {STEPS.length}</span>
                <span>{Math.round((step / STEPS.length) * 100)}% done</span>
              </div>
              <div className='h-1 bg-white/10 rounded-full overflow-hidden'>
                <motion.div animate={{ width: `${(step / STEPS.length) * 100}%` }} transition={{ duration: 0.4 }}
                  className='h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-[#f0d080]' />
              </div>
            </div>
          )}

          <AnimatePresence mode='wait'>
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}>
                <h3 className='text-white text-xl font-semibold mb-6'>{STEPS[step].q}</h3>
                <div className='grid grid-cols-2 gap-3'>
                  {STEPS[step].opts.map(opt => (
                    <motion.button key={opt.tag} onClick={() => pick(opt)} whileTap={{ scale: 0.96 }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 ${
                        selected === opt.tag
                          ? 'border-[#c9a84c] bg-[#c9a84c]/10'
                          : 'border-[#c9a84c]/15 hover:border-[#c9a84c]/40 hover:bg-white/5'
                      }`}>
                      <div className='text-2xl mb-2'>{opt.icon}</div>
                      <p className='text-white/80 text-sm font-medium'>{opt.label}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key='result' initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}>
                <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.6 }}
                  className='text-6xl mb-4 inline-block'>{result.emoji}</motion.div>
                <p className='text-white/40 text-xs tracking-widest uppercase mb-2'>Your kitchen type is</p>
                <h3 className='gold-text font-serif text-3xl font-bold mb-3'>{result.title}</h3>
                <p className='text-white/60 text-sm mb-2 leading-relaxed'>{result.desc}</p>
                <p className='text-[#c9a84c] text-xs tracking-widest uppercase mb-8'>Recommended: {result.rec}</p>
                <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                  <button onClick={() => navigate('/collection')}
                    className='btn-gold px-8 py-3 rounded-full text-xs tracking-widest uppercase'>
                    Shop My Match ✦
                  </button>
                  <button onClick={reset}
                    className='glass text-white/60 hover:text-white px-8 py-3 rounded-full text-xs tracking-widest uppercase transition-all duration-300'>
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
