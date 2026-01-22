import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image:
        "https://cdn.shopify.com/s/files/1/1695/0039/files/Close-up_of_cinnamon_sticks_and_ground_cinnamon_480x480.webp?v=1734651693",
      subtitle: "Spice Up Your Life with",
      title: "Ceylon Golden Bark",
      description: "Where Quality Meets Authenticity",
    },
    {
      image: "https://wallpapercave.com/wp/wp3642000.jpg",
      subtitle: "Experience the Finest",
      title: "Pure Ceylon Cinnamon",
      description: "From Sri Lanka's Lush Plantations",
    },
    {
      image: "https://wallpapercave.com/wp/wp3642060.jpg",
      subtitle: "Handcrafted with Tradition",
      title: "Premium Quality Spices",
      description: "Generations of Expertise in Every Product",
    },
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay with blur effect */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

              {/* Gradient Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
              <div
                className={`transition-all duration-1000 delay-300 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <p className="font-semibold font-serif text-xl md:text-4xl lg:text-5xl text-yellow-300 mb-4 animate-fade-in">
                  {slide.subtitle}
                </p>

                <h1 className="font-bold font-serif text-5xl md:text-8xl lg:text-9xl text-yellow-500 leading-tight mb-2 drop-shadow-2xl">
                  {slide.title.split(" ")[0]} {slide.title.split(" ")[1]}
                </h1>
                {slide.title.split(" ").length > 2 && (
                  <h1 className="font-bold font-serif text-5xl md:text-8xl lg:text-9xl text-yellow-500 leading-tight drop-shadow-2xl">
                    {slide.title.split(" ").slice(2).join(" ")}
                  </h1>
                )}

                <p className="font-normal font-sans text-xl md:text-2xl lg:text-3xl text-white mt-6 max-w-2xl mx-auto drop-shadow-lg">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                  <Link
                    to="/products"
                    className="px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-amber-900 font-bold text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  >
                    Explore Products
                  </Link>
                  <Link
                    to="/about"
                    className="px-8 py-4 bg-transparent border-2 border-yellow-400 hover:bg-yellow-400/20 text-yellow-100 font-bold text-lg rounded-full transition-all duration-300 backdrop-blur-sm"
                  >
                    Our Story
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-yellow-500/80 hover:bg-yellow-500 text-amber-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl z-20 backdrop-blur-sm hover:scale-110"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-yellow-500/80 hover:bg-yellow-500 text-amber-900 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-2xl z-20 backdrop-blur-sm hover:scale-110"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-12 md:w-16 h-3 bg-yellow-500 shadow-lg"
                : "w-3 h-3 bg-yellow-400/50 hover:bg-yellow-400/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 hidden md:block">
        <a
          href="#story"
          className="text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          <svg
            className="w-8 h-8"
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
        </a>
      </div>

      {/* Side Text - Vertical */}
      <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-20">
        <div className="writing-mode-vertical text-yellow-300/70 font-semibold tracking-widest text-sm">
          CEYLON GOLDEN BARK
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </div>
  );
}
