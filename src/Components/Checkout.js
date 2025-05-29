import React, { useState, useEffect } from "react";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState({
    address: '',
    city: '',
    postalCode: ''
  });
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [sameAsBilling, setSameAsBilling] = useState(false);

  useEffect(() => {
    const fetchUserAddress = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user`, {
          headers: { Authorization: token }
        });
        setUserAddress({
          address: response.data.user.address,
          city: response.data.user.city,
          postalCode: response.data.user.postalCode
        });
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    fetchUserAddress();
  }, []);

  const handleCheckboxChange = (e) => {
    setSameAsBilling(e.target.checked);
    if (e.target.checked) {
      setShippingInfo(userAddress);
    } else {
      setShippingInfo({
        name: '',
        address: '',
        city: '',
        postalCode: '',
      });
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = localStorage.getItem("userId"); // Assuming you have the user ID stored in localStorage
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/save-order`, {
        userId,
        cart,
        shippingInfo,
        paymentInfo,
      });
      alert("Order placed successfully!");
      clearCart(); // Clear the cart after order success
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error placing order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <img src={require(`../assets/images/products/${item.image}-100x100.jpg`)} alt={item.name} className="" />
                </div>
                <p>Price: {item.price}</p>
              </li>
            ))}
          </ul>
        )}
        <p className="text-right font-bold mt-3">Total: ₹{total}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input type="text" name="name" value={shippingInfo.name} onChange={handleShippingChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">City</label>
          <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Postal Code</label>
          <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input type="checkbox" checked={sameAsBilling} onChange={handleCheckboxChange} className="form-checkbox" />
            <span className="ml-2">Shipping address same as billing address</span>
          </label>
        </div>

        <h3 className="text-xl font-semibold mb-2">Payment Information</h3>
        <div className="mb-4">
          <label className="block mb-1">Card Number</label>
          <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Expiration Date</label>
          <input type="text" name="expirationDate" value={paymentInfo.expirationDate} onChange={handlePaymentChange} className="w-full p-2 border" required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">CVV</label>
          <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentChange} className="w-full p-2 border" required />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;