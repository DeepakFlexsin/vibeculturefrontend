import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className='flex flex-col items-center gap-2 mb-2'>
      <div className='flex items-center gap-3'>
        <div className='w-8 h-[1px] bg-gradient-to-r from-transparent to-gray-400' />
        <p className='text-gray-500 tracking-[0.2em] text-sm uppercase font-light'>
          {text1} <span className='font-bold text-gray-900 gold-shimmer'>{text2}</span>
        </p>
        <div className='w-8 h-[1px] bg-gradient-to-l from-transparent to-gray-400' />
      </div>
    </div>
  )
}

export default Title
