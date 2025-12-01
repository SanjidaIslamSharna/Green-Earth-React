import React from "react";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const { state } = useLocation();

  if (!state) {
    return <p>No invoice data found.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-center mb-4">Invoice</h1>

        <div className="flex flex-row justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Customer Details</h2>
            <p><strong>Name:</strong> {state.customer.name}</p>
            <p><strong>Phone:</strong> {state.customer.phone}</p>
            <p><strong>Email:</strong> {state.customer.email}</p>
            <p><strong>Address:</strong> {state.customer.address}</p>
          </div>
          <div className="">
            <button className="bg-gray-200 hover:bg-gray-300 text-black font-normal py-1 px-2 rounded" onClick={() => window.print()}>
              Print Invoice
            </button>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left">Item</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left">Quantity</th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left">Price</th>
            </tr>
          </thead>
          <tbody>
            {state.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 border-b border-gray-300">{item.name}</td>
                <td className="px-6 py-4 border-b border-gray-300">{item.quantity}</td>
                <td className="px-6 py-4 border-b border-gray-300">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="text-right font-bold mt-6">
          Total: ${state.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Invoice;
