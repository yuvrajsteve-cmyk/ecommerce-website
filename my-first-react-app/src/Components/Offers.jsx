import exclusive_image from '../Assets/exclusive_image.png'; 

const Offers = () => {
  return (
    /* Outer div nu center karan layi 'mx-auto' add kitta hai 
       ate 'max-w-[1300px]' laya hai taan ki Newsletter de barabar rahe */
    <div className="w-full max-w-[1500px] mx-auto bg-linear-to-b from-pink-300 to-white px-6 md:px-20 py-12 my-16">
      
      {/* Main Flex Box */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        
        {/* --- Left Side: Text ate Button --- */}
        <div className="flex flex-col justify-center gap-4 md:w-1/2 text-center md:text-left items-center md:items-start">
          <h1 className="text-4xl md:text-7xl font-bold leading-tight text-gray-900">
            Exclusive <br /> Offers For You
          </h1>
          <p className="text-sm md:text-lg font-medium text-gray-700 uppercase tracking-wider">
            ONLY ON BEST SELLERS PRODUCTS
          </p>
          {/* <button className="bg-red-500 text-white py-3 px-10 rounded-full w-fit mt-4 hover:bg-red-600 transition duration-300 font-semibold shadow-md active:scale-95">
            Check Now
          </button> */}
        </div>

        {/* --- Right Side: Image --- */}
        <div className="md:w-1/2 flex justify-end items-center">
          <img 
            src={exclusive_image} 
            alt="Exclusive Offer Model" 
            className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default Offers;