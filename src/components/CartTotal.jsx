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
                <p className='text-gray-500'>Subtotal</p>
                <p className='text-gray-800 font-medium'>{currency} {cartAmount}.00</p>
            </div>
            <hr className='border-[#0d6b9f]/10' />
            <div className='flex justify-between'>
                <p className='text-gray-500'>Shipping Fee</p>
                <p className={deliveryFee === 0 ? 'text-green-600 font-semibold' : 'text-gray-800 font-medium'}>
                  {deliveryFee === 0 ? 'FREE' : `${currency} ${deliveryFee}.00`}
                </p>
            </div>
            {cartAmount > 0 && cartAmount < free_delivery_threshold && (
              <div className='text-xs text-[#0d6b9f]/80 glass border border-[#0d6b9f]/15 p-2.5 rounded-xl'>
                Add {currency}{(free_delivery_threshold - cartAmount).toFixed(0)} more for FREE delivery!
              </div>
            )}
            <hr className='border-[#0d6b9f]/10' />
            <div className='flex justify-between'>
                <p className='text-gray-900 font-bold'>Total</p>
                <p className='teal-text font-bold text-lg'>{currency} {cartAmount === 0 ? 0 : cartAmount + deliveryFee}.00</p>
            </div>
      </div>
    </div>
  )
}

export default CartTotal
