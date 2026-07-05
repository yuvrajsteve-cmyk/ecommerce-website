import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import Footer from '../Components/Footer/Footer'

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext)

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt="" />

      <div className="shopcategory-indexSort flex justify-between items-center my-5 px-10">
        <p>
          <span className='font-semibold'>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort flex items-center gap-2 border border-[#888] px-4 py-2 rounded-full cursor-pointer">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shopcategory-products grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 justify-items-center">
        {all_product.map((item, i) => {
          if (props.category && item.category && props.category.toLowerCase() === item.category.toLowerCase()) {
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
          } else {
            return null
          }
        })}
      </div>

      <div className="shopcategory-loadmore flex justify-center items-center my-20 mx-auto w-[233px] h-[58px] rounded-full bg-[#ededed] text-[#787878] text-lg font-medium cursor-pointer">
        Explore More
      </div>

      <Footer />
    </div>
  )
}

export default ShopCategory
