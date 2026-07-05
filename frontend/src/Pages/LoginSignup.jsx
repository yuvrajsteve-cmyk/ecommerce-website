import React, { useState } from 'react'

const LoginSignup = () => {
  const [state, setState] = useState('Login')
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  })

  const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:4000' 
    : 'https://onrender.com'

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    let responseData
    await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      
      if (responseData.role === 'admin') {
        localStorage.setItem('admin-token', responseData.adminToken)
        localStorage.setItem('user-email', formData.email)
        window.location.replace('/admin-add')
      } else {
        localStorage.setItem('user-email', formData.email)
        window.location.replace('/')
      }
    } else {
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    let responseData
    await fetch(`${API_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data)

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token)
      localStorage.setItem('user-email', formData.email)
      window.location.replace('/')
    } else {
      alert(responseData.errors)
    }
  }

  return (
    <div className='w-full min-h-[90vh] bg-[#fce3fe] pt-10 md:pt-20 pb-10'>
      <div className='w-[90%] max-w-[580px] bg-white m-auto px-6 py-8 md:px-10 md:py-12 rounded-md shadow-md'>
        <h1 className='text-2xl md:text-3xl font-semibold mb-5'>{state}</h1>

        <div className='flex flex-col gap-3 md:gap-5 mt-5'>
          {state === 'Sign Up' ? (
            <input
              name='username' value={formData.username} onChange={changeHandler}
              className='h-[50px] md:h-[60px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-base md:text-lg'
              type="text" placeholder='Your Name'
            />
          ) : null}

          <input
            name='email' value={formData.email} onChange={changeHandler}
            autoComplete="off"
            className='h-[50px] md:h-[60px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-base md:text-lg'
            type="email" placeholder='Email Address'
          />

          <input
            name='password' value={formData.password} onChange={changeHandler}
            autoComplete="new-password"
            className='h-[50px] md:h-[60px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-base md:text-lg'
            type="password" placeholder='Password'
          />
        </div>

        <button
          onClick={() => { state === 'Login' ? login() : signup() }}
          className='w-full h-[50px] md:h-[60px] text-white bg-[#ff4141] mt-7 border-none text-lg md:text-xl font-medium cursor-pointer active:bg-red-700'
        >
          Continue
        </button>

        {state === 'Sign Up' ? (
          <p className='mt-5 text-[#5c5c5c] text-sm md:text-lg font-medium'>
            Already have an account? <span onClick={() => setState('Login')} className='text-[#ff4141] font-semibold cursor-pointer underline'>Login here</span>
          </p>
        ) : (
          <p className='mt-5 text-[#5c5c5c] text-sm md:text-lg font-medium'>
            Create an account? <span onClick={() => setState('Sign Up')} className='text-[#ff4141] font-semibold cursor-pointer underline'>Click here</span>
          </p>
        )}

        <div className='flex items-start mt-6 gap-2 md:gap-3 text-[#5c5c5c] text-xs md:text-base font-medium'>
          <input className='mt-1' type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
