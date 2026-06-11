import { useState, useEffect } from "react";
import my_logo from '../Assets/logo.png'
import { ShopContext } from '../Context/ShopContext'
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";

const Header = () => {
    const [isOpeon, setIsOpen] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false); // User dropdown state
    const location = useLocation();
    const path = location.pathname;
    const { getTotalCartItems } = useContext(ShopContext);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('user-name');
        window.location.replace('/');
    };

    return (
        <header className="bg-white shadow-md w-full sticky top-0 z-50">
            <nav className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">

                {/* Logo Section */}
                <div className="flex items-center space-x-2 shrink-0">
                    <Link to='/' className="flex items-center space-x-2">
                        <img src={my_logo} alt="Logo" className="w-10 md:w-12 cursor-pointer" />
                        <span className="text-2xl md:text-4xl font-bold text-gray-900 tracking-wider uppercase">CARA</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    <ul className="flex space-x-8 text-lg font-medium text-blue-800">
                        <li><Link to="/" className={path === '/' ? "border-b-2 border-red-500 pb-1" : "hover:text-blue-600 transition"}>Shop</Link></li>
                        <li><Link to="/men" className={path === "/men" ? "border-b-2 border-red-500 pb-1" : "hover:text-blue-800 transition"}>Men</Link></li>
                        <li><Link to="/women" className={path === "/women" ? "border-b-2 border-red-500 pb-1" : "hover:text-blue-800 transition"}>Women</Link></li>
                        <li><Link to="/kids" className={path === "/kids" ? "border-b-2 border-red-500 pb-1" : "hover:text-blue-800 transition"}>Kids</Link></li>
                        <li>
                            <Link to="/admin-add" className={path === "/admin-add" ? "border-b-2 border-red-500 pb-1 text-red-600" : "text-red-500 hover:text-red-700 font-semibold"}>
                                Admin
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex items-center space-x-3 md:space-x-6">
                    {/* Desktop Auth/User Profile Section */}
                    <div className="hidden md:block">
                        {localStorage.getItem('auth-token') ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition duration-300 border border-gray-300"
                                >
                                    <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold">
                                        {localStorage.getItem('user-name') ? localStorage.getItem('user-name')[0].toUpperCase() : 'U'}
                                    </div>
                                    <span className="font-semibold text-gray-800">Hi, {localStorage.getItem('user-name') || 'User'}</span>
                                    <svg className={`w-4 h-4 transition-transform ${userDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>

                                {/* Stylish Dropdown */}
                                {userDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in duration-200">
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login">
                                <button className="px-6 py-2 text-md font-medium text-blue-900 border-2 border-blue-900 rounded-full hover:bg-blue-900 hover:text-white transition duration-300">
                                    Login
                                </button>
                            </Link>
                        )}
                    </div>

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative group p-1">
                        <svg className="w-7 h-7 md:w-8 md:h-8 text-gray-800 group-hover:text-blue-900 transition" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        </svg>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                            {getTotalCartItems()}
                        </span>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 text-gray-600 hover:bg-gray-100  rounded-md" onClick={() => setIsOpen(!isOpeon)}>
                        {isOpeon ? (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Slide */}
                <div className={`${isOpeon ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'} transition-all duration-300 md:hidden absolute top-[72px] left-0 w-full bg-white flex flex-col items-center py-8 space-y-6 shadow-2xl border-t z-40`}>
                    {/* User Info for Mobile */}
                    {localStorage.getItem('auth-token') && (
                         <div className="flex flex-col items-center pb-4 border-b w-full">
                            <div className="w-12 h-12 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-2">
                                {localStorage.getItem('user-name') ? localStorage.getItem('user-name')[0].toUpperCase() : 'U'}
                            </div>
                            <span className="font-bold text-gray-900 text-lg">Hi, {localStorage.getItem('user-name') || 'User'}</span>
                         </div>
                    )}

                    <ul className="flex flex-col items-center space-y-5 text-xl font-medium text-blue-800">
                        <li onClick={() => setIsOpen(false)}><Link to="/">Shop</Link></li>
                        <li onClick={() => setIsOpen(false)}><Link to="/men">Men</Link></li>
                        <li onClick={() => setIsOpen(false)}><Link to="/women">Women</Link></li>
                        <li onClick={() => setIsOpen(false)}><Link to="/kids">Kids</Link></li>
                        <li onClick={() => setIsOpen(false)}><Link to="/admin-add" className="text-red-500">Admin</Link></li>
                    </ul>

                    <div className="w-full flex justify-center px-6">
                        {localStorage.getItem('auth-token') 
                        ? <button onClick={handleLogout} className="w-full py-3 text-white bg-red-500 rounded-xl font-bold ">Logout</button>
                        : <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                            <button className="w-full py-3 text-blue-900 border-2 border-blue-900 rounded-xl font-bold ">Login</button>
                          </Link>
                        }
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;