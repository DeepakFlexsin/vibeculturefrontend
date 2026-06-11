import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { motion } from 'framer-motion'

const BestSeller = () => {
  const { products } = useContext(ShopContext)
  const [bestSeller, setBestSeller] = useState([])

  useEffect(() => {
    setBestSeller(products.filter(i => i.bestseller).slice(0, 5))
  }, [products])

  if (!bestSeller.length) return null

  return (
    <section className='py-20 px-4 sm:px-6 bg-[#12121a] relative overflow-hidden'>
      {/* Gold line top */}
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent' />

      {/* Background pattern */}
      <div className='absolute inset-0 stripe-bg pointer-events-none opacity-50' />

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='text-center mb-12 relative z-10'>

        {/* Flame badge */}
        <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className='inline-block text-4xl mb-4'>🔥</motion.div>

        <Title text1='BEST' text2='SELLERS' />
        <p className='text-white/40 text-sm mt-3 font-light'>Most loved by our customers</p>
      </motion.div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8 max-w-7xl mx-auto relative z-10'>
        {bestSeller.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} bestseller />
          </motion.div>
        ))}
      </div>

      {/* Bottom gold line */}
      <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent' />
    </section>
  )
}

export default BestSeller
