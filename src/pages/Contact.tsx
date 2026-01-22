import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      detail: "ceylonspices@gmail.com",
      link: "mailto:ceylonspices@gmail.com",
    },
    {
      icon: "📞",
      title: "Call Us",
      detail: "077 123 4563",
      link: "tel:+94771234563",
    },
    {
      icon: "📍",
      title: "Visit Us",
      detail: "Negombo, Sri Lanka",
      link: "https://maps.app.goo.gl/X8deQ7VZ7MwNMdwbA",
    },
    {
      icon: "🕒",
      title: "Working Hours",
      detail: "Mon-Fri: 9AM - 6PM",
      link: "#",
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required.";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (formData.phone.length !== 10) {
      tempErrors.phone = "Please enter a valid Phone number.";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required.";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    if (validate()) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } catch {
        setSubmitStatus("error");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

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
            Get In Touch
          </h1>
          <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
            We'd love to hear from you! Whether you have questions about our
            products or need assistance, we're here to help.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 hover:text-amber-400">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-2 border-transparent hover:border-yellow-400 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {info.icon}
              </div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">
                {info.title}
              </h3>
              <p className="text-amber-700">{info.detail}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-100">
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                Why Contact Us?
              </h2>
              <div className="space-y-4">
                {[
                  {
                    title: "Product Inquiries",
                    desc: "Learn more about our premium Ceylon cinnamon products",
                  },
                  {
                    title: "Bulk Orders",
                    desc: "Special rates for wholesale and bulk purchases",
                  },
                  {
                    title: "Partnership Opportunities",
                    desc: "Interested in becoming a distributor? Let's talk!",
                  },
                  {
                    title: "Customer Support",
                    desc: "We're here to help with any questions or concerns",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-amber-900 font-bold">✓</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-amber-900 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-amber-700 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-2 shadow-xl border border-amber-100 overflow-hidden">
              <div className="aspect-video bg-linear-to-br from-amber-100 to-yellow-100 rounded-2xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.3677514668325!2d79.85307213238258!3d7.198815128814176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2efd9cd29b8d7%3A0xfeb74935d2b6e57!2sBest%20Care%20Pet%27s%20Shop%20-%20Negombo%202!5e0!3m2!1sen!2slk!4v1766122278048!5m2!1sen!2slk"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-amber-100">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📬</div>
              <h2 className="text-3xl font-bold text-amber-900 mb-2">
                Send Us a Message
              </h2>
              <p className="text-amber-700">
                We'll get back to you within 24 hours
              </p>
            </div>

            {submitStatus === "success" && (
              <div className="bg-green-50 border-2 border-green-400 text-green-800 px-6 py-4 rounded-xl mb-6">
                <strong className="font-bold">✓ Success! </strong>
                <span>Your message has been sent successfully.</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="bg-red-50 border-2 border-red-400 text-red-800 px-6 py-4 rounded-xl mb-6">
                <strong className="font-bold">✗ Error! </strong>
                <span>Something went wrong. Please try again.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="text-amber-900 font-semibold mb-2 block"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={`w-full border-2 px-4 py-3 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 transition-all ${
                      errors.name
                        ? "border-red-500 focus:ring-red-200"
                        : "border-amber-200 focus:ring-yellow-200"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="text-amber-900 font-semibold mb-2 block"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="077 123 4563"
                    className={`w-full border-2 px-4 py-3 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 transition-all ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-200"
                        : "border-amber-200 focus:ring-yellow-200"
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-600 text-sm mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-amber-900 font-semibold mb-2 block"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@mail.com"
                  className={`w-full border-2 px-4 py-3 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-amber-200 focus:ring-yellow-200"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.email}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-amber-900 font-semibold mb-2 block"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full border-2 px-4 py-3 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 transition-all ${
                    errors.subject
                      ? "border-red-500 focus:ring-red-200"
                      : "border-amber-200 focus:ring-yellow-200"
                  }`}
                >
                  <option value="">Select a subject</option>
                  <option value="product-inquiry">Product Inquiry</option>
                  <option value="bulk-order">Bulk Order</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="support">Customer Support</option>
                  <option value="other">Other</option>
                </select>
                {errors.subject && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.subject}
                  </span>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-amber-900 font-semibold mb-2 block"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className={`w-full border-2 px-4 py-3 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 transition-all resize-none ${
                    errors.message
                      ? "border-red-500 focus:ring-red-200"
                      : "border-amber-200 focus:ring-yellow-200"
                  }`}
                ></textarea>
                {errors.message && (
                  <span className="text-red-600 text-sm mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 transform ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-linear-to-r from-yellow-500 to-amber-600 hover:from-yellow-400 hover:to-amber-500 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message 📨"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
