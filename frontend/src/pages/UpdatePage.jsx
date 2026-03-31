import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router'
import toast from 'react-hot-toast'

function UpdatePage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isUpdating, setIsUpdating] = useState(false)

    // Step 4: Fetch single product
    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await fetch(`/api/products/${id}`)
                const data = await response.json()
                setProduct(data)
                setProductName(data.name)
                setPrice(data.price)
                setImageurl(data.image)
            } catch (error) {
                console.error("Error fetching product:", error)
                toast.error("Failed to load product")
            } finally {
                setLoading(false)
            }
        }

        getProduct()
    }, [id])

    // Step 5: Form state
    const [productName, setProductName] = useState("")
    const [price, setPrice] = useState("")
    const [imageurl, setImageurl] = useState("")

    // Step 6: Form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsUpdating(true)

        const updatedProduct = {
            name: productName,
            price: parseFloat(price),
            image: imageurl
        }

        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            })

            // Step 7: Success handling
            if (response.ok) {
                toast.success("Product updated successfully!")
                navigate("/")
            } else {
                const data = await response.json()
                toast.error("Error: " + (data.message || "Failed to update product"))
            }
        } catch (error) {
            console.error("Error updating product:", error)
            toast.error("Error updating product")
        } finally {
            setIsUpdating(false)
        }
    }

    if (loading) {
        return (
            <div className='min-h-screen bg-gray-50 py-12 px-4 pt-32'>
                <div className='max-w-md mx-auto text-center'>
                    <div className='text-gray-600'>Loading product...</div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className='min-h-screen bg-gray-50 py-12 px-4 pt-32'>
                <div className='max-w-md mx-auto text-center'>
                    <div className='text-red-600'>Product not found</div>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-gray-50 py-12 px-4 pt-32 relative'>
            {/* Back to Home Button - Top Left */}
            <Link
                to="/"
                className="absolute top-42 left-8 inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
            </Link>

            <div className='w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8'>
                <h1 className='font-bold text-3xl text-center text-gray-900 mb-8'>Update Product</h1>
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
                        disabled={isUpdating}
                    >
                        {isUpdating ? "Updating..." : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePage