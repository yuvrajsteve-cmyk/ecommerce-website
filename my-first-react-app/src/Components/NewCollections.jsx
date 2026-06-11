import React from "react";
import new_collections from '../Assets/all_product'
import Item from '../Components/Item/Item'


const NewCollections = () => {

    const displayData = [...new_collections].sort(() => 0.5 - Math.random()) 
    .slice(0, 8);

   return (
        
    <div className='flex flex-col items-center gap-10 mb-24 px-4'>
      <h1 className='text-6xl mt-9 font-bold text-gray-800md:text-5xl text-[#171717]'>NEW COLLECTIONS</h1>
      <hr className='w-50 h-1 rounded-lg bg-[#171717] -mt-6' />
      
      {/* - grid-cols-2: Mobile te 2
          - lg:grid-cols-4: Desktop te 4
          - gap-x-10 gap-y-16: Horizontal te Vertical gap vadhaya hai
      */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-16 mt-10 w-full max-w-[1200px]">
        {displayData.map((item, i) => {
          return (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price} 
            />
          )
        })}
      </div>
    </div>
        
    
   );


}

export default NewCollections