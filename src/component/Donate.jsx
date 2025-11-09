import React from "react";

const Donate = () => {
    return (
            <section
      id="contact"
      className="bg-[#02491e] py-12"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Plant a Tree Today
        </h2>
        <div
          className="max-w-lg mx-auto p-6 bg-[#15803d] rounded-xl shadow"
        >
          <form id="donateForm" className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="w-full p-2 border rounded bg-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="w-full p-2 border rounded bg-white"
              required
            />
            <input
              type="number"
              name="trees"
              placeholder="Number of Trees"
              className="w-full p-2 border rounded bg-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#FDE047] text-[#15803D] py-2 rounded hover:bg-yellow-400"
            >
              Donate Now
            </button>
          </form>

          <p id="message" className="text-center text-white mt-4 hidden">
            Thank you for your donation! 🌱
          </p>
        </div>
      </div>
    </section>

    );
}

export default Donate;