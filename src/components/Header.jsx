//rafce
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { searchProduct } from '../redux/slices/productSlice'

const Header = ({insideHome}) => {
  const dispatch = useDispatch()
  const userWishlist = useSelector(state=>state.wishlistReducer)
  return (
    <nav className='flex bg-yellow-600 fixed w-full p-5 text-white font-bold'>
      <Link className='text-2xl font-bold' to={'/'}> <i className="fa-solid fa-utensils me-1"></i> Yumzy </Link>
      <ul className='flex-1 text-right justify-end hidden sm:flex'>
        { insideHome && <li className='list-none inline-block px-5 text-black'><input style={{width:'300px'}} onChange={e=>dispatch(searchProduct(e.target.value.toLowerCase()))} className='rounded p-1' type="text" placeholder='Search cuisines Here!' /></li>}
        <li className='list-none inline-block mt-3'><Link to={"/wishlist"}><i className="fa-solid fa-heart text-red-600"></i> Favourites <span className='bg-black text-white rounded p-1'>{userWishlist?.length}</span></Link></li>
      </ul>

      <ul className='flex-col sm:hidden flex items-center text-center'>
        { insideHome && (
          <li className='list-none mb-3'>
            <input
              style={{ width: '250px' }}
              onChange={e => dispatch(searchProduct(e.target.value.toLowerCase()))}
              className='rounded p-1'
              type="text"
              placeholder='Search cuisines Here!'
            />
          </li>
        )}

        <li className='list-none mb-3'>
          <Link to={"/wishlist"}>
            <i className="fa-solid fa-heart text-red-600"></i> Favourites 
            <span className='bg-black text-white rounded p-1'>{userWishlist?.length}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header