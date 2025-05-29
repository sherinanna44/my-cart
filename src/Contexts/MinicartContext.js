import { useState, createContext, useContext } from "react";

const MinicartContext = createContext();

export const MinicartContextProvider = ({ children }) => {
    const [cartOpen, setCartOpen] = useState(false);

    const handleCartClose = () => {
        setCartOpen(false);
    }

    return (
        <MinicartContext.Provider value={{ cartOpen, setCartOpen, handleCartClose }}>
            {children}
        </MinicartContext.Provider>
    );
};

export const useMinicart = () => {
    return useContext(MinicartContext);
  };