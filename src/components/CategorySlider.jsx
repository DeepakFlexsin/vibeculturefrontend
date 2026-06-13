import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

const CategorySlider = () => {
  const [categories, setCategories] = useState([])
  const { backendUrl } = useContext(ShopContext)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(backendUrl + '/api/category/list')
      .then(r => r.data.success && setCategories(r.data.categories.filter(c => c.image)))
      .catch(() => {})
  }, [])

  if (!categories.length) return null

  return (
    <section className='py-20 bg-white relative overflow-hidden'>
      <div className='absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent' />

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className='text-center mb-10 px-4'>
        <p className='text-gray-400 text-xs tracking-[0.3em] uppercase mb-2'>Browse</p>
        <h2 className='font-serif text-3xl sm:text-4xl font-light text-gray-900 italic'>
          Shop by <span className='font-bold not-italic'>Category</span>
        </h2>
      </motion.div>

      <div className='flex overflow-x-auto gap-5 px-6 sm:px-10 pb-4 scrollbar-hide'>
        {categories.map((cat, i) => (
          <motion.div key={cat._id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.07 }}
            onClick={() => { navigate(`/collection?category=${cat._id}`); window.scrollTo(0, 0) }}
            className='flex-shrink-0 text-center cursor-pointer group'
          >
            <div className='relative w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-3'>
              {/* Teal ring on hover */}
              <div className='absolute inset-0 rounded-full border-2 border-gray-900/0 group-hover:border-gray-900/30 transition-all duration-500 scale-110' />
              <div className='w-full h-full rounded-full overflow-hidden border border-gray-200 group-hover:border-gray-400 transition-all duration-400 shadow-lg group-hover:shadow-xl'>
                <img src={cat.image} alt={cat.name}
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-600' />
                <div className='absolute inset-0 rounded-full bg-gradient-to-t from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
              {/* Arrow badge */}
              <motion.div whileHover={{ scale: 1.2 }}
                className='absolute -bottom-1 -right-1 w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300'>
                →
              </motion.div>
            </div>
            <p className='text-gray-600 group-hover:text-gray-900 text-sm font-medium transition-colors duration-300 min-w-[100px]'>
              {cat.name}
            </p>
          </motion.div>
        ))}
      </div>

      <div className='absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent' />
    </section>
  )
}

export default CategorySlider
