import { Link } from 'react-router-dom'

const Item = (props) => {
  const getCorrectImageUrl = (originalUrl) => {
    if (!originalUrl) return ''
    if (originalUrl.includes('/images/')) {
      const imagePath = originalUrl.substring(originalUrl.indexOf('/images/'))
      return `https://ecommerce-website-zgwf.onrender.com${imagePath}`
    }
    return originalUrl
  }

  return (
    <div className='item transform transition hover:scale-105 duration-300 shadow-md rounded-lg overflow-hidden bg-white flex flex-col justify-between h-full w-full max-w-[280px]'>

      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)} className='block w-full bg-white shrink-0 overflow-hidden'>
        <img
          className='w-full h-auto cursor-pointer block object-contain bg-white'
          src={getCorrectImageUrl(props.image)}
          alt={props.name}
        />
      </Link>

      <div className='p-4 flex flex-col flex-grow justify-between bg-white'>
        <p className='mt-2 flex font-semibold text-gray-700 font-sans line-clamp-2 text-sm sm:text-base leading-snug'>
          {props.name}
        </p>

        <div className='flex gap-4 mt-2 select-none'>
          <div className='font-bold text-red-600 text-lg font-sans'>
            ${props.new_price}
          </div>
          <div className='line-through text-gray-500 text-sm font-medium'>
            ${props.old_price}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Item
