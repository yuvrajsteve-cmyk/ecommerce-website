




import React, { useContext} from "react";
import { ShopContext} from '../Context/ShopContext'
import dropdown_icon from '../Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import kids_banner from '../Assets/banner_kids.png'

const Kids = () => {

    const { all_product } = useContext(ShopContext);

return (
    <> 
       <div className="w-full">
        <div className="flex justify-center px-4 md:px-10 lg:px-20">
            <img 
               src={kids_banner} alt="men banner" className="w-full max-w-\[1200px\] mt-9 h-auto ny-6" />
        </div> 
        {/* stats and sort the drop down icon  */}
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 lg:px-24 my-6 gap-4">
            <p className="text-sm md:text-base">
                <span className="font-bold">Showing 1-12</span> out of 36 products
            </p>
            {/* right side sort the dropdown  */}
            {/* <div className="flex items-center gap-2 border border-[#888] px-4 py-2 rounded-full cursor-pointer hover:bg-gray-100 transition-all text-sm md:text-base">
                Sort by <img src={dropdown_icon} alt="" className="w-3" />
            </div> */}
        </div>
        {/* product grid  */}
        <div className="grid grid-cols-1 lg:px-60 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-12 px-6 md:px-12 my-10 justify-items-center">
            { all_product.map((item,i)=> {
                if(item.category === 'kids') {
                    return(
                        <Item key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                        />
                    )
                }
                return null;
            })}
        </div>
        {/* explore button  */}
       <div className="flex justify-center items-center my-20">
    <div 
        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
        className="flex justify-center items-center w-[180px] h-[50px] md:w-[240px] md:h-[60px] rounded-full border-2 border-[#374151] text-[#374151] bg-transparent text-base md:text-lg font-bold cursor-pointer hover:bg-[#374151] hover:text-white shadow-sm hover:shadow-xl active:scale-95 transition-all duration-300"
    >
        BACK TO TOP
    </div>
</div>
       </div>
                
    </>
 );
    
}

export default Kids;