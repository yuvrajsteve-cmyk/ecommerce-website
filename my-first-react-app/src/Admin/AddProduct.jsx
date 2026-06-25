import React, { useState } from 'react'

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }

    const Add_Product = async () => {
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        // i change the link here http://localhost:4000/upload
        await fetch('https://ecommerce-website-31e9.onrender.com/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data) => { responseData = data });

        if (responseData.success) {
            product.image = responseData.image_url;
            
            // 2. save the project
            // i change the link here http://localhost:4000/addproduct
            await fetch('https://ecommerce-website-31e9.onrender.com/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                if(data.success) {
                    alert("Product Added Successfully!");
                    window.location.reload();
                } else {
                    alert("Failed to Add Product");
                }
            });
        }
    }

    return (
        <div className="p-8 bg-gray-100 min-h-screen flex justify-center items-start">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-2xl">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Add New Product</h1>
                
                <div className="space-y-4">
                    <div>
                        <p className="text-gray-600 font-medium mb-1">Product Title</p>
                        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <p className="text-gray-600 font-medium mb-1">Old Price</p>
                            <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Price' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex-1">
                            <p className="text-gray-600 font-medium mb-1">Offer Price</p>
                            <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='New Price' className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-600 font-medium mb-1">Product Category</p>
                        <select value={productDetails.category} onChange={changeHandler} name="category" className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="women">Women</option>
                            <option value="men">Men</option>
                            <option value="kid">Kid</option>
                        </select>
                    </div>

                    {/* Image Upload Section */}
                    
                    <div className="mt-4">
                        <p className="text-gray-600 font-medium mb-1">Upload Product Image</p>
                        <label htmlFor="file-input">
                            <div className="h-32 w-32 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 bg-gray-50">
                                {image ? 
                                    <img src={URL.createObjectURL(image)} alt="" className="h-full w-full object-contain" /> 
                                    : 
                                    <span className="text-gray-400 text-sm">Click to upload</span>
                                }
                            </div>
                        </label>
                        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
                    </div>

                    <button onClick={Add_Product} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md font-bold hover:bg-blue-700 transition-colors uppercase tracking-wider">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct