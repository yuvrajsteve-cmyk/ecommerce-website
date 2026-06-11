import React, { useContext, useState } from 'react'; // 1. useState add kita
import { ShopContext } from '../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // 2. Size select karan layi state add kiti
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="container mx-auto p-6 md:p-10 flex flex-col md:flex-row gap-10">
      
      {/* Left Section: Image original style vich */}
      <div className="flex gap-4 flex-1">
        <div className="flex flex-col gap-4">
          <img src={product.image} alt="" className="h-[100px] w-[100px] object-cover cursor-pointer" />
          <img src={product.image} alt="" className="h-[100px] w-[100px] object-cover cursor-pointer" />
        </div>
        <div className="productdisplay-img">
          {/* Image size original rakhi hai: w-full max-w-[550px] */}
          <img src={product.image} alt={product.name} className="w-full max-w-[550px] cursor-pointer shadow-xl" />
        </div>
      </div>

      {/* Right Section: Details */}
      <div className="flex-1 flex flex-col">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
        
        <div className="flex items-center gap-1 text-red-500 mb-4">
          <span>★</span><span>★</span><span>★</span><span>★</span>
          <span className="text-gray-400"> (122 Reviews)</span>
        </div>

        <div className="flex gap-5 text-2xl font-bold mb-6">
          <div className="text-gray-400 line-through">${product.old_price}</div>
          <div className="text-red-600">${product.new_price}</div>
        </div>

        <div className="text-gray-600 text-lg leading-relaxed mb-8">
          {product.description || "This is a premium quality fabric that is both stylish and comfortable to wear. It is perfect for everyday use as well as special occasions."}
        </div>

        {/* 3. WORKING SIZE SELECTION (Same CSS, bas logic add kita) */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Select Size</h2>
          <div className="flex gap-4">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div 
                key={size} 
                onClick={() => setSelectedSize(size)} // Click karan te state update hoyegi
                className={`px-5 py-2 border rounded-md cursor-pointer transition-all 
                  ${selectedSize === size 
                    ? "bg-red-600 text-white border-red-600" // Select hon te style
                    : "bg-gray-100 border-gray-200 hover:border-red-500 hover:bg-white" // Default style
                  }`}
              >
                {size}
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={() => {
            if(!selectedSize) {
              alert("Bro , please select the size first!"); // Alert je size select nahi kiti
              return;
            }
            addToCart(product.id, selectedSize); // ID te size dono pass kite
          }}
          className="bg-red-600 cursor-pointer text-white px-10 py-4 text-lg font-bold rounded-md hover:bg-gray-800 transition-all duration-300 w-fit active:scale-95"
        >
          ADD TO CART
        </button>

        <div className="mt-6">
          <p className="text-gray-500">
            <span className="font-bold text-gray-700">Category:</span> {product.category}, T-Shirt, Crop Top
          </p>
          <p className="text-gray-500">
            <span className="font-bold text-gray-700">Tags:</span> Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay;