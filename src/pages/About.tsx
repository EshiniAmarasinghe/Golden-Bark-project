import { Link } from "react-router-dom";
export default function About() {
  // <section
  //   id="about-us"
  //   className=" bg-gradient-to-r  from-amber-900 via-yellow-800 to-amber-900 px-4 py-16 h-auto "
  // >
  //   <div className="container mx-auto ">
  //     <div className="grid md:grid-cols-2 gap-5 items-center ">
  //       <div className="space-y-6  ">
  //         <h2 className="text-xl md:text-4xl font-bold leading-10 md:text-left text-center  ">
  //           About Us
  //         </h2>
  //         <div className="flex flex-col gap-3 font-serif text-sm md:text-xl text-black text-justify md:leading-10 font-semibold">
  //           <p>
  //             Welcome to <strong>Ceylon-Golden-Bark</strong>, your trusted
  //             partner for authentic Ceylon Cinnamon exports. Rooted in the
  //             lush landscapes of Sri Lanka, we take pride in offering the
  //             world's finest cinnamon, renowned for its unique aroma, delicate
  //             flavor, and unparalleled health benefits.
  //           </p>
  //           <p>
  //             <strong>Our Story:</strong> Our journey began with a passion for
  //             sharing the natural treasures of Sri Lanka with the world. With
  //             generations of experience in cultivating and processing Ceylon
  //             cinnamon, we remain committed to preserving the authenticity and
  //             tradition that make our cinnamon truly exceptional.
  //           </p>
  //         </div>
  //       </div>
  //       <div className="flex justify-center md:justify-end md:py-20 py-6">
  //         <div className="card md:w-lg w-auto shadow-lg rounded-4xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
  //           <img
  //             src="https://media.istockphoto.com/id/1297441739/photo/cinnamon-powder-is-poured-out-of-the-strainer.jpg?s=612x612&w=0&k=20&c=LKOwAAwVscBjcZbzwEUJnj41kRuZ8U1S1DB6R61fESM="
  //             alt="Cinnamon powder"
  //             className="w-full h-auto"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </section>

  const values = [
    {
      icon: "🌱",
      title: "Sustainability",
      desc: "We prioritize eco-friendly practices in every step of our process",
    },
    {
      icon: "💎",
      title: "Quality",
      desc: "Only the finest Ceylon cinnamon makes it to your table",
    },
    {
      icon: "🤝",
      title: "Trust",
      desc: "Building lasting relationships with our customers worldwide",
    },
    {
      icon: "🏆",
      title: "Excellence",
      desc: "Committed to delivering exceptional products and service",
    },
  ];

  const timeline = [
    {
      year: "1990",
      event: "Founded",
      desc: "Started our journey in Ceylon cinnamon cultivation",
    },
    {
      year: "2005",
      event: "Expansion",
      desc: "Grew our operations and reached international markets",
    },
    {
      year: "2015",
      event: "Innovation",
      desc: "Launched our signature infused product line",
    },
    {
      year: "2024",
      event: "Global Leader",
      desc: "Serving 50+ countries with premium Ceylon cinnamon",
    },
  ];

  const team = [
    { role: "Master Cultivator", name: "15+ Years Experience" },
    { role: "Quality Expert", name: "Certified Professional" },
    { role: "Export Specialist", name: "Global Network" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-amber-100">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-amber-900 via-yellow-700 to-amber-900 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            About Ceylon Golden Bark
          </h1>
          <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
            Rooted in tradition, committed to excellence
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-50 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-amber-900">Our Story</h2>
              <div className="w-24 h-1 bg-yellow-600"></div>
            </div>

            <div className="space-y-4 text-lg leading-relaxed text-amber-800">
              <p>
                Welcome to{" "}
                <span className="font-bold text-amber-900">
                  Ceylon Golden Bark
                </span>
                , your trusted partner for authentic Ceylon Cinnamon exports.
                Rooted in the lush landscapes of Sri Lanka, we take pride in
                offering the world's finest cinnamon, renowned for its unique
                aroma, delicate flavor, and unparalleled health benefits.
              </p>
              <p>
                Our journey began with a passion for sharing the natural
                treasures of Sri Lanka with the world. With generations of
                experience in cultivating and processing Ceylon cinnamon, we
                remain committed to preserving the authenticity and tradition
                that make our cinnamon truly exceptional.
              </p>
              <p>
                Today, we blend time-honored techniques with modern quality
                standards to deliver products that honor both our heritage and
                your expectations.
              </p>
            </div>

          <div className="flex gap-4 pt-4">
           <Link
               to="/products"
               className="inline-block px-6 py-3 bg-linear-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
            Our Products
            </Link>

           <Link
              to="/contact"
               className="inline-block px-6 py-3 border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-bold rounded-full transition-all duration-300"
           >
            Contact Us
           </Link>
          </div>
        </div>


          {/* Image Section */}
          <div className="relative">
            <div className="w-4/6 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img
                src="https://media.istockphoto.com/id/1297441739/photo/cinnamon-powder-is-poured-out-of-the-strainer.jpg?s=612x612&w=0&k=20&c=LKOwAAwVscBjcZbzwEUJnj41kRuZ8U1S1DB6R61fESM="
                alt="Cinnamon powder"
                className="w-full h-150 object-center"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-amber-500 rounded-full blur-3xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-amber-900 mb-4">
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 text-center border border-amber-100"
              >
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-amber-700">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Our Journey
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto"></div>
        </div>

        <div className="relative">
          {/* Center line */}
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-yellow-400 -translate-x-1/2"></div>

          <div className="space-y-16">
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isLeft ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-amber-900 mb-2">
                        {item.event}
                      </h3>
                      <p className="text-amber-700">{item.desc}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-yellow-500 rounded-full border-4 border-white shadow-lg z-10 items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-linear-to-r from-amber-900 via-yellow-700 to-amber-900 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Expert Team
            </h2>
            <p className="text-yellow-100 text-xl">
              Dedicated professionals ensuring excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* team: ajaksjajso */}
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                <div className="w-24 h-24 bg-yellow-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-amber-900"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {member.role}
                </h3>
                <p className="text-yellow-200">{member.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Years Experience" },
              { number: "50+", label: "Countries Served" },
              { number: "10K+", label: "Happy Customers" },
              { number: "100%", label: "Organic & Pure" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-yellow-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-amber-700 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-r from-amber-800 via-yellow-600 to-amber-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Our Journey
          </h2>
          <p className="text-xl text-yellow-100 mb-8 max-w-2xl mx-auto">
            Experience the finest Ceylon cinnamon and become part of our story
          </p>
          <Link to="/products"
           className="px-8 py-4 bg-white hover:bg-yellow-50 text-amber-900 font-bold text-lg rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl">
            Explore Our Products
          </Link>
        </div>
      </section>
    </div>
  );
}
