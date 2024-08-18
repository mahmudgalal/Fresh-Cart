import React from 'react'
import { Link } from 'react-router-dom'

export default function RecentProducts({product}) {
  return <>
    
        <div className=' md:mx-0 w-1/2 md:w-1/3 lg:w-1/4 my-3 px-2'>
           <div className='overflow-hidden product shadow-lg px-3'>
                <Link to={`/productdetails/${product.category.name}/${product.id}`}>
            <div>
               <img src={product.imageCover} className='w-full h-[300px]'/>
               <p className='text-main text-sm'>{product.category.name}</p>
               <h2>{product.title.split(' ').slice(0 , 3).join(' ')}</h2>
               <div className='flex justify-between mt-2'>
                 <h3 className='text-fa-bold'>{product.price}EGP</h3>
                 <h3><i className='fas fa-star rating-color'></i> {product.ratingsAverage}</h3>
               </div>
            </div>
            </Link>
             <button className='btn w-full bg-main text-white rounded my-2 py-2'>Add to Cart</button>
           </div>
        </div>
       
  </>
}
