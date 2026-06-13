import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const inputCls = 'w-full bg-gray-50 border border-[#0d6b9f]/25 rounded-xl py-3 px-4 text-gray-900 text-base placeholder-gray-400 focus:outline-none focus:border-[#0d6b9f]/70 focus:ring-1 focus:ring-[#0d6b9f]/30 transition-all duration-300'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const url = currentState === 'Sign Up' ? '/api/user/register' : '/api/user/login'
      const payload = currentState === 'Sign Up' ? { name, email, password } : { email, password }
      const { data } = await axios.post(backendUrl + url, payload)
      if (data.success) {
        setToken(data.token)
        localStorage.setItem('token', data.token)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => { if (token) navigate('/') }, [token])

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16'>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className='w-full max-w-md'>

        {/* Header */}
        <div className='text-center mb-10'>
          <img src='/logo.png' className='h-20 w-auto object-contain mx-auto mb-5' alt='Krivante' />
          <h1 className='font-serif text-3xl font-bold text-gray-900 mb-2'>
            {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className='text-gray-600 text-sm'>
            {currentState === 'Login' ? 'Sign in to your VibeCulture account' : 'Join VibeCulture today'}
          </p>
        </div>

        {/* Card */}
        <div className='bg-white rounded-3xl p-8 border border-gray-100 shadow-sm'>
          <form onSubmit={onSubmitHandler} className='space-y-4'>
            {currentState === 'Sign Up' && (
              <div>
                <label className='text-gray-600 text-xs tracking-widest uppercase mb-2 block'>Full Name</label>
                <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Your name' className={inputCls} required />
              </div>
            )}
            <div>
              <label className='text-gray-600 text-xs tracking-widest uppercase mb-2 block'>Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type='email' placeholder='you@example.com' className={inputCls} required />
            </div>
            <div>
              <label className='text-gray-600 text-xs tracking-widest uppercase mb-2 block'>Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='••••••••' className={inputCls} required />
            </div>

            {currentState === 'Login' && (
              <div className='text-right'>
                <span className='text-[#0d6b9f]/60 text-xs cursor-pointer hover:text-[#0d6b9f] transition-colors'>Forgot password?</span>
              </div>
            )}

            <motion.button type='submit' whileTap={{ scale: 0.98 }} disabled={loading}
              className='w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-2xl text-sm tracking-widest uppercase mt-2 disabled:opacity-60 font-bold transition-all duration-300'>
              {loading ? '...' : currentState === 'Login' ? 'Sign In ✦' : 'Create Account ✦'}
            </motion.button>
          </form>

          <div className='mt-6 text-center'>
            <span className='text-gray-500 text-sm'>
              {currentState === 'Login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <span onClick={() => setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login')}
              className='text-[#0d6b9f] text-sm cursor-pointer hover:text-[#0d6b9f]/80 transition-colors'>
              {currentState === 'Login' ? 'Sign Up' : 'Sign In'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
