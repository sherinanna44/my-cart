import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/orders`, {
          headers: { Authorization: token },
        });
        console.log(response);
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Order ID</th>
              <th className="py-2">Status</th>
              <th className="py-2">Created At</th>
              <th className="py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="py-2 px-4">
                  <ul className="list-disc list-inside">
                    {order.cart.map((item, index) => (
                      <li key={index}>
                        {item.name} - Quantity: {item.quantity} - Price: {item.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;