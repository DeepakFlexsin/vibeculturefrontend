import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col items-center gap-2 mb-2'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-[1px] bg-gradient-to-r from-transparent to-[#c9a84c]' />
        <p className='text-gray-400 tracking-[0.2em] text-sm uppercase font-light'>
          {text1} <span className='gold-text font-semibold'>{text2}</span>
        </p>
        <div className='w-8 h-[1px] bg-gradient-to-l from-transparent to-[#c9a84c]' />
      </div>
    </div>
  )
}

export default Title
