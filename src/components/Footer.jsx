import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'

const Footer = () => {
  const [logo, setLogo] = useState()
  const { backendUrl } = useContext(ShopContext)

  useEffect(() => {
    axios.get(backendUrl + '/api/header/get').then(r => r.data.success && r.data.data && setLogo(r.data.data.logo)).catch(() => {})
  }, [])

  return (
    <footer className='bg-white border-t border-gray-100'>
      <div className='h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent' />

      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* Brand */}
          <div className='lg:col-span-2'>
            <div className='flex items-center gap-3 mb-5'>
              {logo
                ? <img src={logo} className='h-14 w-auto object-contain' alt='VibeCulture' />
                : <img src='/logo.png' className='h-14 w-auto object-contain' alt='VibeCulture' />
              }
            </div>
            <p className='text-gray-500 text-sm leading-relaxed max-w-xs font-light mb-2'>
              Premium men's clothing — T-shirts, gym tank tops & jeans.
            </p>
            <p className='text-gray-400 text-sm leading-relaxed max-w-xs font-light mb-6'>
              Crafted with 240 GSM comfort for those who value quality and style.
            </p>
            <div className='flex gap-3'>
              {[['📘', 'Facebook'], ['📸', 'Instagram'], ['🐦', 'Twitter'], ['▶️', 'YouTube']].map(([icon, label]) => (
                <motion.a key={label} href='#' whileHover={{ scale: 1.1, y: -2 }}
                  className='w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 hover:border-gray-400 transition-all duration-300 text-sm'>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-gray-900 text-xs tracking-[0.25em] uppercase font-semibold mb-5'>Quick Links</h4>
            <ul className='space-y-3'>
              {[['/', 'Home'], ['/collection', 'Shop All'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className='text-gray-500 hover:text-gray-900 text-sm transition-colors duration-300 flex items-center gap-2 group'>
                    <span className='w-0 group-hover:w-3 h-[1px] bg-gray-900 transition-all duration-300' />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='text-gray-900 text-xs tracking-[0.25em] uppercase font-semibold mb-5'>Get in Touch</h4>
            <ul className='space-y-3 text-sm text-gray-500'>
              <li className='flex items-center gap-2 hover:text-gray-900 transition-colors cursor-pointer'>
                <span>📞</span> +91-1294044211
              </li>
              <li className='flex items-center gap-2 hover:text-gray-900 transition-colors cursor-pointer'>
                <span>✉️</span> support@krivante.store
              </li>
              <li className='flex items-center gap-2'>
                <span>🕐</span> 24/7 Support
              </li>
            </ul>

            <div className='mt-6'>
              <h4 className='text-gray-900 text-xs tracking-[0.25em] uppercase font-semibold mb-3'>Secure Payments</h4>
              <div className='flex gap-2'>
                {['V', 'M', 'A', 'P'].map((l, i) => (
                  <div key={i} className='w-8 h-5 bg-gray-50 rounded text-gray-600 text-[10px] font-black flex items-center justify-center border border-gray-200'>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-gray-100 py-5 px-6 text-center'>
        <p className='text-gray-400 text-xs tracking-wider'>
          © 2025 VibeCulture. All rights reserved. Premium Men's Clothing ✦
        </p>
      </div>
    </footer>
  )
}

export default Footer
