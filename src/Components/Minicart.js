import React from "react";
import { useMinicart } from "../Contexts/MinicartContext";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom"; // Assuming you are using react-router-dom for navigation

const MiniCart = () => {
  const { cartOpen, handleCartClose } = useMinicart();
  const { cart, total, addToCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Close the mini cart
    handleCartClose();
    // Navigate to the checkout page
    navigate('/checkout');
  };

  return (
    
      <div>
        {/* Sliding Mini Cart */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-5 transition-transform duration-300 ease-in-out transform ${
            cartOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          style={{ zIndex: 1000 }} // Ensure mini cart is above the overlay
        >
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-gray-600" onClick={handleCartClose}>❌</button>

          <h4 className="text-xl font-bold mb-4">Your Cart</h4>

          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <ul className="space-y-3 overflow-y-auto max-h-80">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p><img src={require(`../assets/images/products/${item.image}-100x100.jpg`)} alt={item.name} className="" />
                    </p>
                    <div className="flex items-center space-x-2">
                      <button 
                        className="px-2 bg-gray-200 rounded" 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >-</button>
                      <span className="text-sm">{item.quantity}</span>
                      <button 
                        className="px-2 bg-gray-200 rounded" 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >+</button>
                    </div>
                  </div>
                  <button className="text-red-500" onClick={() => removeFromCart(item.id)}>❌</button>
                </li>
              ))}
            </ul>
          )}

          {/* Cart Total */}
          <p className="text-right font-bold mt-3">
            Total: ₹{total}
          </p>

          {/* Proceed to Checkout Button */}
          <button
            className="w-full bg-blue-500 text-white py-2 px-4 rounded mt-4"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>

        {/* Background Overlay when Cart is Open */}
        {cartOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" 
            onClick={handleCartClose}
            style={{ zIndex: 999 }} // Ensure overlay is below the mini cart
          ></div>
        )}
      </div>
    
  );
};

export default MiniCart;