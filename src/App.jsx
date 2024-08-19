import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Products from './Components/Products/Products.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import CounterContextProvider from './Context/CounterContext.jsx'
import AuthContextProvider from './Context/AuthContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProtectedLogin from './Components/ProtectedLogin/ProtectedLogin.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import SubCategory from './Components/SubCategory/SubCategory.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import WishlistContextProvider from './Context/WishlistContext.jsx'
import Wishlist from './Components/Wishlist/Wishlist.jsx'

let query = new QueryClient()

let routers = createHashRouter([
  {path: '' , element: <Layout/>, children :[
    {index: true , element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'cart' , element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'wishlist' , element:<ProtectedRoute><Wishlist/></ProtectedRoute>},
    {path:'products' , element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'productdetails/:category/:id' , element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'categories' , element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'categories/:id' , element:<ProtectedRoute><SubCategory/></ProtectedRoute>},
    {path:'brands' , element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'login' , element:<ProtectedLogin><Login/></ProtectedLogin>},
    {path: 'register' , element:<ProtectedLogin><Register/></ProtectedLogin>},
    {path:'*' , element:<Notfound/>},
  ]}
])

function App() {

      return  <QueryClientProvider client={query}>
          <AuthContextProvider>
    <CounterContextProvider>
       <WishlistContextProvider>
          <CartContextProvider>
        <RouterProvider router={routers}></RouterProvider>
        <Toaster />
          </CartContextProvider>
       </WishlistContextProvider>
    </CounterContextProvider>
    </AuthContextProvider>
      </QueryClientProvider>
}

export default App
