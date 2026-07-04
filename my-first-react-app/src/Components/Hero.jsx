import all_product from '../Assets/data'
import hero_image from '../Assets/hero_image.png'
import hand_icon from '../Assets/hand_icon.png'
import Item from '../Components/Item/Item'

const Hero = () => {
  return (
    <div className='w-full flex flex-col'>
      <div className='flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 lg:px-20 py-12 md:py-0 h-auto md:h-[80vh] bg-linear-to-b from-pink-300 to-white gap-8 md:gap-0'>
        <div className='flex flex-col justify-center lg:m-20 gap-5 w-full md:w-1/2 text-center md:text-left items-center md:items-start'>
          <h2 className='text-gray-700 font-semibold text-lg md:text-xl tracking-wide uppercase'>NEW ARRIVALS ONLY</h2>
          <div className='flex items-center gap-4 justify-center md:justify-start select-none'>
            <h1 className='text-4xl md:text-7xl font-black text-gray-900 uppercase font-sans tracking-tight'>new</h1>
            <img src={hand_icon} alt='' className='w-10 md:w-16 h-auto animate-bounce' />
          </div>
          <h1 className='text-4xl md:text-7xl font-black text-gray-900 uppercase font-sans tracking-tight leading-none'>
            collections <br /> for everyone
          </h1>
          <button
            type='button'
            className='bg-gray-900 text-white py-3 px-8 text-sm sm:text-base font-bold rounded-full w-fit hover:bg-gray-800 transition shadow-lg shadow-gray-900/10 cursor-pointer active:scale-95 mt-4 tracking-wider uppercase'
            onClick={() => window.scrollTo({ top: 750, behavior: 'smooth' })}
          >
            Latest Collection →
          </button>
        </div>
        <div className='w-full md:w-1/2 flex justify-center items-center'>
          <img src={hero_image} alt='Hero Collection' className='w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-xl' />
        </div>
      </div>

      <section className='w-full py-16 sm:py-24 animate-in fade-in duration-300 flex flex-col items-center'>
        <div className='flex flex-col items-center mb-10'>
          <h1 className='text-4xl md:text-6xl mt-9 font-bold text-gray-800 font-sans tracking-wide uppercase'>
            NEW COLLECTIONS
          </h1>
          <hr className='w-50 h-1 mt-5 bg-gray-800 border-none rounded' />
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-12 px-6 md:px-12 lg:px-60 my-10 w-full justify-items-center'>
          {all_product.map((item, i) => (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Hero
