import React from 'react'
import { Link } from 'react-router-dom'

export default function RecentProducts({product}) {
  return <>
    
        <div className='mx-16 md:mx-0 w-full md:w-1/3 lg:w-1/5 my-3 product px-3'>
           <div>
                <Link to={`productdetails/${product.id}/${product.category}`}>
            <div>
               <img src={product.imageCover} className='w-full h-[300px]'/>
               <p className='text-main text-sm pb-2'>{product.category.name}</p>
               <h2>{product.title.split(' ').slice(0 , 3).join(' ')}</h2>
               <div className='flex justify-between my-2'>
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
