import React, { useContext, useState } from 'react';
import { ShopContext } from '../Context/ShopContext';

const Checkout = () => {
    const { getTotalCartAmount } = useContext(ShopContext);
    const [paymentMethod, setPaymentMethod] = useState('card');

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* --- Left Side: Shipping Details --- */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Details</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="First Name" className="w-full p-3 bg-gray-50 border rounded-xl focus:outline-red-500" />
                            <input type="text" placeholder="Last Name" className="w-full p-3 bg-gray-50 border rounded-xl focus:outline-red-500" />
                        </div>
                        <input type="email" placeholder="Email Address" className="w-full p-3 bg-gray-50 border rounded-xl focus:outline-red-500" />
                        <input type="text" placeholder="Street Address" className="w-full p-3 bg-gray-50 border rounded-xl focus:outline-red-500" />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="City" className="w-full p-3 bg-gray-50 border rounded-xl focus:outline-red-500" />
                            <input type="text" placeholder="Zip Code" className="w-full p-3 bg-gray-50 border rounded-xl focus:outline-red-500" />
                        </div>
                        <input type="text" placeholder="Phone Number" className="w-full p-3 bg-gray-50 border rounded-xl focus:outline-red-500" />
                    </div>
                </div>

                {/* --- Right Side: Payment Methods --- */}
                <div className="space-y-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
                        
                        <div className="space-y-3">
                            {/* Card Option */}
                            <label onClick={() => setPaymentMethod('card')} className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-red-500 bg-red-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-red-500' : 'border-gray-300'}`}>
                                        {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>}
                                    </div>
                                    <span className="font-bold text-gray-700">Credit / Debit Card</span>
                                </div>
                                <div className="flex gap-2 text-2xl">💳</div>
                            </label>

                            {/* UPI Option */}
                            <label onClick={() => setPaymentMethod('upi')} className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-red-500 bg-red-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'upi' ? 'border-red-500' : 'border-gray-300'}`}>
                                        {paymentMethod === 'upi' && <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>}
                                    </div>
                                    <span className="font-bold text-gray-700">UPI (GPay / PhonePe)</span>
                                </div>
                                <span className="text-sm font-bold text-blue-600 italic">UPI</span>
                            </label>

                            {/* COD Option */}
                            <label onClick={() => setPaymentMethod('cod')} className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition-all ${paymentMethod === 'cod' ? 'border-red-500 bg-red-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'cod' ? 'border-red-500' : 'border-gray-300'}`}>
                                        {paymentMethod === 'cod' && <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>}
                                    </div>
                                    <span className="font-bold text-gray-700">Cash on Delivery</span>
                                </div>
                                <div className="text-2xl">💵</div>
                            </label>
                        </div>

                        {/* Order Summary in Checkout */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex justify-between text-xl font-black text-gray-900 mb-6">
                                <span>Total to Pay</span>
                                <span>${getTotalCartAmount()}</span>
                            </div>
                            <button className="w-full bg-gray-900 hover:bg-red-600 text-white py-5 rounded-2xl font-black transition-all shadow-lg uppercase tracking-widest active:scale-95 cursor-pointer">
                                Place Order Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;