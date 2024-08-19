import React, { useContext, useEffect } from 'react'
import { CartContext } from '../../Context/CartContext'

export default function AllOrders() {
    
    let {clearCart} = useContext(CartContext);

   useEffect(() => {
    clearCart();
   })

  return (
    <div className='text-main text-6xl text-center py-40'>All Orders</div>
  )
}
