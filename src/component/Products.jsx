import React, { useState, useEffect } from "react";
import Categories from "./layouts/Categories";
import ProductCards from "./cards/ProductCards";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // 🔹 Load cart from localStorage safely
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [total, setTotal] = useState(0);

  // 🔹 Load products from JSON
  useEffect(() => {
    fetch("./allplants.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.plants) {
          setProducts(data.plants);
          setFiltered(data.plants);
        } else {
          setProducts([]);
          setFiltered([]);
        }
      })
      .catch((err) => {
        console.error("Failed to load products:", err);
        setProducts([]);
        setFiltered([]);
      });
  }, []);

  // 🔹 Filter by category
  const getPlantByCategory = (categoryName) => {
    if (!categoryName) {
      setFiltered(products);
      return;
    }
    const filteredItems = products.filter(
      (item) => item.category === categoryName
    );
    setFiltered(filteredItems);
  };

  // 🔹 Calculate total whenever cart changes + save to localStorage
  useEffect(() => {
    const newTotal = cart.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0
    );
    setTotal(newTotal);

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 Add to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // 🔹 Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // 🔹 Checkout
  const checkout = () => {
    alert("Checkout successful! 🎉");
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <section className="w-screen py-5 md:py-20 bg-[#F0FDF4]">
      <div className="px-4 py-2 md:px-[135px] md:py-[24px] mx-auto flex flex-col gap-10">
        <div className="title">
          <h2 className="text-center font-bold text-3xl">Choose Your Trees</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Sidebar */}
          <Categories getPlantByCategory={getPlantByCategory} />

          {/* Product Grid */}
          <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <ProductCards
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>

          {/* 🛒 Cart Section */}
          <div className="w-1/5 bg-white p-3 h-fit rounded-xl shadow-md">
            <h3 className="text-2xl font-bold mb-4">Your Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-2">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <div className="flex items-center gap-3">
                        <span>${item.price * item.quantity}</span>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => removeFromCart(item.id)}
                        >
                          X
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center mt-4 font-semibold text-lg">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={checkout}
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
