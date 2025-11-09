import React from "react";

const ProductCards = ({ product }) => {
  return (
    <div className="plant_item bg-white rounded-xl p-4 flex flex-col h-fit gap-2 shadow-md">
      <div className="image h-[186px] overflow-hidden flex justify-center items-center">
        <img className="w-full object-cover" src={product.image} alt={product.name} />
      </div>
      <div className="flex flex-col gap-2">
        <h6 className="font-bold text-lg">{product.name}</h6>
        <p className="text-sm">{product.description.substring(0, 80) + "..."}</p>
        <div className="flex justify-between items-center">
          <span className="bg-[#DCFCE7] text-[#15803D] px-4 py-1 rounded-full">
            {product.category}
          </span>
          <span className="font-bold text-gray-700">৳ {product.price}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
