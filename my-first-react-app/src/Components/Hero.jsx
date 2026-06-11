import all_product from '../Assets/data'
import hero_image from '../Assets/hero_image.png'
import hand_icon from '../Assets/hand_icon.png'



const Hero = () => {
    
    return(
        <div>
        <div className="flex items-center justify-between px-20 h-[80vh] bg-linear-to-b from-pink-300 to-white">
      
      {/* ਖੱਬਾ ਪਾਸਾ: Text */}
      <div className="flex flex-col justify-center lg:m-20 gap-5 md:w-1/2 text-center md:text-left">
        <h2 className="text-gray-700  font-semibold text-xl md:text-xl">NEW ARRIVALS ONLY</h2>

        {/* hand icon  */}
        <div className='flex items-center gap-4 justify-center md:justify-start'>
        <h1 className="text-4xl md:text-7xl font-bold leading-tight">new</h1>
        <img src={hand_icon} alt="" className='w-10 md:w-16 h-auto' />
        </div>

        <h1 className="text-4xl md:text-7xl font-bold leading-tight">
          collections <br /> for everyone
        </h1>

        <button className="bg-red-500 text-white py-3 px-8 rounded-full w-fit mx-auto md:mx-0 hover:bg-red-600 transition
        cursor-pointer"
        onClick={() => window.scrollTo({top: 850, behavior: 'smooth'})}>
          Latest Collection →
        </button>
      </div>

      {/* Hero Image */}
      <div className='mt-10 md:mt-0 md:w-1/2 flex justify-center'>
        <img src={hero_image} alt="Hero Collection" className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain" />
      </div>

    </div>
        
       
    <div className="mx-auto py-10 px-6 w-full max-w-[1200px]">

  {/* Popular In Women Heading and Line */}

  <div className="flex flex-col items-center mb-10">
    <h1 className="text-6xl mt-9 font-bold text-gray-800">POPULAR IN WOMEN</h1>
    <hr className="w-50 h-1 mt-5 bg-gray-800 border-none rounded" />
  </div>

  {/* Product Grid */}
  
  <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
    {all_product.map((item, i) => {
      return (
        <div key={i} className="w-10/ shadow-sm hover:shadow-md transition-transform duration-300 rounded-md hover:scale-110 cursor-pointer">
          <img src={item.image} alt={item.name} className="w-full h-auto object-cover rounded-md" />
          <p className="mt-4 flex font-semibold pl-4 text-gray-700">{item.name}</p>
          <div className="flex gap-4 pl-4 mt-2">
            <p className="font-bold text-red-600 text-lg">${item.new_price}</p>
            <p className="line-through text-gray-500">${item.old_price}</p>
          </div>
        </div>
      );
    })}
  </div>
</div>  


        
</div>
        
    );
}

export default Hero;