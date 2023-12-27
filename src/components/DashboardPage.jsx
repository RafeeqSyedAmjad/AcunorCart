import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart } from 'react-icons/fa';

const DashboardPage = () => {
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching data:', error));

        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
    }, []);

    // Inside handleBuy function in Dashboard page
    const handleBuy = (productId) => {
        const selectedProduct = products.find((product) => product.id === productId);

        // Check if the selected product is already in the cart
        const existingItem = cartItems.find((item) => item.id === productId);

        if (existingItem) {
            // If the product is already in the cart, update its quantity
            const updatedCartItems = cartItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Update local storage
        } else {
            // If it's a new product, add it to cart with quantity 1
            const updatedCartItems = [...cartItems, { ...selectedProduct, quantity: 1 }];
            setCartItems(updatedCartItems);
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); // Update local storage
        }
    };


    const handleLogout = () => {
        alert('Logged out successfully!');
        navigate('/');
    };

    return (
        <div>
            {/* Navigation Bar */}
            <nav className="flex justify-between items-center bg-gray-200 p-4">
                <Link to="/" className="text-xl font-bold">
                    Acunor
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/checkout" className="relative">
                        <FaShoppingCart size={28} />
                        {/* Cart icon with item count */}
                        {cartItems.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex justify-center items-center text-xs">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>
                    {/* User icon for logout popup */}
                    <FaUser size={28} onClick={() => setShowLogoutPopup(true)} />
                </div>
            </nav>

            {/* Product List */}
            <div className="flex flex-wrap justify-center p-4">
                {products.map((product) => (
                    <div key={product.id} className="m-4 p-4 border rounded-md">
                        <img src={product.image} alt={product.title} className="h-32 w-auto mb-2" />
                        <h3 className="font-bold">{product.title.split(' ').slice(0, 6).join(' ')}</h3>
                        <p>${product.price}</p>
                        <button onClick={() => handleBuy(product.id)} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                            Buy
                        </button>
                    </div>
                ))}
            </div>

            {/* Logout Popup */}
            {showLogoutPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white space-x-4 p-4 rounded">
                        <p>Are you sure you want to logout?</p>
                        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 mt-2 rounded">
                            Logout
                        </button>
                        <button onClick={() => setShowLogoutPopup(false)} className="bg-gray-300 px-4 py-2 mt-2 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
