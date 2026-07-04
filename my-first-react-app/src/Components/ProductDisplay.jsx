import { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'

const ProductDisplay = (props) => {
  const { product } = props
  const { addToCart } = useContext(ShopContext)
  const [selectedSize, setSelectedSize] = useState('')

  return (
    <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in duration-300'>
      <div className='flex flex-col lg:flex-row gap-8 lg:gap-12'>

        <div className='flex flex-col-reverse sm:flex-row gap-4 flex-1'>
          <div className='flex flex-row sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible shrink-0'>
            <img src={product.image} alt='' className='h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-lg border border-gray-100 hover:border-gray-300 transition cursor-pointer' />
            <img src={product.image} alt='' className='h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-lg border border-gray-100 hover:border-gray-300 transition cursor-pointer' />
          </div>
          <div className='w-full flex justify-center items-start'>
            <img src={product.image} alt={product.name} className='w-full max-w-[500px] h-auto object-cover rounded-xl shadow-xl shadow-gray-200/50 border border-gray-100/50' />
          </div>
        </div>

        <div className='flex-1 flex flex-col justify-start pt-2'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight mb-3 font-sans'>{product.name}</h1>

          <div className='flex items-center gap-1.5 text-amber-400 text-sm mb-5 select-none'>
            <span className='tracking-none'>★★★★☆</span>
            <span className='text-gray-400 font-semibold text-xs ml-1'>(122 Reviews)</span>
          </div>

          <div className='flex items-baseline gap-4 text-xl sm:text-2xl font-black mb-6'>
            <div className='text-gray-400 line-through font-medium text-basesm:text-lg'>${product.old_price}</div>
            <div className='text-red-600 bg-red-50 px-3 py-0.5 rounded-md font-sans'>${product.new_price}</div>
          </div>

          <p className='text-gray-600 text-sm sm:text-base leading-relaxed mb-6 font-medium max-w-xl'>
            {product.description || 'This is a premium quality fabric that is both stylish and comfortable to wear. It is perfect for everyday use as well as special occasions.'}
          </p>

          <div className='mb-8'>
            <h2 className='text-sm sm:text-base font-bold mb-3.5 text-gray-900 uppercase tracking-wider'>Select Size</h2>
            <div className='flex flex-wrap gap-2.5 sm:gap-3.5'>
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <button
                  key={size}
                  type='button'
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[46px] h-10 px-3 text-sm font-bold border rounded-lg transition-all duration-200 cursor-pointer select-none active:scale-95 ${
                    selectedSize === size
                      ? 'bg-gray-900 text-white border-gray-900 shadow-md shadow-gray-900/10'
                      : 'bg-white border-gray-200 text-gray-800 hover:border-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            type='button'
            onClick={() => {
              if (!selectedSize) {
                alert('Bro, please select the size first!')
                return
              }
              addToCart(product.id, selectedSize)
            }}
            className='bg-linear-to-r from-gray-900 to-blue-950 text-white px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-bold rounded-full hover:shadow-lg hover:shadow-gray-900/10 transition-all duration-250 w-full sm:w-fit cursor-pointer active:scale-98 tracking-wider uppercase'
          >
            Add To Cart
          </button>

          <div className='mt-8 pt-6 border-t border-gray-100 flex flex-col space-y-2 text-xs sm:text-sm font-medium text-gray-500'>
            <p>
              <span className='font-bold text-gray-800 tracking-wide uppercase mr-1.5'>Category:</span>
              {product.category}, T-Shirt, Crop Top
            </p>
            <p>
              <span className='font-bold text-gray-800 tracking-wide uppercase mr-1.5'>Tags:</span>
              Modern, Latest
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}

export default ProductDisplay
