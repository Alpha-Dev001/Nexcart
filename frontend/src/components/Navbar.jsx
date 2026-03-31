import { ShoppingCartIcon, PlusIcon } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState, useEffect } from "react";

function Navbar() {
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-7 py-4 transition-all duration-500 ${isHomePage && !scrolled
            ? "bg-black/80 backdrop-blur-lg border-b border-gray-800"
            : "bg-white border-b border-gray-200 shadow-lg"
            }`}>
            <Link to={"/"} className={`text-2xl font-bold flex items-center gap-3 transition-all duration-300 hover:scale-105 ${isHomePage && !scrolled
                ? "text-white"
                : "text-gray-900"
                }`}>
                <ShoppingCartIcon className="w-6 h-6" />
                <span className="tracking-tight">Nexcart</span>
            </Link>

            <div className="flex items-center gap-4">
                <Link
                    to={"/create"}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg ${isHomePage && !scrolled
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-black text-white hover:bg-gray-800"
                        }`}
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Create</span>
                </Link>
            </div>

        </nav>
    );
}

export default Navbar;