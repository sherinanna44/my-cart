import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState({
    address: '',
    city: '',
    postalCode: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.get(`${process.env.REACT_APP_API_URL}/user`, { headers: { Authorization: token } })
      .then(res => {
        setUser(res.data.user);
        setAddress({
          address: res.data.user.address,
          city: res.data.user.city,
          postalCode: res.data.user.postalCode
        });
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevAddress => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/user/address`, address, {
        headers: { Authorization: token }
      });
      alert("Address updated successfully!");
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Error updating address. Please try again.");
    }
  };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.email}</h1>
      <div className="bg-white shadow-md rounded p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Address Details</h2>
        <p><strong>Address:</strong> {user.address}</p>
        <p><strong>City:</strong> {user.city}</p>
        <p><strong>Postal Code:</strong> {user.postalCode}</p>
      </div>
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Update Address</h2>
        <form onSubmit={handleAddressSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={address.address}
              onChange={handleAddressChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleAddressChange}
              className="w-full p-2 border"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded">
            Update Address
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;