import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProductItem = ({ id, image, name, price, bestseller }) => {
  const { currency } = useContext(ShopContext)
  const [wishlist, setWishlist] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className='card-lift'
    >
      <Link
        onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
        to={`/product/${id}`}
        className='block group'
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Image container */}
        <div className='relative overflow-hidden rounded-2xl bg-[#12121a] border border-[#c9a84c]/10 group-hover:border-[#c9a84c]/40 transition-all duration-500'>

          {/* Badges */}
          <div className='absolute top-3 left-3 z-10 flex flex-col gap-1.5'>
            {bestseller && (
              <span className='bg-gradient-to-r from-[#c9a84c] to-[#f0d080] text-[#0a0a0f] text-[9px] font-black px-2.5 py-1 rounded-full tracking-wider uppercase'>
                🔥 Bestseller
              </span>
            )}
            <span className='glass text-[#c9a84c] text-[9px] font-bold px-2.5 py-1 rounded-full tracking-wider uppercase border border-[#c9a84c]/30'>
              ✦ New
            </span>
          </div>

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); setWishlist(!wishlist) }}
            className='absolute top-3 right-3 z-10 w-8 h-8 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-[#c9a84c]/20'
          >
            <motion.span animate={{ scale: wishlist ? [1, 1.4, 1] : 1 }} className='text-sm'>
              {wishlist ? '❤️' : '🤍'}
            </motion.span>
          </button>

          {/* Shimmer skeleton */}
          {!imgLoaded && <div className='shimmer w-full aspect-square rounded-2xl' />}

          {/* Product image */}
          <img
            onLoad={() => setImgLoaded(true)}
            src={image[0]}
            alt={name}
            className={`w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110 ${imgLoaded ? 'block' : 'hidden'}`}
          />

          {/* Gold shimmer overlay on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className='absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-[#0a0a0f]/20 to-transparent'
          />

          {/* Quick view pill */}
          <motion.div
            animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className='absolute bottom-4 left-0 right-0 flex justify-center'
          >
            <span className='btn-gold text-[10px] px-5 py-2 rounded-full tracking-widest uppercase'>
              View Details
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className='pt-3 px-1'>
          <p className='text-white/80 text-sm font-light line-clamp-2 group-hover:text-[#c9a84c] transition-colors duration-300 leading-snug'>
            {name}
          </p>
          <div className='flex items-center justify-between mt-2'>
            <p className='font-serif text-lg font-semibold gold-text'>{currency}{price}</p>
            <div className='flex gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-[10px] ${i < 4 ? 'text-[#c9a84c]' : 'text-white/20'}`}>★</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductItem
