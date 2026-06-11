import React from 'react'
import { Link } from 'react-router-dom'
import big_logo from '../Assets/logo_big.png'
import pintester_icon from '../Assets/pintester_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
    const socialIcons = [
        { icon: instagram_icon, link: "https://instagram.com" },
        { icon: pintester_icon, link: "https://pinterest.com" },
        { icon: whatsapp_icon, link: "https://whatsapp.com" }
    ];

    return (
        <div className="flex flex-col items-center bg-[#f8f9fa] pt-16">
            
            {/* Main Content Grid */}
            <div className="w-full max-w-[1300px] px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-5 text-gray-700">
                
                {/* Brand Section */}
                <div className="col-span-2 lg:col-span-2 flex flex-col gap-5">
                    <div className='flex items-center gap-3'>
                        <img src={big_logo} alt="Cara Logo" className='w-12 md:w-16' />
                        <h2 className="font-bold text-[#374151] text-3xl tracking-widest">CARA</h2>
                    </div>
                    <p className="text-sm md:text-base pr-10 leading-relaxed text-gray-500">
                        Your one-stop destination for the latest fashion and exclusive collections. We bring quality and style right to your doorstep.
                    </p>
                </div>

                {/* Company Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-gray-800">Company</h3>
                    <ul className="flex flex-col gap-2 text-sm md:text-base">
                        <li className="hover:text-red-500 cursor-pointer transition"><Link to='/about'>About Us</Link></li>
                        <li className="hover:text-red-500 cursor-pointer transition">Careers</li>
                        <li className="hover:text-red-500 cursor-pointer transition">Affiliates</li>
                        <li className="hover:text-red-500 cursor-pointer transition">Contact</li>
                    </ul>
                </div>

                {/* Quick Links */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-gray-800">Shop</h3>
                    <ul className="flex flex-col gap-2 text-sm md:text-base">
                        <li className="hover:text-red-500 cursor-pointer transition"><Link to='/mens'>Men's Fashion</Link></li>
                        <li className="hover:text-red-500 cursor-pointer transition"><Link to='/womens'>Women's Popular</Link></li>
                        <li className="hover:text-red-500 cursor-pointer transition"><Link to='/kids'>Kids Collection</Link></li>
                        <li className="hover:text-red-500 cursor-pointer transition">Offers & Sales</li>
                    </ul>
                </div>

                {/* Support Section */}
                <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-lg text-gray-800">Support</h3>
                    <ul className="flex flex-col gap-2 text-sm md:text-base">
                        <li className="hover:text-red-500 cursor-pointer transition">Shipping Policy</li>
                        <li className="hover:text-red-500 cursor-pointer transition">Return & Exchange</li>
                        <li className="hover:text-red-500 cursor-pointer transition">FAQs</li>
                        <li className="hover:text-red-500 cursor-pointer transition">Privacy Policy</li>
                    </ul>
                </div>
            </div>

            {/* Social Icons Section */}
            <div className='flex justify-center mt-12 gap-6'>
                {socialIcons.map((item, i) => (
                    <a key={i} href={item.link} target="_blank" rel="noreferrer" className='p-3 bg-white border border-[#ebebeb] rounded-xl cursor-pointer hover:bg-gray-100 hover:-translate-y-1 transition-all shadow-sm'>
                        <img src={item.icon} alt="Social Icon" className='w-6 h-6 object-contain'/>
                    </a>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className='flex flex-col items-center w-full mt-10'>
                <hr className='w-[90%] max-w-[1300px] border-none h-[1px] bg-[#dbdbdb]'/>
                <p className='py-8 text-[#171717] text-sm font-medium'>
                    Copyright @ 2026 CARA - All Rights Reserved
                </p>
            </div>
        </div>
    )
}

export default Footer