import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useNavigate } from 'react-router-dom' // Checkout layi navigate use kita
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext)
  const navigate = useNavigate() // Navigation function

  const handleCheckout = () => {
    if(getTotalCartAmount() > 0) {
      navigate('/checkout') // Tusi apne checkout route da path ethe pao
    } else {
      alert('You must select the items first !')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 py-12">
      <div className="max-w-6xl mx-auto px-4 font-sans">

        {/* Header Section */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                        Shopping <span className="text-red-500">Bag</span>
          </h1>
          <p className="text-gray-500 font-medium bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            {Object.values(cartItems).reduce((a, b) => a + b, 0)} Items
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* --- Left Side: Product List --- */}
          <div className="lg:col-span-2 space-y-6">
            {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                return (
                  <div key={e.id} className="group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center gap-6">

                    {/* Product Image with Hover Effect */}
                    <div className="relative overflow-hidden rounded-xl bg-gray-100 shrink-0">
                      <img src={e.image} alt={e.name} className="w-24 h-32 md:w-28 md:h-36 object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-800 text-lg md:text-xl leading-snug group-hover:text-red-500 transition-colors">
                          {e.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(e.id)}
                          className="p-2 bg-gray-50 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all text-gray-400"
                        >
                          <img src={remove_icon} className="w-4 opacity-70 group-hover:opacity-100" alt="remove" />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-3 items-center mb-4">
                        <span className="text-2xl font-black text-gray-900">${e.new_price}</span>
                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-100 uppercase tracking-tighter">
                                                    Size: {e.size || 'M'}
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-gray-400 uppercase">Quantity</span>
                          <span className="font-bold text-gray-800">{cartItems[e.id]}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-bold text-gray-400 uppercase block">Subtotal</span>
                          <span className="font-bold text-gray-900">${(e.new_price * cartItems[e.id]).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            })}

            {getTotalCartAmount() === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <div className="text-6xl mb-4">🛒</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
                <button onClick={() => navigate('/')} className="text-red-500 font-bold hover:underline">Go Shopping →</button>
              </div>
            )}
          </div>

          {/* --- Right Side: Stylish Totals --- */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-gray-100 sticky top-28">
              <h2 className="text-2xl font-black text-gray-900 mb-8 border-b pb-4">Order Summary</h2>

              <div className="space-y-5">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900">${getTotalCartAmount()}</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Tax (Estimated)</span>
                  <span className="text-gray-900">$0.00</span>
                </div>

                <div className="pt-6 mt-6 border-t-2 border-gray-50">
                  <div className="flex justify-between items-end">
                    <span className="text-gray-400 font-bold uppercase text-xs mb-1">Total Amount</span>
                    <span className="text-4xl font-black text-gray-900 tracking-tighter">
                                            ${getTotalCartAmount()}
                    </span>
                  </div>
                </div>

                {/* Working Proceed to Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-gray-900 hover:bg-red-600 text-white py-5 rounded-2xl font-black transition-all duration-300 shadow-xl hover:shadow-red-200 uppercase tracking-widest text-sm mt-8 active:scale-95 cursor-pointer flex items-center justify-center gap-3"
                >
                                    Proceed to Checkout
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3 "></path></svg>
                </button>

                <p className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                                    🔒 Secure SSL Checkout
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CartItems