import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import ProductDisplay from '../Components/ProductDisplay';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // 1. ਪਹਿਲਾਂ ਚੈੱਕ ਕਰੋ ਕਿ ਕੀ ਡਾਟਾ ਲੋਡ ਹੋ ਗਿਆ ਹੈ?
  if (!all_product || all_product.length === 0) {
    return <div className="p-20 text-center font-bold text-xl">Loading Products...</div>;
  }

  // 2. ਹੁਣ ਪ੍ਰੋਡਕਟ ਲੱਭੋ
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div className="min-h-[60vh]">
      {product ? (
        <ProductDisplay product={product} />
      ) : (
        <div className="text-center py-20 text-2xl font-bold text-red-500">
          Product Not Found! (ID: {productId})
          <br />
          <span className="text-sm text-gray-500 font-normal">Check if this ID exists in Admin List</span>
        </div>
      )}
    </div>
  );
}

export default Product;