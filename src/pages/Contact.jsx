import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import NewsletterBox from '../components/NewsletterBox'

const CONTACT_METHODS = [
  {
    icon: '✉️',
    label: 'Email Us',
    value: 'support@krivante.store',
    sub: 'We reply within 24 hours',
    action: 'mailto:support@krivante.store',
    color: 'from-[#c9a84c]/20 to-[#c9a84c]/5',
  },
  {
    icon: '📞',
    label: 'Call Us',
    value: '+91 1294044211',
    sub: 'Mon – Sat, 10am – 7pm IST',
    action: 'tel:+911294044211',
    color: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    value: 'Chat with us',
    sub: 'Instant replies on WhatsApp',
    action: 'https://wa.me/911294044211?text=Hi%20Krivante%2C%20I%20need%20help%20with%20my%20order.',
    color: 'from-green-400/20 to-green-400/5',
  },
  {
    icon: '📍',
    label: 'Visit Us',
    value: 'Faridabad, Haryana',
    sub: 'India – 121001',
    action: 'https://maps.google.com/?q=Faridabad,Haryana,India',
    color: 'from-blue-400/20 to-blue-400/5',
  },
]

const FAQS = [
  { q: 'How long does delivery take?', a: 'Standard delivery takes 5–7 business days. Express options are available at checkout.' },
  { q: 'Can I return or exchange a product?', a: 'Yes! We offer hassle-free returns within 7 days of delivery. Just email us with your order ID.' },
  { q: 'How do I track my order?', a: 'Once shipped, you\'ll receive a tracking link via email and SMS automatically.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship across India. International shipping is coming soon!' },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    const mailto = `mailto:support@krivante.store?subject=${encodeURIComponent(form.subject || 'Contact from ' + form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.location.href = mailto
    setSent(true)
  }

  return (
    <div className='min-h-screen bg-[#0a0a0f] text-white'>
      <Helmet>
        <title>Contact Us | Krivante – We're Here to Help</title>
        <meta name="description" content="Get in touch with Krivante. Email, call, or WhatsApp us for order support, returns, or product queries. We reply within 24 hours." />
        <link rel="canonical" href="https://krivante.com/contact" />
      </Helmet>

      {/* Hero */}
      <div className='relative text-center py-20 px-4 border-b border-[#c9a84c]/10 overflow-hidden'>
        <div className='absolute inset-0 stripe-bg opacity-40' />
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className='text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3'>Get in Touch</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className='font-serif text-4xl sm:text-5xl font-bold gold-text mb-4'>Contact Krivante</motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className='text-white/40 max-w-md mx-auto text-sm leading-relaxed'>
          Questions, feedback, or just want to say hi? We'd love to hear from you.
        </motion.p>
      </div>

      <div className='max-w-6xl mx-auto px-4 py-16 space-y-20'>

        {/* Contact method cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {CONTACT_METHODS.map(({ icon, label, value, sub, action, color }, i) => (
            <motion.a key={label} href={action} target='_blank' rel='noreferrer'
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`group relative bg-gradient-to-br ${color} border border-[#c9a84c]/10 hover:border-[#c9a84c]/40 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}>
              <span className='text-3xl'>{icon}</span>
              <div>
                <p className='text-[#c9a84c] text-xs tracking-widest uppercase font-semibold'>{label}</p>
                <p className='text-white font-semibold mt-1 text-sm'>{value}</p>
                <p className='text-white/40 text-xs mt-0.5'>{sub}</p>
              </div>
              <span className='absolute top-4 right-4 text-white/10 group-hover:text-[#c9a84c]/40 text-lg transition-colors'>↗</span>
            </motion.a>
          ))}
        </div>

        {/* Form + FAQ split */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>

          {/* Contact form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <p className='text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-2'>Send a Message</p>
            <h2 className='font-serif text-2xl font-bold text-white mb-6'>We'll get back to you</h2>

            {sent ? (
              <div className='glass rounded-2xl p-10 text-center border border-[#c9a84c]/20'>
                <div className='text-4xl mb-4'>✦</div>
                <p className='gold-text font-serif text-xl font-bold mb-2'>Message Sent!</p>
                <p className='text-white/40 text-sm'>Your email client should have opened. We'll reply to <span className='text-[#c9a84c]'>support@krivante.store</span> within 24 hours.</p>
                <button onClick={() => setSent(false)} className='mt-6 text-xs text-white/30 hover:text-white/60 transition-colors underline'>Send another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-white/40 text-xs tracking-wider uppercase block mb-1.5'>Your Name</label>
                    <input required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder='John Doe'
                      className='w-full bg-white/5 border border-[#c9a84c]/15 hover:border-[#c9a84c]/30 focus:border-[#c9a84c]/60 rounded-xl px-4 py-3 text-base text-white placeholder-white/20 outline-none transition-colors' />
                  </div>
                  <div>
                    <label className='text-white/40 text-xs tracking-wider uppercase block mb-1.5'>Your Email</label>
                    <input required type='email' value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder='you@email.com'
                      className='w-full bg-white/5 border border-[#c9a84c]/15 hover:border-[#c9a84c]/30 focus:border-[#c9a84c]/60 rounded-xl px-4 py-3 text-base text-white placeholder-white/20 outline-none transition-colors' />
                  </div>
                </div>

                <div>
                  <label className='text-white/40 text-xs tracking-wider uppercase block mb-1.5'>Subject</label>
                  <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                    className='w-full bg-[#0a0a0f] border border-[#c9a84c]/15 hover:border-[#c9a84c]/30 focus:border-[#c9a84c]/60 rounded-xl px-4 py-3 text-base text-white/70 outline-none transition-colors'>
                    <option value=''>Select a topic…</option>
                    <option>Order Issue</option>
                    <option>Return / Exchange</option>
                    <option>Product Query</option>
                    <option>Payment Problem</option>
                    <option>Feedback</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className='text-white/40 text-xs tracking-wider uppercase block mb-1.5'>Message</label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder='Tell us how we can help…'
                    className='w-full bg-white/5 border border-[#c9a84c]/15 hover:border-[#c9a84c]/30 focus:border-[#c9a84c]/60 rounded-xl px-4 py-3 text-base text-white placeholder-white/20 outline-none transition-colors resize-none' />
                </div>

                <button type='submit'
                  className='w-full btn-gold rounded-xl py-3.5 text-sm font-bold tracking-widest uppercase transition-all duration-300'>
                  Send Message ✦
                </button>

                <p className='text-white/20 text-xs text-center'>
                  Or email directly: <a href='mailto:support@krivante.store' className='text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors'>support@krivante.store</a>
                </p>
              </form>
            )}
          </motion.div>

          {/* FAQ accordion */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <p className='text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-2'>Quick Answers</p>
            <h2 className='font-serif text-2xl font-bold text-white mb-6'>Frequently Asked</h2>

            <div className='space-y-3'>
              {FAQS.map(({ q, a }, i) => (
                <div key={i}
                  className='border border-[#c9a84c]/10 hover:border-[#c9a84c]/25 rounded-2xl overflow-hidden transition-colors duration-300'>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className='w-full flex items-center justify-between px-5 py-4 text-left text-sm font-semibold text-white/80 hover:text-white transition-colors'>
                    {q}
                    <span className={`text-[#c9a84c] text-lg transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      className='px-5 pb-4 text-sm text-white/40 leading-relaxed border-t border-[#c9a84c]/10'>
                      <p className='pt-3'>{a}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a href='https://wa.me/911294044211?text=Hi%20Krivante%2C%20I%20need%20help%20with%20my%20order.'
              target='_blank' rel='noreferrer'
              className='mt-8 flex items-center gap-4 bg-gradient-to-r from-green-500/10 to-green-400/5 border border-green-500/20 hover:border-green-400/50 rounded-2xl p-5 transition-all duration-300 group'>
              <div className='w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform'>💬</div>
              <div>
                <p className='text-green-400 font-semibold text-sm'>Chat on WhatsApp</p>
                <p className='text-white/40 text-xs mt-0.5'>Get instant help — we usually reply in minutes</p>
              </div>
              <span className='ml-auto text-green-400/40 group-hover:text-green-400 text-lg transition-colors'>↗</span>
            </a>
          </motion.div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  )
}

export default Contact
