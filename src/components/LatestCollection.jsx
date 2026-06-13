import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'

const TAGS = ['All', 'T-Shirts', 'Jeans', 'Combos', 'Premium', 'Sale', 'New', 'Trending']

const LatestCollection = () => {
  const { products } = useContext(ShopContext)
  const [latest, setLatest] = useState([])
  const [activeTag, setActiveTag] = useState('All')

  useEffect(() => { setLatest(products.slice(0, 10)) }, [products])

  return (
    <section className='py-20 px-4 sm:px-6 bg-gray-50 relative overflow-hidden'>
      {/* Subtle bg glow */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent' />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='text-center mb-12'>
        <Title text1='LATEST' text2='ARRIVALS' />
        <p className='text-gray-600 text-sm mt-4 max-w-md mx-auto font-light leading-relaxed'>
          Fresh styles every week — premium t-shirts, quality jeans, and curated collections
        </p>

        {/* Filter tags */}
        <div className='flex flex-wrap justify-center gap-2 mt-8'>
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-300 ${
                activeTag === tag
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-400'
              }`}>
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8 max-w-7xl mx-auto'>
        {latest.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
            <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} bestseller={item.bestseller} />
          </motion.div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className='mt-16 flex items-center gap-4 max-w-7xl mx-auto'>
        <div className='flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#0d6b9f]/20' />
        <span className='text-gray-400 text-xs tracking-widest uppercase'>✦ More Collections ✦</span>
        <div className='flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#0d6b9f]/20' />
      </div>
    </section>
  )
}

export default LatestCollection
