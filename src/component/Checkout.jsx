import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config.js"; // adjust path if needed
import { onAuthStateChanged } from "firebase/auth";

const Checkout = () => {
    const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState(""); // Address state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();


    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => unsubscribe();
    }, [])

  useEffect(() => {
    const cartItemsFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCartItems(cartItemsFromLocalStorage);
  }, []);

  const calculateTotalPrice = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (!user) {
      alert("Please log in to place an order");
      navigate("/login");
      return;
    }

    const orderData = {
      items: cartItems,
      total: calculateTotalPrice(),
      customer: {
        name: name,
        phone: phone,
        email: user.email,
        address: address,
      },
    };

    localStorage.removeItem("cart");
    navigate("/invoice", { state: orderData }); // Redirect with data
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Checkout</h1>

      <div className="rounded-lg shadow-lg bg-white p-6">
        <h2 className="text-2xl font-bold mb-2">Cart Details</h2>
        <ul className="list-disc pl-6">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="text-right">Total: ${calculateTotalPrice().toFixed(2)}</p>
      </div>

      {/* Shipping Form */}
      <div className="mt-10 rounded-lg shadow-lg bg-white p-6">
        <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
        <label className="block mt-4 mb-2 font-semibold">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <label className="block mt-4 mb-2 font-semibold">Phone Number</label>
        <input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <label className="block mt-4 mb-2 font-semibold">Address</label>
        <input
          type="text"
          placeholder="Enter your shipping address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
          required
        />

        <button
          className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg w-full mt-6"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
