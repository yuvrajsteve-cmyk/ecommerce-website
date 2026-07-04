import { Link } from 'react-router-dom'
import big_logo from '../Assets/logo_big.png'
import pintester_icon from '../Assets/pintester_icon.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

const Footer = () => {
  const socialIcons = [
    { icon: instagram_icon, link: 'https://instagram.com' },
    { icon: pintester_icon, link: 'https://pinterest.com' },
    { icon: whatsapp_icon, link: 'https://whatsapp.com' }
  ]

  return (
    <footer className='w-full bg-gray-50 pt-16 flex flex-col items-center border-t border-gray-100 select-none'>
      <div className='w-full lg:px-60 md:px-12 px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-6 text-gray-700'>

        <div className='col-span-2 lg:col-span-2 flex flex-col gap-4 pr-0 sm:pr-8'>
          <div className='flex items-center gap-3'>
            <img src={big_logo} alt='Cara Logo' className='w-12 md:w-14 object-contain' />
            <h2 className='font-black text-gray-900 text-2xl tracking-widest uppercase font-sans'>CARA</h2>
          </div>
          <p className='text-xs sm:text-sm leading-relaxed text-gray-500 font-medium max-w-sm'>
            Your one-stop destination for the latest fashion and exclusive collections. We bring quality and style right to your doorstep.
          </p>
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='font-bold text-sm text-gray-900 uppercase tracking-wider'>Company</h3>
          <ul className='flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-gray-500'>
            <li className='hover:text-red-600 transition cursor-pointer'><Link to='/about'>About Us</Link></li>
            <li className='hover:text-red-600 transition cursor-pointer'>Careers</li>
            <li className='hover:text-red-600 transition cursor-pointer'>Affiliates</li>
            <li className='hover:text-red-600 transition cursor-pointer'>Contact</li>
          </ul>
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='font-bold text-sm text-gray-900 uppercase tracking-wider'>Shop</h3>
          <ul className='flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-gray-500'>
            <li className='hover:text-red-600 transition cursor-pointer'><Link to='/mens'>Men&apos;s Fashion</Link></li>
            <li className='hover:text-red-600 transition cursor-pointer'><Link to='/womens'>Women&apos;s Popular</Link></li>
            <li className='hover:text-red-600 transition cursor-pointer'><Link to='/kids'>Kids Collection</Link></li>
            <li className='hover:text-red-600 transition cursor-pointer'>Offers & Sales</li>
          </ul>
        </div>

        <div className='flex flex-col gap-4'>
          <h3 className='font-bold text-sm text-gray-900 uppercase tracking-wider'>Support</h3>
          <ul className='flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-gray-500'>
            <li className='hover:text-red-600 transition cursor-pointer'>Shipping Policy</li>
            <li className='hover:text-red-600 transition cursor-pointer'>Return & Exchange</li>
            <li className='hover:text-red-600 transition cursor-pointer'>FAQs</li>
            <li className='hover:text-red-600 transition cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

      </div>

      <div className='flex justify-center mt-12 gap-4'>
        {socialIcons.map((item, i) => (
          <a key={i} href={item.link} target='_blank' rel='noreferrer' className='p-2.5 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 hover:-translate-y-1 transition-all shadow-xs active:scale-95'>
            <img src={item.icon} alt='Social Icon' className='w-5 h-5 object-contain' />
          </a>
        ))}
      </div>

      <div className='flex flex-col items-center w-full mt-10 lg:px-60 md:px-12 px-6'>
        <hr className='w-full border-none h-[1px] bg-gray-200' />
        <p className='py-6 text-gray-500 text-xs sm:text-sm font-semibold tracking-wide'>
          Copyright @ 2026 CARA - All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
