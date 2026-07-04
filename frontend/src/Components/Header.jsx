import { useState, useContext } from 'react'
import my_logo from '../Assets/logo.png'
import { ShopContext } from '../Context/ShopContext'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [isOpeon, setIsOpen] = useState(false)
  const [userDropdown, setUserDropdown] = useState(false)
  const location = useLocation()
  const path = location.pathname
  const { getTotalCartItems } = useContext(ShopContext)

  const handleLogout = () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('admin-token')
    localStorage.removeItem('user-email')
    window.location.href = '/'
  }

  return (
    <header className='bg-white/80 backdrop-blur-md shadow-sm w-full sticky top-0 z-50 transition-all border-b border-gray-100'>
      <nav className='container mx-auto px-4 md:px-6 py-3.5 flex justify-between items-center'>
        <div className='flex items-center space-x-2 shrink-0'>
          <Link to='/' className='flex items-center space-x-3 group'>
            <img src={my_logo} alt='Logo' className='w-10 md:w-11 object-contain transition-transform group-hover:scale-105 duration-300' />
            <span className='text-xl md:text-2xl font-black text-gray-900 tracking-widest bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent uppercase'>CARA</span>
          </Link>
        </div>

        <div className='hidden md:flex items-center space-x-1'>
          <ul className='flex items-center space-x-1 text-sm font-semibold text-gray-600'>
            <li>
              <Link to='/' className={`px-4 py-2 rounded-full transition-all duration-200 ${path === '/' ? 'bg-gray-900 text-white shadow-sm' : 'hover:bg-gray-100 hover:text-gray-900'}`}>Shop</Link>
            </li>
            <li>
              <Link to='/men' className={`px-4 py-2 rounded-full transition-all duration-200 ${path === '/men' ? 'bg-gray-900 text-white shadow-sm' : 'hover:bg-gray-100 hover:text-gray-900'}`}>Men</Link>
            </li>
            <li>
              <Link to='/women' className={`px-4 py-2 rounded-full transition-all duration-200 ${path === '/women' ? 'bg-gray-900 text-white shadow-sm' : 'hover:bg-gray-100 hover:text-gray-900'}`}>Women</Link>
            </li>
            <li>
              <Link to='/kids' className={`px-4 py-2 rounded-full transition-all duration-200 ${path === '/kids' ? 'bg-gray-900 text-white shadow-sm' : 'hover:bg-gray-100 hover:text-gray-900'}`}>Kids</Link>
            </li>
            <li>
              <Link to='/admin-add' className={`px-4 py-2 rounded-full font-bold transition-all duration-200 ${path === '/admin-add' ? 'bg-red-600 text-white shadow-sm' : 'text-red-500 hover:bg-red-50 hover:text-red-600'}`}>Admin</Link>
            </li>
          </ul>
        </div>

        <div className='flex items-center space-x-2 md:space-x-4'>
          <div className='hidden md:block'>
            {localStorage.getItem('auth-token') ? (
              <div className='relative'>
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className='flex items-center space-x-2.5 px-3.5 py-1.5 bg-gray-50 rounded-full hover:bg-gray-100 transition duration-200 border border-gray-200 cursor-pointer shadow-xs'
                >
                  <div className='w-7 h-7 bg-linear-to-tr from-gray-900 to-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xs shadow-inner uppercase'>
                    {localStorage.getItem('user-name') ? localStorage.getItem('user-name')[0] : 'U'}
                  </div>
                  <span className='font-medium text-sm text-gray-700 max-w-[120px] truncate'>Hi, {localStorage.getItem('user-name') || 'User'}</span>
                  <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${userDropdown ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M19 9l-7 7-7-7'></path>
                  </svg>
                </button>

                {userDropdown && (
                  <div className='absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1 transition-all duration-200'>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-semibold transition cursor-pointer'
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to='/login'>
                <button className='px-5 py-1.5 text-sm font-semibold text-gray-900 border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition duration-200 cursor-pointer shadow-xs'>
                  Login
                </button>
              </Link>
            )}
          </div>

          <Link to='/cart' className='relative p-2 rounded-full hover:bg-gray-100 transition text-gray-700 hover:text-gray-900'>
            <svg className='w-6 h-6' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
              <path d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'></path>
            </svg>
            <span className='absolute top-0.5 right-0.5 bg-gray-900 text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center shadow-xs border border-white animate-pulse'>
              {getTotalCartItems()}
            </span>
          </Link>

          <button className='md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-full transition' onClick={() => setIsOpen(!isOpeon)}>
            {isOpeon ? (
              <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' /></svg>
            ) : (
              <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16M4 18h16' /></svg>
            )}
          </button>
        </div>

        <div className={`transition-all duration-300 md:hidden absolute top-[65px] left-0 w-full bg-white flex flex-col items-center py-6 space-y-5 shadow-xl border-t border-gray-100 z-40 ${isOpeon ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
          {localStorage.getItem('auth-token') && (
            <div className='flex flex-col items-center pb-3 border-b border-gray-100 w-4/5'>
              <div className='w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-base mb-1.5 uppercase'>
                {localStorage.getItem('user-name') ? localStorage.getItem('user-name')[0] : 'U'}
              </div>
              <span className='font-semibold text-gray-900 text-base'>Hi, {localStorage.getItem('user-name') || 'User'}</span>
            </div>
          )}

          <ul className='flex flex-col items-center space-y-4 text-base font-semibold text-gray-600 w-full'>
            <li className='w-full text-center' onClick={() => setIsOpen(false)}>
              <Link to='/' className={`block py-1 ${path === '/' ? 'text-gray-900 font-bold' : ''}`}>Shop</Link>
            </li>
            <li className='w-full text-center' onClick={() => setIsOpen(false)}>
              <Link to='/men' className={`block py-1 ${path === '/men' ? 'text-gray-900 font-bold' : ''}`}>Men</Link>
            </li>
            <li className='w-full text-center' onClick={() => setIsOpen(false)}>
              <Link to='/women' className={`block py-1 ${path === '/women' ? 'text-gray-900 font-bold' : ''}`}>Women</Link>
            </li>
            <li className='w-full text-center' onClick={() => setIsOpen(false)}>
              <Link to='/kids' className={`block py-1 ${path === '/kids' ? 'text-gray-900 font-bold' : ''}`}>Kids</Link>
            </li>
            <li className='w-full text-center' onClick={() => setIsOpen(false)}>
              <Link to='/admin-add' className={`block py-1 ${path === '/admin-add' ? 'text-red-600 font-bold' : ''}`}>Admin</Link>
            </li>
            <li className='w-full text-center pt-2'>
              {localStorage.getItem('auth-token') ? (
                <button onClick={handleLogout} className='w-4/5 py-2 text-sm text-white bg-red-600 rounded-full font-bold shadow-xs'>
                  Logout
                </button>
              ) : (
                <Link to='/login' className='w-4/5 block' onClick={() => setIsOpen(false)}>
                  <button className='w-full py-2 text-sm font-semibold text-gray-900 border border-gray-300 rounded-full hover:bg-gray-900 hover:text-white transition duration-200'>
                    Login
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
