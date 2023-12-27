import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);
        // calculateTotal(storedCartItems);
    }, []);

    useEffect(() => {
        calculateTotal(cartItems);
    }, [cartItems]);

    const calculateTotal = (items) => {
        if (items.length > 0) {
            const total = items.reduce((acc, item) => acc + (item.price * item.quantity || 0), 0);
            setCartTotal(total);
        } else {
            setCartTotal(0);
        }
    };

    const handleDecreaseQuantity = (productId) => {
        const updatedItems = cartItems.map((item) =>
            item.id === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCartItems(updatedItems);
        calculateTotal(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const handleIncreaseQuantity = (productId) => {
        const updatedItems = cartItems.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCartItems(updatedItems);
        calculateTotal(updatedItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
    };

    const handleCheckout = () => {
        localStorage.removeItem('cartItems');
        alert('Purchase completed! Thank you for shopping with us.');
        navigate('/Dashboard');
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border-b py-2">
                            <div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p>${item.price} each</p>
                                <div className="flex items-center mt-2">
                                    <button onClick={() => handleDecreaseQuantity(item.id)} className="px-2 py-1 bg-red-500 text-white rounded">
                                        -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button onClick={() => handleIncreaseQuantity(item.id)} className="px-2 py-1 bg-green-500 text-white rounded">
                                        +
                                    </button>
                                </div>
                            </div>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <p className="font-bold mt-4">Total: ${(cartTotal || 0).toFixed(2)}</p>
                    <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                        Checkout
                    </button>
                </div>
            ) : (
                <p>No items in the cart.</p>
            )}
        </div>
    );
};

export default CheckoutPage;
