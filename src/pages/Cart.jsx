import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'
import { motion, AnimatePresence } from 'framer-motion'

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    if (products.length > 0) {
      const tempData = []
      for (const items in cartItems)
        for (const item in cartItems[items])
          if (cartItems[items][item] > 0)
            tempData.push({ _id: items, size: item, quantity: cartItems[items][item] })
      setCartData(tempData)
    }
  }, [cartItems, products])

  const getItemPrice = (p, size) => p?.variants?.[size] ? p.variants[size].price : p?.price || 0
  const getVariantInfo = (p, size) => p?.variants?.[size]?.attributes || null

  return (
    <div className='min-h-screen bg-gray-50 pt-6 pb-20 px-4 sm:px-6'>
      <div className='max-w-5xl mx-auto'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='py-10 border-b border-gray-200 mb-8'>
          <Title text1='YOUR' text2='CART' />
        </motion.div>

        {cartData.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className='text-center py-24'>
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className='text-7xl mb-6 inline-block'>🛒</motion.div>
            <h3 className='font-serif text-2xl text-gray-700 italic mb-3'>Your cart is empty</h3>
            <p className='text-gray-500 text-sm mb-8'>Discover something you'll love</p>
            <button onClick={() => navigate('/collection')} className='bg-gray-900 text-white hover:bg-black px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all'>
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <>
            <div className='space-y-3 mb-10'>
              <AnimatePresence>
                {cartData.map((item, index) => {
                  const productData = products.find(p => p._id === item._id)
                  if (!productData) return null
                  const itemPrice = getItemPrice(productData, item.size)
                  const variantInfo = getVariantInfo(productData, item.size)

                  return (
                    <motion.div key={`${item._id}-${item.size}`}
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className='bg-white rounded-2xl p-4 border border-gray-100 hover:border-gray-300 transition-all duration-300 flex items-center gap-4 shadow-sm'>

                      {/* Image */}
                      <div className='w-16 sm:w-20 flex-shrink-0 rounded-xl overflow-hidden border border-gray-100'>
                        <img src={productData.image[0]} alt='' className='w-full aspect-square object-cover' />
                      </div>

                      {/* Info */}
                      <div className='flex-1 min-w-0'>
                        <p className='text-gray-800 text-sm font-medium line-clamp-1'>{productData.name}</p>
                        <div className='flex flex-wrap items-center gap-2 mt-1'>
                          <span className='font-serif text-base font-semibold text-gray-900'>{currency}{itemPrice}</span>
                          {variantInfo ? variantInfo.map((a, i) => (
                            <span key={i} className='bg-gray-100 text-gray-700 text-[10px] px-2 py-0.5 rounded-full border border-gray-200'>
                              {a.attributeName}: {a.variantValue}
                            </span>
                          )) : (
                            <span className='bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded-full border border-gray-200'>{item.size}</span>
                          )}
                        </div>
                        <p className='text-gray-500 text-xs mt-1'>Subtotal: {currency}{itemPrice * item.quantity}</p>
                      </div>

                      {/* Qty controls */}
                      <div className='flex items-center gap-1 bg-gray-50 rounded-full px-2 py-1 border border-gray-200'>
                        <button onClick={() => item.quantity > 1 && updateQuantity(item._id, item.size, item.quantity - 1)}
                          className='w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#0d6b9f] transition-colors font-bold text-lg'>−</button>
                        <span className='w-6 text-center text-sm text-gray-700 font-medium'>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                          className='w-6 h-6 flex items-center justify-center text-gray-600 hover:text-[#0d6b9f] transition-colors font-bold text-lg'>+</button>
                      </div>

                      {/* Delete */}
                      <button onClick={() => updateQuantity(item._id, item.size, 0)}
                        className='p-2 text-gray-400 hover:text-red-400 transition-colors duration-200'>
                        <img src={assets.bin_icon} className='w-4 invert opacity-30 hover:opacity-70 transition-opacity' alt='Remove' />
                      </button>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            <div className='flex justify-end'>
              <div className='w-full sm:w-[420px]'>
                <div className='bg-white rounded-2xl p-6 border border-gray-100 mb-4 shadow-sm'>
                  <CartTotal />
                </div>
                <button onClick={() => navigate('/place-order')}
                  className='w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl text-sm tracking-widest uppercase font-bold mb-3 transition-all duration-300'>
                  Proceed to Checkout →
                </button>
                <button onClick={() => navigate('/collection')}
                  className='w-full bg-white text-gray-600 hover:text-gray-900 py-3 rounded-2xl text-sm tracking-wider border border-gray-200 hover:border-gray-400 transition-all duration-300'>
                  Continue Shopping
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
