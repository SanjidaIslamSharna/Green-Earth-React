import React  from "react";
import Image1 from "../assets/hero-leaf1.png";
import Image2  from "../assets/hero-leaf2.png";

const Hero = () => {
    return (
            <section id="home" className="w-full bg-[#CFF0DC] md:pt-10">
      <div
        className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center"
      >
        <img
          className="w-full md:w-1/4 h-auto object-cover rounded-lg"
          src={Image1}
          alt="A person planting a tree"
        />
        <div
          className="flex flex-col items-center justify-center md:w-2/4 p-4 text-center"
        >
          <h1 className="text-2xl md:text-4xl font-semibold text-[black] mb-4">
            Plant a Tree, Grow a Future
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Join our mission to plant 1 million trees and make the Earth greener
            for future generations.
          </p>
        </div>
        <img
          className="w-full md:w-1/4 h-auto object-cover rounded-lg mt-6 md:mt-0 md:ml-6"
          src={Image2}
          alt="A person planting a tree"
        />
      </div>
    </section>
    );
}

export default Hero;