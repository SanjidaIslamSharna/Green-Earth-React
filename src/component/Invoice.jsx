import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import Logo from "../assets/favicon.ico";

const Invoice = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const componentRef = useRef();

  const handlePrint = () => {
    const cart = JSON.parse(localStorage.getItem("checkoutCart") || "[]");
    const total = parseFloat(localStorage.getItem("checkoutTotal") || "0");

    const logoURL = Logo; // Logo URL
    const companyName = "TreeShop";
    const companyAddress = "123 Green Street, Nature City, Earth";
    const companyEmail = "contact@treeshop.com";
    const companyPhone = "+880 123 456 789";

    let tableRows = cart.map(item => `
        <tr>
        <td>${item.name}</td>
        <td style="text-align:center;">${item.quantity}</td>
        <td style="text-align:right;">$${item.price.toFixed(2)}</td>
        <td style="text-align:right;">$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    `).join("");

    const newWindow = window.open("", "_blank", "width=900,height=700");

    newWindow.document.write(`
        <html>
        <head>
            <title>Invoice</title>
            <style>
            body { font-family: Arial, sans-serif; padding: 20px; color: #333; }
            header { display: flex; justify-content: space-between; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; margin-bottom: 20px; }
            header img { height: 60px; }
            .company-info { text-align: right; font-size: 12px; line-height: 1.4; }
            h1 { text-align: center; color: #4CAF50; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f4f4f4; text-align: left; }
            tr:nth-child(even) { background-color: #f9f9f9; }
            .total-row td { font-weight: bold; font-size: 16px; background-color: #f4f4f4; }
            footer { text-align: center; font-size: 12px; border-top: 1px solid #ddd; padding-top: 10px; color: #555; }
            </style>
        </head>
        <body>
            <header>
            <div><img src="${logoURL}" alt="Logo" /></div>
            <div class="company-info">
                <div>${companyName}</div>
                <div>${companyAddress}</div>
                <div>Email: ${companyEmail}</div>
                <div>Phone: ${companyPhone}</div>
            </div>
            </header>

            <h1>Invoice</h1>

            <table>
            <thead>
                <tr>
                <th>Product</th>
                <th style="text-align:center;">Quantity</th>
                <th style="text-align:right;">Unit Price</th>
                <th style="text-align:right;">Subtotal</th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
                <tr class="total-row">
                <td colspan="3" style="text-align:right;">Total</td>
                <td style="text-align:right;">$${total.toFixed(2)}</td>
                </tr>
            </tbody>
            </table>

            <footer>
            Thank you for your purchase! Visit us at www.treeshop.com
            </footer>

            <script>
            window.onload = function() { window.print(); window.close(); }
            </script>
        </body>
        </html>
    `);

    newWindow.document.close();
    };



  useEffect(() => {
    const savedCart = localStorage.getItem("checkoutCart");
    const savedTotal = localStorage.getItem("checkoutTotal");

    if (savedCart && savedTotal) {
      setCart(JSON.parse(savedCart));
      setTotal(parseFloat(savedTotal));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (cart.length === 0) return null;

  return (
    <section className="w-screen py-10 bg-[#F0FDF4] flex justify-center">
      <div className="max-w-4xl w-full">
        <div className="bg-white p-6 rounded-xl shadow-lg" id="invoice-body">
          <h2 className="text-3xl font-bold mb-6 text-center">Invoice</h2>

          <ul className="space-y-3 mb-6">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-semibold text-xl border-t pt-3">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Print Invoice
          </button>
          <button
            onClick={() => navigate("/products")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </section>
  );
};

export default Invoice;
