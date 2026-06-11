import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const Collection = () => {
  const { products, search, showSearch, backendUrl } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relavent')
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [searchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState('')

  useEffect(() => {
    axios.get(backendUrl + '/api/category/list').then(r => r.data.success && setCategories(r.data.categories)).catch(() => {})
    axios.get(backendUrl + '/api/subcategory/list').then(r => r.data.success && setSubCategories(r.data.subCategories)).catch(() => {})
    const cat = searchParams.get('category')
    const sub = searchParams.get('subcategory')
    if (cat) { setActiveCategory(cat); setCategory([cat]) }
    if (sub) setSubCategory([sub])
  }, [searchParams])

  const applyFilter = () => {
    let copy = products.slice()
    if (showSearch && search) copy = copy.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    if (category.length > 0) {
      copy = copy.filter(i => {
        const id = typeof i.category === 'object' ? i.category._id : i.category
        const name = typeof i.category === 'object' ? i.category.name : i.category
        return category.includes(id) || category.includes(name)
      })
    }
    if (subCategory.length > 0) {
      copy = copy.filter(i => {
        const id = typeof i.subCategory === 'object' ? i.subCategory._id : i.subCategory
        return subCategory.includes(id)
      })
    }
    setFilterProducts(copy)
  }

  const sortProduct = () => {
    const copy = filterProducts.slice()
    if (sortType === 'low-high') setFilterProducts(copy.sort((a, b) => a.price - b.price))
    else if (sortType === 'high-low') setFilterProducts(copy.sort((a, b) => b.price - a.price))
    else applyFilter()
  }

  useEffect(() => { applyFilter() }, [category, subCategory, search, showSearch, products])
  useEffect(() => { sortProduct() }, [sortType])

  const activeCatName = categories.find(c => c._id === activeCategory)?.name
  const pageTitle = activeCatName ? `${activeCatName} Collection | Krivante` : 'All Collections | Krivante'
  const pageDesc = activeCatName ? `Shop ${activeCatName} at Krivante. Browse our curated selection with fast delivery across India.` : 'Browse all fashion, accessories & lifestyle collections at Krivante. Filter by category, sort by price.'

  return (
    <div className='min-h-screen bg-[#0a0a0f] pt-6 pb-20 px-4 sm:px-6'>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href="https://krivante.com/collection" />
      </Helmet>
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className='text-center py-10 border-b border-[#c9a84c]/10 mb-8'>
        <Title text1={activeCatName ? activeCatName.toUpperCase() : 'ALL'} text2='COLLECTIONS' />
        <p className='text-white/30 text-sm mt-2'>{filterProducts.length} products</p>
      </motion.div>

      <div className='flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto'>

        {/* Filter Sidebar */}
        <div className='w-full lg:w-52 flex-shrink-0'>
          <button onClick={() => setShowFilter(!showFilter)}
            className='flex items-center gap-2 text-[#c9a84c] text-xs tracking-widest uppercase font-semibold mb-4 lg:cursor-default'>
            <span>⚙ Filters</span>
            <img className={`h-2.5 lg:hidden transition-transform duration-300 invert ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
          </button>

          <div className={`${showFilter ? 'block' : 'hidden'} lg:block space-y-4`}>
            {/* Categories */}
            <div className='glass rounded-2xl p-4 border border-[#c9a84c]/10'>
              <p className='text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase font-semibold mb-3'>Categories</p>
              <div className='space-y-2'>
                {categories.map(cat => (
                  <label key={cat._id} className='flex items-center gap-2.5 cursor-pointer group'>
                    <div onClick={() => {
                      if (category.includes(cat._id)) { setCategory([]); setActiveCategory('') }
                      else { setCategory([cat._id]); setActiveCategory(cat._id) }
                    }}
                      className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                        category.includes(cat._id) ? 'bg-[#c9a84c] border-[#c9a84c]' : 'border-white/20 group-hover:border-[#c9a84c]/50'
                      }`}>
                      {category.includes(cat._id) && <span className='text-[#0a0a0f] text-[10px] font-black'>✓</span>}
                    </div>
                    <span className={`text-sm transition-colors duration-200 ${category.includes(cat._id) ? 'text-[#c9a84c]' : 'text-white/50 group-hover:text-white/80'}`}>
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sub Categories */}
            {subCategories.length > 0 && (
              <div className='glass rounded-2xl p-4 border border-[#c9a84c]/10'>
                <p className='text-[#c9a84c] text-[10px] tracking-[0.25em] uppercase font-semibold mb-3'>Sub Categories</p>
                <div className='space-y-2'>
                  {subCategories.map(sub => (
                    <label key={sub._id} className='flex items-center gap-2.5 cursor-pointer group'>
                      <div onClick={() => {
                        if (subCategory.includes(sub._id)) setSubCategory([])
                        else setSubCategory([sub._id])
                      }}
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${
                          subCategory.includes(sub._id) ? 'bg-[#c9a84c] border-[#c9a84c]' : 'border-white/20 group-hover:border-[#c9a84c]/50'
                        }`}>
                        {subCategory.includes(sub._id) && <span className='text-[#0a0a0f] text-[10px] font-black'>✓</span>}
                      </div>
                      <span className={`text-sm transition-colors duration-200 ${subCategory.includes(sub._id) ? 'text-[#c9a84c]' : 'text-white/50 group-hover:text-white/80'}`}>
                        {sub.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Products */}
        <div className='flex-1 min-w-0'>
          <div className='flex justify-end mb-6'>
            <select onChange={e => setSortType(e.target.value)}
              className='glass text-white/70 text-xs tracking-wider px-4 py-2.5 rounded-xl border border-[#c9a84c]/20 outline-none bg-transparent cursor-pointer'>
              <option value='relavent' className='bg-[#12121a]'>Sort: Relevant</option>
              <option value='low-high' className='bg-[#12121a]'>Price: Low → High</option>
              <option value='high-low' className='bg-[#12121a]'>Price: High → Low</option>
            </select>
          </div>

          <AnimatePresence mode='wait'>
            {filterProducts.length === 0 ? (
              <motion.div key='empty' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className='text-center py-24'>
                <div className='text-6xl mb-4 float inline-block'>🔍</div>
                <p className='text-white/40 text-sm'>No products found. Try adjusting filters.</p>
              </motion.div>
            ) : (
              <motion.div key='grid' initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8'>
                {filterProducts.map((item, i) => (
                  <ProductItem key={i} name={item.name} id={item._id} price={item.price} image={item.image} bestseller={item.bestseller} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Collection
