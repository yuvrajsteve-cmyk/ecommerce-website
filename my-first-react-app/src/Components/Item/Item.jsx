import React from 'react';
import { Link } from 'react-router-dom'; // 1. Link ਇੰਪੋਰਟ ਕਰੋ

const Item = (props) => {
  return (
    <div className='item transform transition hover:scale-105 duration-300 shadow-md rounded-lg overflow-hidden bg-white'>
      
      {/* 2. ਫੋਟੋ ਨੂੰ Link ਦੇ ਅੰਦਰ ਰੱਖੋ ਤਾਂ ਜੋ ਕਲਿੱਕ ਕਰਨ ਤੇ ਪ੍ਰੋਡਕਟ ਪੇਜ ਖੁੱਲ੍ਹੇ */}
      <Link to={`/product/${props.id}`}>
        <img 
          className="w-full h-auto cursor-pointer"
          onClick={() => window.scrollTo(0,0)} 
          src={props.image} 
          alt={props.name} 
        />
      </Link>

      <div className="p-4">
        <p className="text-gray-700 font-medium mb-2">{props.name}</p>
        <div className="item-prices flex gap-4 items-center">
          <div className="item-price-new text-red-600 font-bold text-lg">
            ${props.new_price}
          </div>
          <div className="item-price-old text-gray-400 line-through">
            ${props.old_price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;