import React, { useState, useEffect } from "react";
import Categories from "./layouts/Categories";
import ProductCards from "./cards/ProductCards";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

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

    const addToCart = (product) => {
    console.log("Product added to cart:", product);
  }

  return (
    <section className="w-screen py-5 md:py-20 bg-[#F0FDF4]">
      <div className="px-4 py-2 md:px-[135px] md:py-[24px] mx-auto flex flex-col gap-10">
        <div className="title">
          <h2 className="text-center font-bold text-3xl">Choose Your Trees</h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Categories getPlantByCategory={getPlantByCategory} />
          <div className="md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((product) => (
                <ProductCards key={product.id} product={product} addToCart={addToCart} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
