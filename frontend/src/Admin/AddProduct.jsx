import React, { useState } from 'react'

const AddProduct = () => {
  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: '',
    category: 'women',
    new_price: '',
    old_price: ''
  })

  const imageHandler = (e) => {
    setImage(e.target.files[0])
  }

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
  }

  const Add_Product = async () => {
    let responseData
    let product = productDetails

    let formData = new FormData()
    formData.append('product', image)

    const token = localStorage.getItem('admin-token')

    await fetch('https://onrender.com', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'admin-token': token,
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data })

    if (responseData.success) {
      product.image = responseData.image_url

      await fetch('https://onrender.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'admin-token': token,
        },
        body: JSON.stringify(product),
      }).then((resp) => resp.json()).then((data) => {
        if(data.success) {
          alert('Product Added Successfully!')
          window.location.reload()
        } else {
          alert('Failed to Add Product')
        }
      })
    }
  }

  return (
    <div className="p-6 md:p-12 bg-linear-to-br from-slate-50 to-blue-50/50 min-h-[90vh] flex justify-center items-start antialiased">
      <div className="bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 w-full max-w-2xl transform transition-all duration-300 hover:shadow-2xl">
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent uppercase tracking-wider">
            Add New Product
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-medium">Create a new item in your store inventory</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-slate-700 font-bold text-sm uppercase tracking-wider mb-2">
              Product Title
            </label>
            <input 
              value={productDetails.name} 
              onChange={changeHandler} 
              type="text" 
              name="name" 
              placeholder="e.g. Premium Oversized Cotton Hoodie" 
              className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-medium text-slate-800 placeholder-slate-400" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-slate-700 font-bold text-sm uppercase tracking-wider mb-2">
                Original Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-semibold">$</span>
                <input 
                  value={productDetails.old_price} 
                  onChange={changeHandler} 
                  type="number" 
                  name="old_price" 
                  placeholder="0.00" 
                  className="w-full pl-9 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-semibold text-slate-800 placeholder-slate-300" 
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold text-sm uppercase tracking-wider mb-2">
                Offer Price ($)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 font-semibold">$</span>
                <input 
                  value={productDetails.new_price} 
                  onChange={changeHandler} 
                  type="number" 
                  name="new_price" 
                  placeholder="0.00" 
                  className="w-full pl-9 pr-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-semibold text-slate-800 placeholder-slate-300" 
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-sm uppercase tracking-wider mb-2">
              Product Category
            </label>
            <div className="relative">
              <select 
                value={productDetails.category} 
                onChange={changeHandler} 
                name="category" 
                className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-bold text-slate-700 appearance-none cursor-pointer"
              >
                <option value="women">Women Fashion</option>
                <option value="men">Men Outfits</option>
                <option value="kids">Kids Wear</option>
              </select>
              <div className="absolute right-4 top-4.5 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.5' d='M19 9l-7 7-7-7'></path>
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-bold text-sm uppercase tracking-wider mb-2">
              Upload Product Image
            </label>
            <label htmlFor="file-input" className="block">
              <div className="group min-h-[160px] w-full flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-500 hover:bg-blue-50/20 bg-slate-50/50 p-4">
                {image ? (
                  <div className="relative w-full max-h-[200px] flex justify-center">
                    <img src={URL.createObjectURL(image)} alt="Preview" className="h-32 object-contain rounded-lg shadow-xs transition-transform duration-300 group-hover:scale-102" />
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <div className="mx-auto w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors duration-200">Click to upload product image</p>
                    <p className="text-xs text-slate-400 font-medium">Supports PNG, JPG, JPEG</p>
                  </div>
                )}
              </div>
            </label>
            <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
          </div>

          <button 
            onClick={Add_Product} 
            className="mt-4 w-full bg-gradient-to-r from-gray-900 to-blue-900 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:from-black hover:to-blue-950 transition-all duration-300 cursor-pointer shadow-md active:scale-[0.99] border-none"
          >
            Add Product To Catalog
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddProduct
