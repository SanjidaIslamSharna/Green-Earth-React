import React from "react";
import aboutImage from "../assets/about.png";
const About = () => {
    return (
    <section id="about" className="bg-[#ecfdf5] py-16" style={{ color: "white" }}>
      <div className="container mx-auto px-4">
        <h2
          className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10"
        >
          About the Campaign
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <img
            src={aboutImage}
            alt="About campaign"
            className="rounded-xl shadow-lg w-full"
          />

          <div className="text-gray-700 text-[1rem]">
            <p className="mb-5">
              Green Earth is a global tree plantation initiative dedicated to
              fighting climate change. Since our start, we’ve planted over
              500,000 trees worldwide. By joining our campaign, you help restore
              forests, create habitats for wildlife, and combat global warming.
            </p>

            <ul className="list-disc list-inside space-y-2">
              <li>Restoration of natural habitats</li>
              <li>Improvement of air quality</li>
              <li>Support for local communities</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    )
}

export default About;