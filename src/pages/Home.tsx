import { useState } from "react";
import Hero from "../Components/Hero";

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);

  const products = [
    {
      name: "Ceylon Cinnamon Sticks",
      description: "Premium hand-rolled cinnamon quills from Sri Lanka",
      image: "🌿",
      benefits: ["100% Pure", "No Additives", "Traditional Processing"],
    },
    {
      name: "Cinnamon-Infused Sugar",
      description: "Natural sweetness with aromatic cinnamon essence",
      image: "🍯",
      benefits: ["Perfect for Baking", "Natural Flavor", "Health Benefits"],
    },
    {
      name: "Cinnamon-Infused Coffee",
      description: "Rich aromatic blend with authentic Ceylon cinnamon",
      image: "☕",
      benefits: ["Morning Energy", "Unique Taste", "Antioxidant Rich"],
    },
  ];

  const benefits = [
    {
      icon: "💚",
      title: "Health Benefits",
      desc: "Natural antioxidants and anti-inflammatory properties",
    },
    {
      icon: "🌱",
      title: "Sustainable",
      desc: "Ethically sourced from organic farms",
    },
    {
      icon: "✨",
      title: "Premium Quality",
      desc: "Hand-selected and expertly processed",
    },
    {
      icon: "🌍",
      title: "Global Delivery",
      desc: "Shipping authentic Ceylon cinnamon worldwide",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "London, UK",
      rating: 5,
      text: "The best cinnamon I've ever tasted! The aroma is incredible and the quality is outstanding.",
    },
    {
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 5,
      text: "Ceylon Golden Bark's cinnamon-infused coffee has become my morning ritual. Absolutely love it!",
    },
    {
      name: "Emma Williams",
      location: "Sydney, Australia",
      rating: 5,
      text: "Finally found authentic Ceylon cinnamon! The infused sugar is perfect for my baking.",
    },
  ];

  return (
    <div className="bg-amber-50">
      <Hero />
      {/* Hero Section */}
      {/* <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-yellow-700 to-amber-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block animate-bounce">
              <span className="text-8xl">🌿</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Ceylon Golden Bark
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100 font-light">
              Authentic Ceylon Cinnamon from the Heart of Sri Lanka
            </p>
            <p className="text-lg text-yellow-200/90 max-w-2xl mx-auto">
              Experience the world's finest cinnamon - celebrated for its gentle
              aroma, delicate flavor, and remarkable health benefits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="#products"
                className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-amber-900 font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Explore Products
              </a>
              <a
                href="#story"
                className="px-8 py-4 bg-transparent border-2 border-yellow-300 hover:bg-yellow-300/20 text-yellow-100 font-bold rounded-full transition-all duration-300"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-8 h-8 text-yellow-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section> */}

      {/* Why Ceylon Cinnamon */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Why Ceylon Cinnamon?
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-amber-100"
              >
                <div className="text-6xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-amber-800">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        id="story"
        className="py-20 bg-linear-to-r from-amber-900 via-yellow-700 to-amber-900"
      >
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
              <h3 className="text-3xl md:text-5xl font-bold text-yellow-100 mb-8 text-center">
                Our Story
              </h3>
              <div className="space-y-6 text-yellow-50 text-lg leading-relaxed">
                <p className="text-justify">
                  Welcome to{" "}
                  <span className="font-semibold text-yellow-200">
                    Ceylon Golden Bark
                  </span>
                  , your trusted partner for authentic Ceylon Cinnamon exports.
                  Rooted in the lush landscapes of Sri Lanka, we take pride in
                  offering the world's finest cinnamon—celebrated for its gentle
                  aroma, delicate flavor, and remarkable health benefits.
                </p>
                <p className="text-justify">
                  Our story is shaped by generations of expertise in cultivating
                  and crafting premium Ceylon Cinnamon. What began as a passion
                  for sharing Sri Lanka's natural treasures has grown into a
                  mission to deliver products that honor purity, tradition, and
                  uncompromising quality.
                </p>
                <p className="text-justify">
                  Today, we proudly extend this heritage through our signature
                  creations:
                  <span className="font-semibold text-yellow-200">
                    {" "}
                    Ceylon Cinnamon-Infused Sugar
                  </span>{" "}
                  and
                  <span className="font-semibold text-yellow-200">
                    {" "}
                    Ceylon Cinnamon-Infused Coffee
                  </span>
                  . Each product is crafted with care—infusing the warm,
                  aromatic essence of true Ceylon Cinnamon into everyday
                  essentials.
                </p>
                <p className="text-justify">
                  At Ceylon Golden Bark, we believe in authenticity,
                  sustainability, and preserving the legacy of true Ceylon
                  Cinnamon—one product at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section id="products" className="py-20 bg-amber-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              Our Premium Products
            </h2>
            <p className="text-xl text-amber-700">
              Handcrafted with tradition, delivered with pride
            </p>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mt-4"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  onClick={() => setActiveProduct(index)}
                  className={`bg-white rounded-2xl p-8 shadow-lg cursor-pointer transform transition-all duration-300 border-4 ${
                    activeProduct === index
                      ? "border-yellow-500 scale-105 shadow-2xl"
                      : "border-transparent hover:border-yellow-200 hover:scale-102"
                  }`}
                >
                  <div className="text-7xl mb-6 text-center">
                    {product.image}
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900 mb-3 text-center">
                    {product.name}
                  </h3>
                  <p className="text-amber-700 text-center mb-6">
                    {product.description}
                  </p>
                  <div className="space-y-2">
                    {product.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-amber-800"
                      >
                        <svg
                          className="w-5 h-5 text-yellow-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 px-6 py-3 bg-linear-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
              What Our Customers Say
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-amber-800 italic mb-6">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-amber-200 pt-4">
                  <p className="font-bold text-amber-900">{testimonial.name}</p>
                  <p className="text-sm text-amber-600">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-amber-800 via-yellow-600 to-amber-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Experience Authentic Ceylon Cinnamon?
            </h2>
            <p className="text-xl text-yellow-100">
              Join thousands of satisfied customers worldwide who trust Ceylon
              Golden Bark
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/Products"
                className="px-8 py-4 bg-white hover:bg-yellow-50 text-amber-900 font-bold rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Shop Now
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/20 text-white font-bold rounded-full transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-amber-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">15+</div>
              <div className="text-yellow-100">Years Experience</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">50+</div>
              <div className="text-yellow-100">Countries Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">
                10K+
              </div>
              <div className="text-yellow-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-300 mb-2">
                100%
              </div>
              <div className="text-yellow-100">Pure & Organic</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
