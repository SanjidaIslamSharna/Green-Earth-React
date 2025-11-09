import React from "react";

const Impact = () => {
    return (
        <section id="impact" className="bg-green-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "black" }}>
          Our Impact
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-[#02491e]">500K++</h3>
            <p>Trees Planted</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-[#02491e]">120+</h3>
            <p>Communities Involved</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-2xl font-bold text-[#02491e]">30+</h3>
            <p>Countries Reached</p>
          </div>
        </div>
      </div>
    </section>
    )
}

export default Impact;