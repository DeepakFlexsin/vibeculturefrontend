import React, { useState, useEffect, useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const stats = [
  { value: '100+', label: 'Happy Customers' },
  { value: '10+', label: 'Products' },
  { value: '240 GSM', label: 'Premium Fabric' },
  { value: '99%', label: 'Satisfaction' },
]

const features = [
  { icon: '👕', title: '240 GSM Premium Fabric', desc: 'Every T-shirt and tank top uses heavyweight 240 GSM cotton — thick, durable, and incredibly soft on skin.' },
  { icon: '💪', title: 'Built for Performance', desc: 'Our gym tank tops and sleeveless tees are engineered for maximum movement, breathability, and a muscle-flattering fit.' },
  { icon: '👖', title: 'Premium Denim Jeans', desc: 'Stretch denim crafted for comfort and durability. Slim fit, regular fit — jeans that move the way you do.' },
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
    <div className='min-h-screen bg-white'>
      <Helmet>
        <title>About Us | VibeCulture – Premium Men's Clothing</title>
        <meta name="description" content="Learn about VibeCulture — premium men's T-shirts, gym tank tops and jeans. 240 GSM fabric, perfect fit, 50K+ happy customers across India." />
        <link rel="canonical" href="https://www.vibeculture.in/about" />
      </Helmet>

      {/* Hero */}
      <motion.section
        initial='hidden' animate='show' variants={{ show: { transition: { staggerChildren: 0.15 } } }}
        className='relative py-24 px-4 text-center overflow-hidden bg-gray-50 border-b border-gray-100'
      >
        <div className='absolute inset-0 pointer-events-none'>
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gray-200/40 rounded-full blur-3xl' />
        </div>

        <motion.div variants={fadeUp} className='mb-4'>
          <Title text1='ABOUT' text2='VIBECULTURE' />
        </motion.div>
        <motion.h1 variants={fadeUp} className='font-serif text-4xl sm:text-6xl font-bold text-gray-900 mb-6'>
          Our Story
        </motion.h1>
        <motion.p variants={fadeUp} className='text-gray-500 max-w-xl mx-auto text-sm leading-relaxed'>
          Where premium fabric meets modern style — T-shirts, gym tank tops, and jeans built for men who value quality in every thread.
        </motion.p>
      </motion.section>

      {/* Stats bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='border-b border-gray-100 py-8 px-4 bg-white'
      >
        <div className='max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center'>
          {stats.map(({ value, label }) => (
            <div key={label}>
              <p className='font-serif text-3xl font-bold text-gray-900'>{value}</p>
              <p className='text-gray-400 text-xs tracking-widest uppercase mt-1'>{label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Main content */}
      <section className='max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row gap-16 items-center'>
        <motion.div
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className='lg:w-1/2 w-full'
        >
          <div className='relative group'>
            <div className='absolute -inset-1 bg-gradient-to-br from-gray-200 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
            <img
              src={aboutData?.image || assets.about_img}
              alt='About VibeCulture'
              className='relative w-full h-[420px] object-cover rounded-2xl border border-gray-200'
            />
            <div className='absolute bottom-4 left-4 bg-white rounded-xl px-4 py-3 border border-gray-200 shadow-sm'>
              <p className='text-gray-900 text-xs tracking-widest uppercase font-semibold'>Est. 2020</p>
              <p className='text-gray-500 text-xs mt-0.5'>Premium Men's Clothing</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          className='lg:w-1/2 w-full space-y-6'
        >
          {aboutData?.content ? (
            <div className='text-gray-600 leading-relaxed' dangerouslySetInnerHTML={{ __html: aboutData.content }} />
          ) : (
            <>
              <h2 className='font-serif text-3xl font-bold text-gray-900'>Premium Quality. Real Comfort.</h2>
              <p className='text-gray-500 leading-relaxed'>
                Welcome to <span className='font-semibold text-gray-900'>VibeCulture</span> — India's destination for premium men's clothing. We craft T-shirts, gym tank tops, and jeans that combine superior fabric quality with modern style.
              </p>
              <p className='text-gray-500 leading-relaxed'>
                Our 240 GSM cotton tees are thicker, softer, and longer-lasting than standard tees. Our gym tank tops are cut for performance. Our jeans are built for real life — durable, comfortable, and sharp.
              </p>
              <div className='bg-gray-50 rounded-2xl p-5 border border-gray-200'>
                <p className='text-gray-900 text-xs tracking-widest uppercase font-semibold mb-2'>Our Mission</p>
                <p className='text-gray-500 text-sm leading-relaxed'>
                  To make premium-quality men's clothing accessible to everyone. Great fabric shouldn't cost a fortune — that's the VibeCulture promise.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </section>

      {/* Why choose us */}
      <section className='bg-gray-50 py-20 px-4 border-t border-gray-100'>
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className='text-center mb-12'
        >
          <Title text1='WHY CHOOSE' text2='VIBECULTURE' />
          <p className='text-gray-500 text-sm mt-3 max-w-md mx-auto'>
            Built different. Crafted better. Worn with confidence.
          </p>
        </motion.div>

        <div className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
          {features.map(({ icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className='bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-300 card-lift text-center group shadow-sm'
            >
              <div className='w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl mx-auto mb-5 group-hover:bg-gray-200 transition-colors duration-300'>
                {icon}
              </div>
              <h3 className='text-gray-900 font-semibold mb-3'>{title}</h3>
              <p className='text-gray-500 text-sm leading-relaxed'>{desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className='mt-12 flex flex-wrap justify-center gap-6 text-xs text-gray-500'
        >
          {['240 GSM Fabric', 'Fast Delivery', 'Easy Returns', '24/7 Support'].map((badge, i) => (
            <div key={badge} className='flex items-center gap-2'>
              <span className={`w-2 h-2 rounded-full ${['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-gray-800'][i]}`} />
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
