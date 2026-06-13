import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import RelatedProducts from '../components/RelatedProducts'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const Product = () => {
  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [availableVariants, setAvailableVariants] = useState([])
  const [selectedAttributes, setSelectedAttributes] = useState({})
  const [attributeOptions, setAttributeOptions] = useState([])
  const [activeTab, setActiveTab] = useState('description')
  const [wishlist, setWishlist] = useState(false)
  const [addedAnim, setAddedAnim] = useState(false)

  const setupAttributeOptions = (variants) => {
    const attributes = {}
    variants.forEach(v => v.attributes.forEach(a => {
      if (!attributes[a.attributeName]) attributes[a.attributeName] = new Set()
      attributes[a.attributeName].add(a.variantValue)
    }))
    setAttributeOptions(Object.keys(attributes).map(name => ({ name, values: Array.from(attributes[name]) })))
  }

  useEffect(() => {
    const item = products.find(i => i._id === productId)
    if (item) {
      setProductData(item)
      setImage(item.image[0])
      if (item.variants?.length > 0) {
        setAvailableVariants(item.variants)
        setupAttributeOptions(item.variants)
        setSelectedVariant(null)
      }
    }
  }, [productId, products])

  const handleAttributeChange = (attributeName, value) => {
    const newSelected = { ...selectedAttributes, [attributeName]: value }
    setSelectedAttributes(newSelected)
    if (attributeOptions.every(a => newSelected[a.name])) {
      const match = availableVariants.find(v => v.attributes.every(a => newSelected[a.attributeName] === a.variantValue))
      setSelectedVariant(match || null)
    } else setSelectedVariant(null)
  }

  const hasVariants = availableVariants.length > 0

  const handleAddToCart = () => {
    if (hasVariants) {
      if (!selectedVariant) { toast.error('Please select all options'); return }
      if (selectedVariant.quantity === 0) { toast.error('Out of stock'); return }
      addToCart(productData._id, availableVariants.indexOf(selectedVariant).toString())
    } else {
      addToCart(productData._id, '0')
    }
    setAddedAnim(true)
    setTimeout(() => setAddedAnim(false), 1500)
    toast.success(
      <div className='flex items-center gap-3'>
        <img src={productData.image[0]} alt='' className='w-10 h-10 object-cover rounded-lg' />
        <div>
          <p className='font-semibold text-sm'>{productData.name}</p>
          <p className='text-xs text-gray-400'>Added to cart!</p>
        </div>
      </div>
    )
  }

  if (!productData) return <div className='min-h-screen bg-gray-50' />

  const currentPrice = selectedVariant ? selectedVariant.price : productData.price

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productData.name,
    image: productData.image,
    description: String(productData.description || '').replace(/<[^>]+>/g, '').slice(0, 300),
    sku: String(selectedVariant?.sku || productData._id),
    brand: { '@type': 'Brand', name: 'VibeCulture' },
    offers: {
      '@type': 'Offer',
      price: String(currentPrice),
      priceCurrency: 'INR',
      availability: (selectedVariant ? selectedVariant.quantity > 0 : productData.variants?.some(v => v.quantity > 0))
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: 'https://www.vibeculture.in/product/' + (productData.seo?.slug || productData._id)
    },
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.5', reviewCount: '122' }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='min-h-screen bg-gray-50 pt-6 pb-20 px-4 sm:px-6'>
      <Helmet>
        <title>{productData.seo?.metaTitle || `${productData.name} | VibeCulture`}</title>
        <meta name="description" content={productData.seo?.metaDescription || `Buy ${productData.name} at VibeCulture. ${String(productData.description || '').replace(/<[^>]+>/g, '').slice(0, 120)}`} />
        {productData.seo?.metaKeywords && <meta name="keywords" content={productData.seo.metaKeywords} />}
        <link rel="canonical" href={productData.seo?.canonicalUrl || `https://www.vibeculture.in/product/${productData._id}`} />
        <meta property="og:title" content={productData.seo?.metaTitle || productData.name} />
        <meta property="og:description" content={productData.seo?.metaDescription || String(productData.description || '').replace(/<[^>]+>/g, '').slice(0, 160)} />
        <meta property="og:image" content={productData.seo?.ogImage || productData.image?.[0]} />
        <meta property="og:url" content={`https://www.vibeculture.in/product/${productData.seo?.slug || productData._id}`} />
        <meta property="og:type" content="product" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Helmet>

      <div className='max-w-6xl mx-auto'>
        <div className='flex gap-8 lg:gap-16 flex-col lg:flex-row'>

          {/* Images */}
          <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
            <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18%] w-full gap-2'>
              {productData.image.map((img, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setImage(img)}
                  className={`flex-shrink-0 w-[22%] sm:w-full sm:mb-2 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${image === img ? 'border-gray-900' : 'border-transparent hover:border-gray-300'}`}>
                  <img src={img} alt='' className='w-full aspect-square object-cover' />
                </motion.div>
              ))}
            </div>

            <div className='w-full sm:w-[80%] relative'>
              <AnimatePresence mode='wait'>
                <motion.img key={image}
                  initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  src={image} alt={productData.name}
                  className='w-full rounded-2xl object-contain max-h-[520px] bg-white border border-gray-200 shadow-sm'
                />
              </AnimatePresence>

              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setWishlist(!wishlist)}
                className='absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-400 transition-all duration-300 shadow-sm'>
                <motion.span animate={{ scale: wishlist ? [1, 1.5, 1] : 1 }} className='text-lg'>
                  {wishlist ? '❤️' : '🤍'}
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className='flex-1 lg:max-w-md'>

            <span className='inline-block bg-gray-100 text-gray-700 text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border border-gray-200 mb-4'>
              ✦ {typeof productData.category === 'object' ? productData.category.name : productData.category}
            </span>

            <h1 className='font-serif text-3xl sm:text-4xl font-light text-gray-900 leading-tight mb-3 italic'>
              {productData.name}
            </h1>

            <div className='flex items-center gap-2 mb-5'>
              <div className='flex gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < 4 ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <span className='text-gray-400 text-xs'>(122 reviews)</span>
            </div>

            <div className='flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-200'>
              <span className='font-serif text-4xl font-bold text-gray-900'>{currency}{currentPrice}</span>
              {selectedVariant && (
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${selectedVariant.quantity > 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                  {selectedVariant.quantity > 0 ? `${selectedVariant.quantity} in stock` : 'Out of stock'}
                </span>
              )}
            </div>

            {availableVariants.length > 0 && (
              <div className='space-y-5 mb-7'>
                {attributeOptions.map((attr, i) => (
                  <div key={i}>
                    <p className='text-gray-500 text-xs tracking-widest uppercase mb-3'>{attr.name}</p>
                    <div className='flex flex-wrap gap-2'>
                      {attr.values.map((val, j) => (
                        <motion.button key={j} whileTap={{ scale: 0.95 }}
                          onClick={() => handleAttributeChange(attr.name, val)}
                          className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 border ${
                            selectedAttributes[attr.name] === val
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-gray-500 hover:text-gray-900'
                          }`}>
                          {val}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <motion.button
              onClick={handleAddToCart}
              disabled={hasVariants ? (!selectedVariant || selectedVariant?.quantity === 0) : false}
              whileTap={{ scale: 0.97 }}
              animate={addedAnim ? { scale: [1, 1.05, 1] } : {}}
              className='w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl text-sm tracking-widest uppercase font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 mb-4'>
              {addedAnim ? '✓ Added to Cart!' : (hasVariants && selectedVariant?.quantity === 0) ? 'Out of Stock' : '🛒 Add to Cart'}
            </motion.button>

            <button className='w-full bg-white text-gray-600 hover:text-gray-900 py-3.5 rounded-2xl text-sm tracking-widest uppercase border border-gray-200 hover:border-gray-400 transition-all duration-300'>
              ♡ Add to Wishlist
            </button>

            <div className='grid grid-cols-3 gap-2 mt-6'>
              {[['🔒', 'Secure Pay'], ['🚚', 'Fast Ship'], ['↩️', '7-Day Return']].map(([icon, text]) => (
                <div key={text} className='bg-gray-50 rounded-xl p-3 text-center border border-gray-100'>
                  <div className='text-lg mb-1'>{icon}</div>
                  <div className='text-gray-500 text-[10px] tracking-wider'>{text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className='mt-16'>
          <div className='flex gap-1 border-b border-gray-200'>
            {['description', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-xs tracking-widest uppercase transition-all duration-300 rounded-t-xl ${
                  activeTab === tab
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}>
                {tab === 'reviews' ? 'Reviews (122)' : 'Description'}
              </button>
            ))}
          </div>

          <div className='bg-white rounded-b-2xl rounded-tr-2xl p-6 border border-gray-200 border-t-0 shadow-sm'>
            {activeTab === 'description' ? (
              <div className='text-gray-600 text-sm leading-relaxed font-light'
                dangerouslySetInnerHTML={{ __html: productData.description || 'No description available.' }} />
            ) : (
              <div className='space-y-4'>
                {[['Priya S.', 5, 'Amazing quality! Exactly as described. The fabric is so soft and thick. Will buy again.'],
                  ['Rahul M.', 4, 'Great product, fast delivery. The fit is perfect. Very happy with my purchase.'],
                  ['Anita K.', 5, 'Love it! The 240 GSM fabric is premium quality. Totally worth the price.']
                ].map(([name, stars, review]) => (
                  <div key={name} className='bg-gray-50 rounded-xl p-4 border border-gray-100'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span className='text-gray-900 text-sm font-medium'>{name}</span>
                      <div className='flex gap-0.5'>
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-xs ${i < stars ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className='text-gray-500 text-sm font-light'>{review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>
    </motion.div>
  )
}

export default Product
