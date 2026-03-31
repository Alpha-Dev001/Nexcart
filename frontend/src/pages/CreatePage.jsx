import React, { useState } from 'react'
import { Link } from 'react-router'
import toast from 'react-hot-toast'

function CreatePage() {
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [imageurl, setImageurl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const newProduct = {
            name: productName,
            price: parseFloat(price),
            image: imageurl
        }

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            })

            const data = await response.json()

            if (response.ok) {
                toast.success("Product created successfully!")
                setProductName("")
                setPrice("")
                setImageurl("")
            } else {
                toast.error("Error: " + (data.message || "Failed to create product"))
            }
        } catch (error) {
            console.error("Error creating product:", error)
            toast.error("Error creating product")
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 pt-32 relative'>
            {/* Back to Home Button - Top Left */}
            <Link
                to="/"
                className="absolute top-8 left-8 inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </Link>

            <div className='w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8'>
                <h1 className='font-bold text-3xl text-center text-gray-900 mb-8'>Create New Product</h1>
                <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-full'>
                    <input
                        className='border outline-none border-gray-400 rounded-lg p-4 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200'
                        type="text"
                        placeholder='Product Name'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                    <input
                        className='border border-gray-400 outline-none rounded-lg p-4 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200'
                        type="number"
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <input
                        className='border border-gray-400 rounded-lg p-4 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 outline-none'
                        type="text"
                        placeholder='Image URL'
                        value={imageurl}
                        onChange={(e) => setImageurl(e.target.value)}
                    />
                    <button
                        className='bg-black hover:bg-gray-800 text-white font-semibold rounded-lg p-4 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating..." : "Add product"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreatePage