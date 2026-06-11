import React, { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleSubscribe = () => {
    // Email validate karan layi regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setMessage("Subscribed successfully! ✅");
      setIsError(false);
      setEmail(""); // Input clear karan layi
    } else {
      setMessage("Please enter a valid email address! ❌");
      setIsError(true);
    }

    // 3 sekunde baad message hataun layi
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className='flex justify-center items-center w-full px-4 mb-24'>
      <div className='w-full max-w-[1500px] py-16 md:h-[40vh] flex flex-col items-center justify-center bg-linear-to-b from-[#fde1ff] to-[#e1ffea22] gap-6 md:gap-8 px-6 md:px-16 relative rounded-3xl'>
        
        <h1 className='text-[#454545] text-2xl md:text-5xl font-semibold text-center leading-tight'>
          Get Exclusive Offers On Your Email
        </h1>
        <p className='text-[#454545] text-sm md:text-xl text-center'>
          Subscribe to our newsletter and stay updated
        </p>
        
        {/* Input Container - Fully Responsive */}
        <div className='flex flex-row items-center justify-between bg-white w-full max-w-[650px] h-[55px] md:h-[70px] rounded-full border border-[#e3e3e3] pl-5 md:pl-8 overflow-hidden'>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your Email id' 
            className='w-full border-none outline-none text-[#616161] text-xs md:text-base bg-transparent'
          />
          <button 
            onClick={handleSubscribe}
            className='w-[100px] md:w-[210px] h-full rounded-full bg-black text-white text-xs md:text-base cursor-pointer hover:bg-gray-800 transition-all active:scale-95'
          >
            Subscribe
          </button>
        </div>

        {/* Validation Message Popup */}
        {message && (
          <div className={`absolute -bottom-10 md:bottom-5 px-6 py-2 rounded-full shadow-lg transition-all duration-500 animate-fade-in ${isError ? 'bg-red-500' : 'bg-green-400'} text-white text-sm md:text-base`}>
            {message}
          </div>
        )}

      </div>
    </div>
  )
}

export default Newsletter