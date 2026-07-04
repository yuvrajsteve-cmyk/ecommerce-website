import exclusive_image from '../Assets/exclusive_image.png'

const Offers = () => {
  return (
    <div className='w-full bg-linear-to-b from-pink-300 to-white py-12 md:py-0 md:h-[60vh] flex items-center border-b border-gray-100/80'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:px-60 md:px-12 px-6 gap-y-12 gap-x-12 my-10 w-full items-center'>

        <div className='flex flex-col justify-center gap-4 w-full text-center md:text-left items-center md:items-start'>
          <h1 className='text-4xl md:text-5xl lg:text-7xl font-black leading-tight text-gray-900 uppercase font-sans tracking-tight'>
            Exclusive <br /> Offers For You
          </h1>
          <p className='text-xs md:text-sm font-bold text-gray-700 uppercase tracking-widest mt-2'>
            ONLY ON BEST SELLERS PRODUCTS
          </p>
        </div>

        <div className='w-full flex justify-center md:justify-end items-center'>
          <img
            src={exclusive_image}
            alt='Exclusive Offer Model'
            className='w-full max-w-xs md:max-w-sm h-auto object-contain drop-shadow-xl'
          />
        </div>

      </div>
    </div>
  )
}

export default Offers
