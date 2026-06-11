import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const { currency, getCartAmount, getDeliveryFee, free_delivery_threshold } = useContext(ShopContext);
    const cartAmount = getCartAmount();
    const [deliveryFee, setDeliveryFee] = useState(0);

    useEffect(() => {
        const fetchDeliveryFee = async () => {
            const fee = await getDeliveryFee(cartAmount);
            setDeliveryFee(fee);
        };
        fetchDeliveryFee();
    }, [cartAmount, getDeliveryFee]);

  return (
    <div className='w-full'>
      <div className='text-xl mb-4'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-3 text-sm'>
            <div className='flex justify-between'>
                <p className='text-white/50'>Subtotal</p>
                <p className='text-white/80 font-medium'>{currency} {cartAmount}.00</p>
            </div>
            <hr className='border-[#c9a84c]/10' />
            <div className='flex justify-between'>
                <p className='text-white/50'>Shipping Fee</p>
                <p className={deliveryFee === 0 ? 'text-green-400 font-semibold' : 'text-white/80 font-medium'}>
                  {deliveryFee === 0 ? 'FREE' : `${currency} ${deliveryFee}.00`}
                </p>
            </div>
            {cartAmount > 0 && cartAmount < free_delivery_threshold && (
              <div className='text-xs text-[#c9a84c]/80 glass border border-[#c9a84c]/15 p-2.5 rounded-xl'>
                Add {currency}{(free_delivery_threshold - cartAmount).toFixed(0)} more for FREE delivery!
              </div>
            )}
            <hr className='border-[#c9a84c]/10' />
            <div className='flex justify-between'>
                <p className='text-white font-bold'>Total</p>
                <p className='gold-text font-bold text-lg'>{currency} {cartAmount === 0 ? 0 : cartAmount + deliveryFee}.00</p>
            </div>
      </div>
    </div>
  )
}

export default CartTotal
