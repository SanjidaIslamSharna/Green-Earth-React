import React from "react";

const CategoryItem = ({ category, handleClick, active }) => {

  return (
    
    <li
      className={`category-item px-2.5 py-2 cursor-pointer rounded 
      ${active === category.category_name ? "bg-green-500 text-white" : "hover:bg-green-100"}`}
      onClick={() => handleClick(category)}
    >
      {category.category_name}
    </li>
  );
};

export default CategoryItem;
