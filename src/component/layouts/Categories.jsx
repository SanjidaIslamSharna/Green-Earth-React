import { useState, useEffect } from "react";
import CategoryItem from "../cards/CategoryItem";

const Categories = ({ getPlantByCategory }) => {
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    fetch("/categories.json") // ✅ public ফোল্ডারে থাকলে
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))
      .catch((err) => console.error("Failed to load categories:", err));
  }, []);

  const handleClick = (category) => {
    if (category === null) {
      setActive(null);
      getPlantByCategory(null);
    } else {
      setActive(category.category_name);
      getPlantByCategory(category.category_name);
    }
  };

  const categoriesShowAndHide = () => {
    const categoriesElement = document.getElementById("categories");
    categoriesElement.classList.toggle("hidden");
  };

  return (
    <div className="categories w-1/5 flex flex-col items-center md:items-start text-center md:text-left">
      <h5
        className="mb-3 w-full text-xl font-bold cursor-pointer"
        id="categoriList"
        onClick={categoriesShowAndHide}
      >
        Categories
      </h5>

      <ul id="categories" className="w-full hidden md:flex flex-col">
        {/* ✅ All Products */}
        <li
          className={`category-item px-2.5 py-2 cursor-pointer rounded hover:bg-green-100 ${
            active === null ? "bg-green-500 text-white" : ""
          }`}
          onClick={() => handleClick(null)}
        >
          All Products
        </li>

        {/* ✅ Other categories */}
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            handleClick={handleClick}
            active={active}
          />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
