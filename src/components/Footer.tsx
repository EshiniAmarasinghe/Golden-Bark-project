import { useState } from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  const contactInfo = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: "Email",
      value: "ceylonspices@gmail.com",
      href: "mailto:ceylonspices@gmail.com",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      label: "Phone",
      value: "077 123 4563",
      href: "tel:+94771234563",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Address",
      value: "Rathmalana, Sri Lanka",
      href: "https://maps.google.com",
    },
  ];

  const socialLinks = [
    { name: "Facebook", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg> },
    { name: "Instagram", href: "#", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg> },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Products", href: "/Products" },
    { name: "Contact Us", href: "/contact" },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [email, setEmail] = useState("");

  const validate = (): boolean => {
    let isValid = true;
    const tempErrors: { email?: string } = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setEmail("");
      setErrors({});
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (errors) {
      console.error(errors)
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-yellow-950 to-yellow-900 text-yellow-50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <span className="text-yellow-900 font-bold text-xl">C</span>
              </div>
              <h3 className="text-2xl font-bold text-yellow-300">Ceylon Spices</h3>
            </div>
            <p className="text-yellow-200/80 text-sm leading-relaxed">
              Premium quality spices from the heart of Sri Lanka, bringing authentic flavors to your kitchen.
            </p>
            <div className="flex space-x-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 bg-yellow-800/50 hover:bg-yellow-400 text-yellow-200 hover:text-yellow-900 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-300 border-b border-yellow-700/50 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-yellow-200/80 hover:text-yellow-300 transition-colors duration-200 inline-flex items-center group">
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 group-hover:w-3 transition-all duration-200"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="text-lg font-semibold text-yellow-300 border-b border-yellow-700/50 pb-2">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map((contact) => (
                <li key={contact.label}>
                  <a href={contact.href} className="flex items-start space-x-3 text-yellow-200/80 hover:text-yellow-300 transition-colors duration-200 group">
                    <span className="text-yellow-400 group-hover:scale-110 transition-transform duration-200 mt-0.5">{contact.icon}</span>
                    <div>
                      <p className="text-xs text-yellow-400/70 font-medium">{contact.label}</p>
                      <p className="text-sm">{contact.value}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-10 pt-8 border-t border-yellow-700/50">
          <div className="max-w-md mx-auto text-center md:text-left md:flex md:items-center md:justify-between md:max-w-none">
            <div className="mb-4 md:mb-0">
              <h4 className="text-lg font-semibold text-yellow-300 mb-1">Stay Updated</h4>
              <p className="text-sm text-yellow-200/70">Subscribe to our newsletter for special offers</p>
            </div>
            
            <div className="flex flex-col gap-2 max-w-md w-full">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`flex-1 px-4 py-2.5 bg-yellow-900/50 border ${errors.email ? 'border-red-500' : 'border-yellow-700/50'} rounded-lg text-yellow-100 focus:outline-none focus:border-yellow-400 transition-all`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Subscribe"}
                </button>
              </form>
              
              {/* Status Messages */}
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              {submitStatus === "success" && (
                <div className="mt-2 p-2 bg-green-500/20 border border-green-500 text-green-300 text-sm rounded">
                  ✓ Successfully subscribed!
                </div>
              )}
              {submitStatus === "error" && (
                <p className="text-red-400 text-xs mt-1">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-yellow-700/30 text-center">
            <p className="text-yellow-400/50 text-xs">© {year} Ceylon Spices. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
