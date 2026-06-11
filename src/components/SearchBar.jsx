import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch, products, currency } = useContext(ShopContext)
  const [results, setResults] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Focus input when opened
  useEffect(() => {
    if (showSearch) {
      setTimeout(() => inputRef.current?.focus(), 100)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      setSearch('')
    }
    return () => { document.body.style.overflow = '' }
  }, [showSearch])

  // Live search results
  useEffect(() => {
    if (!search.trim()) { setResults([]); return }
    const q = search.toLowerCase()
    setResults(
      products.filter(p => p.name.toLowerCase().includes(q) || (p.category?.name || p.category || '').toLowerCase().includes(q)).slice(0, 6)
    )
  }, [search, products])

  const handleSelect = (id) => {
    setShowSearch(false)
    navigate(`/product/${id}`)
  }

  const handleViewAll = () => {
    setShowSearch(false)
    navigate(`/collection`)
  }

  return (
    <AnimatePresence>
      {showSearch && (
        <>
          {/* Backdrop */}
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowSearch(false)}
            className='fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]'
          />

          {/* Search panel */}
          <motion.div
            key='panel'
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className='fixed top-0 left-0 right-0 z-[70] glass-dark border-b border-[#c9a84c]/20 px-4 py-6 sm:px-10'
          >
            {/* Input row */}
            <div className='max-w-2xl mx-auto flex items-center gap-3'>
              <img src={assets.search_icon} className='w-5 invert opacity-50 flex-shrink-0' alt='' />
              <input
                ref={inputRef}
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Escape' && setShowSearch(false)}
                placeholder='Search products, categories...'
                className='flex-1 bg-transparent text-white placeholder-white/30 text-base outline-none'
              />
              {search && (
                <button onClick={() => setSearch('')} className='text-white/30 hover:text-white/70 transition-colors text-lg leading-none'>✕</button>
              )}
              <button
                onClick={() => setShowSearch(false)}
                className='ml-2 text-white/30 hover:text-[#c9a84c] transition-colors text-xs tracking-widest uppercase'
              >
                Close
              </button>
            </div>

            {/* Results */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className='max-w-2xl mx-auto mt-4 space-y-1'
                >
                  {results.map(item => (
                    <button
                      key={item._id}
                      onClick={() => handleSelect(item._id)}
                      className='w-full flex items-center gap-4 px-3 py-2.5 rounded-xl hover:bg-[#c9a84c]/5 hover:border-[#c9a84c]/20 border border-transparent transition-all duration-200 text-left group'
                    >
                      <img
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.name}
                        className='w-10 h-10 object-cover rounded-lg border border-white/10 flex-shrink-0'
                      />
                      <div className='flex-1 min-w-0'>
                        <p className='text-white/80 text-sm truncate group-hover:text-white transition-colors'>{item.name}</p>
                        <p className='text-white/30 text-xs'>{item.category?.name || item.category || ''}</p>
                      </div>
                      <p className='gold-text text-sm font-semibold flex-shrink-0'>{currency}{item.price}</p>
                    </button>
                  ))}

                  <button
                    onClick={handleViewAll}
                    className='w-full text-center text-[#c9a84c] text-xs tracking-widest uppercase py-3 hover:text-[#f0d080] transition-colors border-t border-[#c9a84c]/10 mt-2'
                  >
                    View all results →
                  </button>
                </motion.div>
              )}

              {search.trim() && results.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className='max-w-2xl mx-auto mt-4 text-white/30 text-sm text-center py-4'
                >
                  No products found for "<span className='text-white/50'>{search}</span>"
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SearchBar
