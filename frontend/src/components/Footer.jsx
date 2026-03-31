import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

function Footer() {
    const [email, setEmail] = React.useState("");

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        const navbarHeight = 80; // Approximate navbar height
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Newsletter subscription submitted");
        setEmail(""); // Clear the input after submission
    }

    return (
        <footer className="bg-black text-white py-16 px-4 mt-20">
            <div className="max-w-7xl mx-auto">
                {/* Newsletter Section */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-4">Stay Connected</h3>
                    <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
                        Subscribe to receive exclusive updates and early access to new collections
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto mb-6">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            className="flex-1 px-4 py-3 rounded-lg bg-gray-900 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 transition-colors duration-300"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                            Subscribe
                        </button>
                    </form>
                    <p className="text-sm text-gray-500">
                        Join our community of 10,000+ subscribers. Unsubscribe at any time.
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-800 pt-12">
                    <div className="flex flex-col md:flex-row gap-8">
                        <button
                            onClick={() => scrollToSection('hero')}
                            className="text-gray-400 hover:text-white transition-colors duration-300 text-left font-medium"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('products')}
                            className="text-gray-400 hover:text-white transition-colors duration-300 text-left font-medium"
                        >
                            Collection
                        </button>
                        <Link to="/create" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">Create Product</Link>
                    </div>
                    <div className="text-gray-500 text-sm">
                        &copy; 2024 Nexcart. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;