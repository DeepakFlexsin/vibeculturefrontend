import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '25+', label: 'Brands' },
  { value: '99%', label: 'Satisfaction' },
]

const features = [
  { icon: '💎', title: 'Quality Guaranteed', desc: 'Every product is carefully selected and quality-checked before listing. Easy returns and satisfaction guarantee.' },
  { icon: '🎨', title: 'Curated Collections', desc: 'Our team handpicks every item to bring you the best in fashion and lifestyle, updated regularly.' },
  { icon: '🌟', title: 'Exceptional Service', desc: 'Fast delivery, easy returns, and 24/7 customer support to make your shopping experience seamless.' },
]

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }

const About = () => {
  const [aboutData, setAboutData] = useState(null)
  const { backendUrl } = useContext(ShopContext)

  useEffect(() => {
    axios.get(backendUrl + '/api/about/get')
      .then(r => r.data.success && r.data.data && setAboutData(r.data.data))
      .catch(() => {})
  }, [])

  return (
    <div className='min-h-screen bg-[#0a0a0f]'>
      <Helmet>
        <title>About Us | Krivante – Fashion & Lifestyle Store</title>
        <meta name="description" content="Learn about Krivante – your destination for curated fashion, accessories & lifestyle products. Quality guaranteed, fast delivery, 10K+ happy customers." />
        <link rel="canonical" href="https://krivante.com/about" />
      </Helmet>

      {/* Hero */}
      <motion.section
        initial='hidden' animate='show' variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className='relative py-24 px-4 text-center overflow-hidden'
      >
        {/* Background glow */}
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#c9a84c]/5 rounded-full blur-3xl' />
        </div>

        <motion.div variants={fadeUp} className='mb-4'>
          <Title text1='ABOUT' text2='KRIVANTE' />
        </motion.div>
        <motion.h1 variants={fadeUp} className='font-serif text-4xl sm:text-6xl font-bold gold-text mb-6'>
          Our Story
        </motion.h1>
        <motion.p variants={fadeUp} className='text-white/50 max-w-xl mx-auto text-sm leading-relaxed'>
          Where fashion meets affordability — curated collections of clothing, accessories, and lifestyle products for those who love style.
        </motion.p>
      </motion.section>

      {/* Stats bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='glass-dark border-y border-[#c9a84c]/10 py-8 px-4'
      >
        <div className='max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center'>
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className='gold-text font-serif text-3xl font-bold'>{value}</p>
              <p className='text-white/40 text-xs tracking-widest uppercase mt-1'>{label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Main content */}
      <section className='max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-16 items-center'>
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className='lg:w-1/2 w-full'
        >
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-br from-[#c9a84c]/30 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <img
              src={aboutData?.image || assets.about_img}
              alt='About Krivante'
              className='relative w-full h-[420px] object-cover rounded-2xl border border-[#c9a84c]/20'
            />
            {/* Overlay badge */}
            <div className='absolute bottom-4 left-4 glass-dark rounded-xl px-4 py-3 border border-[#c9a84c]/20'>
              <p className='gold-text text-xs tracking-widest uppercase font-semibold'>Est. 2020</p>
              <p className='text-white/60 text-xs mt-0.5'>Fashion & Lifestyle</p>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className='lg:w-1/2 w-full space-y-6'
        >
          {aboutData?.content ? (
            <div className='text-white/60 leading-relaxed' dangerouslySetInnerHTML={{ __html: aboutData.content }} />
          ) : (
            <>
              <h2 className='font-serif text-3xl font-bold text-white'>Your Style Destination</h2>
              <p className='text-white/50 leading-relaxed'>
                Welcome to <span className='gold-text font-semibold'>Krivante</span>, where fashion meets affordability. We bring you curated collections of clothing, accessories, and lifestyle products — all at great prices with fast delivery.
              </p>
              <p className='text-white/50 leading-relaxed'>
                Our team handpicks every product to ensure quality and style. Whether you're looking for the latest trends or timeless classics, Krivante has something for everyone.
              </p>
              {/* Mission box */}
              <div className='glass rounded-2xl p-5 border border-[#c9a84c]/20'>
                <p className='gold-text text-xs tracking-widest uppercase font-semibold mb-2'>Our Mission</p>
                <p className='text-white/50 text-sm leading-relaxed'>
                  To make great fashion accessible to everyone. Style shouldn't break the bank — that's why we offer the best products at the best prices, backed by excellent customer support.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* Why choose us */}
      <section className='stripe-bg py-20 px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className='text-center mb-12'
        >
          <Title text1='WHY CHOOSE' text2='KRIVANTE' />
          <p className='text-white/40 text-sm mt-3 max-w-md mx-auto'>
            Experience the difference that comes with choosing quality, affordability, and care.
          </p>
        </motion.div>

        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className='glass rounded-2xl p-8 border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 card-lift text-center group'
            >
              <div className='w-14 h-14 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-2xl mx-auto mb-5 group-hover:bg-[#c9a84c]/20 transition-colors duration-300'>
                {icon}
              </div>
              <h3 className='text-white font-semibold mb-3'>{title}</h3>
              <p className='text-white/40 text-sm leading-relaxed'>{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className='mt-12 flex flex-wrap justify-center gap-6 text-xs text-white/40'
        >
          {['Quality Verified', 'Fast Delivery', 'Easy Returns', '24/7 Support'].map((badge, i) => (
            <div key={badge} className='flex items-center gap-2'>
              <span className={`w-2 h-2 rounded-full ${['bg-green-500','bg-blue-500','bg-purple-500','bg-[#c9a84c]'][i]}`} />
              {badge}
            </div>
          ))}
        </motion.div>
      </section>

      <NewsletterBox />
    </div>
  )
}

export default About
