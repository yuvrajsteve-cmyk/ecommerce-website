import { useState } from 'react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSubscribe = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address! ❌')
      setIsError(true)
      setTimeout(() => setMessage(''), 3000)
      return
    }

    try {
      // 🚨 ਬਾਰੀਕੀ: ਇੱਥੇ method ਸਖ਼ਤੀ ਨਾਲ 'POST' ਲਾਕ ਕਰ ਦਿੱਤਾ ਹੈ
      const response = await fetch('http://localhost:4000/subscribe', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(data.message)
        setIsError(false)
        setEmail('')
      } else {
        setMessage(data.message || 'Already Subscribed! ⚠️')
        setIsError(true)
      }
    } catch {
      setMessage('Server error, try again later! ❌')
      setIsError(true)
    }

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <div className='w-full lg:px-60 md:px-12 px-6 my-10 select-none flex justify-center items-center'>
      <div className='w-full py-16 md:h-[40vh] flex flex-col items-center justify-center bg-linear-to-b from-pink-100 to-white gap-6 md:gap-8 px-6 md:px-16 relative rounded-3xl border border-gray-100/50 shadow-xs'>

        <h1 className='text-gray-800 text-2xl md:text-5xl font-black text-center leading-tight uppercase font-sans tracking-tight'>
          Get Exclusive Offers On Your Email
        </h1>
        <p className='text-gray-600 text-sm md:text-xl text-center font-medium'>
          Subscribe to our newsletter and stay updated
        </p>

        <div className='flex flex-row items-center justify-between bg-white w-full max-w-[650px] h-[55px] md:h-[70px] rounded-full border border-gray-200 pl-5 md:pl-8 overflow-hidden shadow-xs'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Your Email id'
            className='w-full border-none outline-none text-gray-700 text-xs md:text-base bg-transparent'
          />
          <button
            type='button'
            onClick={handleSubscribe}
            className='w-[100px] md:w-[210px] h-full rounded-full bg-gray-900 text-white text-xs md:text-base font-bold cursor-pointer hover:bg-gray-800 transition-all active:scale-95 uppercase tracking-wider'
          >
            Subscribe
          </button>
        </div>

        {message && (
          <div className={`absolute -bottom-10 md:bottom-5 px-6 py-2 rounded-full shadow-lg transition-all duration-500 ${isError ? 'bg-red-500' : 'bg-green-500'} text-white text-sm md:text-base font-bold tracking-wide`}>
            {message}
          </div>
        )}

      </div>
    </div>
  )
}

export default Newsletter
