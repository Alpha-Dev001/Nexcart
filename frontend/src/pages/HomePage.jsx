import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Footer from '../components/Footer'
import SkeletonLoader from '../components/SkeletonLoader'

function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const getProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      console.log("Fetched products:", data)
      setProducts(data || [])
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE"
      })

      if (response.ok) {
        // Remove product from state without refetching
        setProducts(products.filter(product => product._id !== id))
        toast.success("Product deleted successfully")
        console.log("Product deleted successfully")
      } else {
        toast.error("Failed to delete product")
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <div id="hero" className='relative bg-black text-white py-20 px-4 pt-32 min-h-screen flex items-center justify-center overflow-hidden'>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
        </div>

        <div className='relative z-10 max-w-7xl mx-auto text-center'>
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-gray-900 border border-gray-800 rounded-full text-sm font-medium text-gray-300 mb-6">
              PREMIUM COLLECTION 2026
            </span>
          </div>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 tracking-tight'>
            Welcome to
            <span className='block text-gray-400'>Nexcart</span>
          </h1>
          <p className='text-xl md:text-2xl mb-12 text-gray-500 max-w-3xl mx-auto leading-relaxed'>
            Discover exceptional products with timeless design and uncompromising quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                const productsSection = document.getElementById('products');
                const navbarHeight = 80; // Approximate navbar height
                const elementPosition = productsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                window.scrollTo({
                  top: offsetPosition,
                  behavior: 'smooth'
                });
              }}
              className='bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3'
            >
              Explore Collection
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <Link
              to="/create"
              className="border-2 border-gray-700 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:border-gray-600 transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Product
            </Link>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div id="products" className='bg-gray-50 py-16 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className="text-center mb-16">
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-black'>Our Collection</h2>
            <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
              Curated selection of premium products designed for excellence
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {products.length === 0 ? (
              <div className='col-span-full text-center py-20'>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className='text-2xl font-semibold text-black mb-3'>No Products Yet</h3>
                <p className='text-gray-600 mb-8 max-w-md mx-auto'>Start building your collection by creating your first product</p>
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Product
                </Link>
              </div>
            ) : (
              products.map((product) => (
                <Link to={`/update/${product._id}`} key={product._id} className="group">
                  <div className='bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 relative overflow-hidden border border-gray-100 group-hover:border-gray-200'>
                    {/* Product Image */}
                    <div className='relative h-64 bg-gray-100 overflow-hidden'>
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Action Button */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            deleteProduct(product._id)
                          }}
                          className='bg-white/90 backdrop-blur-sm hover:bg-white p-2.5 rounded-xl shadow-lg transition-all duration-300 hover:scale-110'
                          title="Delete product"
                        >
                          <Trash2 size={16} className="text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className='p-6'>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className='text-xl font-semibold text-black group-hover:text-gray-700 transition-colors duration-300'>{product.name}</h3>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                          In Stock
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className='text-3xl font-bold text-black'>${product.price.toFixed(2)}</p>
                          <p className="text-sm text-gray-500 mt-1">Complimentary shipping</p>
                        </div>

                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default HomePage