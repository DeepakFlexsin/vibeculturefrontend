import React, { useState, useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
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
    <footer className='bg-[#0a0a0f] border-t border-[#c9a84c]/10'>
      {/* Top gold line */}
      <div className='h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c]/50 to-transparent' />

      <div className='max-w-7xl mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>

          {/* Brand */}
          <div className='lg:col-span-2'>
            <div className='flex items-center gap-3 mb-5'>
              {logo
                ? <img src={logo} className='h-16 w-auto object-contain' alt='Logo' />
                : <img src='/logo.png' className='h-16 w-auto object-contain' alt='Krivante' />
              }
            </div>
            <p className='text-white/40 text-sm leading-relaxed max-w-xs font-light mb-6'>
              Your one-stop destination for fashion, jewelry, accessories & more. Curated for those who love style.
            </p>
            <div className='flex gap-3'>
              {[['📘', 'Facebook'], ['📸', 'Instagram'], ['🐦', 'Twitter'], ['▶️', 'YouTube']].map(([icon, label]) => (
                <motion.a key={label} href='#' whileHover={{ scale: 1.1, y: -2 }}
                  className='w-9 h-9 glass rounded-full flex items-center justify-center border border-[#c9a84c]/10 hover:border-[#c9a84c]/40 transition-all duration-300 text-sm'>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-5'>Quick Links</h4>
            <ul className='space-y-3'>
              {[['/', 'Home'], ['/collection', 'Shop All'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className='text-white/40 hover:text-[#c9a84c] text-sm transition-colors duration-300 flex items-center gap-2 group'>
                    <span className='w-0 group-hover:w-3 h-[1px] bg-[#c9a84c] transition-all duration-300' />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className='text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-5'>Get in Touch</h4>
            <ul className='space-y-3 text-sm text-white/40'>
              <li className='flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer'>
                <span>📞</span> +91-1294044211
              </li>
              <li className='flex items-center gap-2 hover:text-[#c9a84c] transition-colors cursor-pointer'>
                <span>✉️</span> support@krivante.store
              </li>
              <li className='flex items-center gap-2'>
                <span>🕐</span> 24/7 Support
              </li>
            </ul>

            <div className='mt-6'>
              <h4 className='text-[#c9a84c] text-xs tracking-[0.25em] uppercase font-semibold mb-3'>Secure Payments</h4>
              <div className='flex gap-2'>
                {['V', 'M', 'A', 'P'].map((l, i) => (
                  <div key={i} className='w-8 h-5 glass rounded text-[#c9a84c] text-[10px] font-black flex items-center justify-center border border-[#c9a84c]/20'>
                    {l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='border-t border-[#c9a84c]/10 py-5 px-6 text-center'>
        <p className='text-white/20 text-xs tracking-wider'>
          © 2025 Krivante. All rights reserved. Made with ✦ for style lovers.
        </p>
      </div>
    </footer>
  )
}

export default Footer
