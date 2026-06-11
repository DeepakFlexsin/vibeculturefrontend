import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import Title from '../components/Title'

const inputCls = 'w-full bg-white/5 border border-[#c9a84c]/25 rounded-xl py-3 px-4 text-white text-base placeholder-white/40 focus:outline-none focus:border-[#c9a84c]/70 focus:ring-1 focus:ring-[#c9a84c]/30 transition-all duration-300'

const Profile = () => {
  const { token, navigate, backendUrl } = useContext(ShopContext)
  const [user, setUser] = useState(null)
  const [address, setAddress] = useState({
    firstName: '', lastName: '', street: '', city: '', state: '', zipcode: '', country: '', phone: ''
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!token) { navigate('/login'); return }
    axios.get(backendUrl + '/api/user/profile', { headers: { token } })
      .then(({ data }) => {
        if (data.success) {
          setUser(data.user)
          if (data.user.address) setAddress(prev => ({ ...prev, ...data.user.address }))
        }
      })
      .catch(() => toast.error('Failed to load profile'))
  }, [token])

  const onChange = e => setAddress(d => ({ ...d, [e.target.name]: e.target.value }))

  const onSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/user/profile/update', { address }, { headers: { token } })
      if (data.success) toast.success('Address saved!')
      else toast.error(data.message)
    } catch { toast.error('Failed to save') }
    setSaving(false)
  }

  if (!user) return (
    <div className='min-h-screen bg-[#0a0a0f] flex items-center justify-center'>
      <div className='w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin' />
    </div>
  )

  return (
    <div className='min-h-screen bg-[#0a0a0f] pt-6 pb-20 px-4 sm:px-6'>
      <div className='max-w-3xl mx-auto'>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className='py-10 border-b border-[#c9a84c]/10 mb-10'>
          <Title text1='MY' text2='PROFILE' />
        </motion.div>

        {/* User Info Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className='glass rounded-2xl p-6 border border-[#c9a84c]/15 mb-6'>
          <div className='flex items-center gap-5'>
            <div className='w-16 h-16 btn-gold rounded-2xl flex items-center justify-center text-[#0a0a0f] font-black text-2xl flex-shrink-0'>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className='text-white font-semibold text-xl'>{user.name}</h2>
              <p className='text-white/40 text-sm mt-0.5'>{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Address Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className='glass rounded-2xl p-6 border border-[#c9a84c]/15'>
          <div className='flex items-center gap-3 mb-6'>
            <span className='w-7 h-7 btn-gold rounded-full flex items-center justify-center text-xs font-black'>📍</span>
            <h3 className='text-white font-semibold tracking-wider text-sm uppercase'>Saved Address</h3>
          </div>

          <form onSubmit={onSave} className='space-y-3'>
            <div className='flex gap-3'>
              <input name='firstName' value={address.firstName} onChange={onChange} placeholder='First name' className={inputCls} />
              <input name='lastName' value={address.lastName} onChange={onChange} placeholder='Last name' className={inputCls} />
            </div>
            <input name='phone' value={address.phone} onChange={onChange} placeholder='Phone number' className={inputCls} />
            <input name='street' value={address.street} onChange={onChange} placeholder='Street address' className={inputCls} />
            <div className='flex gap-3'>
              <input name='city' value={address.city} onChange={onChange} placeholder='City' className={inputCls} />
              <input name='state' value={address.state} onChange={onChange} placeholder='State' className={inputCls} />
            </div>
            <div className='flex gap-3'>
              <input name='zipcode' value={address.zipcode} onChange={onChange} placeholder='Zipcode' className={inputCls} />
              <input name='country' value={address.country} onChange={onChange} placeholder='Country' className={inputCls} />
            </div>

            <motion.button type='submit' whileTap={{ scale: 0.98 }} disabled={saving}
              className='w-full btn-gold py-3.5 rounded-2xl text-sm tracking-widest uppercase mt-2 disabled:opacity-60'>
              {saving ? 'Saving...' : 'Save Address ✦'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
