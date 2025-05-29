import { createContext, useContext, useState, useEffect } from "react";

// Function to parse the price from the JSON file
const parsePrice = (priceString) => {
  // Remove the currency symbol and any whitespace
  const prices = priceString.replace(/[₹\s]/g, '').split('-');
  // Convert the prices to numbers
  const priceNumbers = prices.map(price => parseFloat(price));
  // Return the minimum price for simplicity
  return Math.min(...priceNumbers);
};

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => {
      const price = parsePrice(item.price);
      const quantity = parseInt(item.quantity, 10);
      if (isNaN(price) || isNaN(quantity)) {
        console.error(`Invalid price or quantity for item: ${item.name}`);
        return acc;
      }
      const itemTotal = price * quantity;
      console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}, Item Total: ${itemTotal}`);
      return acc + itemTotal;
    }, 0); // Initialize acc to 0
    setTotal(newTotal);
    console.log(`New Total: ${newTotal}`);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage whenever it changes
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(cart.map((item) => (item.id === productId ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  return (
    <CartContext.Provider value={{ cart, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);