import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productData } from "./Libraries/default";
import { formatPrice } from "./Libraries/utilities";

/* ======================
   Types
====================== */
interface Product {
  id: number | string;
  title: string;
  price: number;
  url: string;
  intro: string;
  categories?: string | string[];
}

interface CartItem extends Product {
  quantity: number;
}

export default function Products() {
  /* ======================
     Cart State
  ====================== */
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("ceylon_premium_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("ceylon_premium_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);

  /* ======================
     UI State
  ====================== */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);

  const [notification, setNotification] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /* ======================
     Filter State
  ====================== */
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  /* ======================
     Notifications
  ====================== */
  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  /* ======================
     Filtered Products
  ====================== */
  const filteredProducts = (productData as Product[])
    .filter((product) => {
      if (activeCategory === "All Products") return true;
      return Array.isArray(product.categories)
        ? product.categories.includes(activeCategory)
        : product.categories === activeCategory;
    })
    .filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.intro.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name-az":
          return a.title.localeCompare(b.title);
        case "name-za":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-amber-50 font-sans">
      {/* Toast */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-full shadow-xl animate-bounce">
          ✓ {notification}
        </div>
      )}

      {/* Header */}
      <section className="relative bg-amber-800 py-20 text-center text-white">
        <h1 className="text-5xl font-black mb-4">Our Premium Products</h1>
        <p className="text-yellow-100">
          Discover our handcrafted Ceylon cinnamon collection
        </p>

        {/* Filter Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-6 left-6 px-4 py-2 bg-amber-700 rounded-xl font-bold"
        >
          ☰ Filters
        </button>

        {/* Cart */}
        <Link
          to="/cart"
          className="absolute top-6 right-6 bg-yellow-400 px-6 py-3 rounded-full text-2xl font-bold"
        >
          🛒
          {getTotalItems() > 0 && (
            <span className="bg-red-600 text-white px-2 rounded-full text-sm">
              {getTotalItems()}
            </span>
          )}
        </Link>
      </section>

      {/* Sidebar */}
      {isSidebarOpen && (
        <>
          <aside className="fixed inset-y-0 left-0 w-80 bg-amber-100 shadow-2xl z-50 p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button onClick={() => setIsSidebarOpen(false)}>✕</button>
            </div>

            <input
              type="text"
              placeholder=" 🔍 Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full mb-6 px-4 py-3 border rounded-xl"
            />

            <div>
              <h3 className="font-semibold text-xl pb-4">Categories:</h3>
              <div className="space-y-2 mb-6 ">
                {[
                  "All Products",
                  "Food & Beverages",
                  "Essential Oils",
                  "Specialty Items",
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`block w-full text-left px-6 py-2 rounded-xl ${
                      activeCategory === cat
                        ? "bg-amber-900 text-white"
                        : "hover:bg-amber-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <h3 className="font-semibold text-xl pb-4">Price:</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl "
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="name-az">Name A → Z</option>
              <option value="name-za">Name Z → A</option>
            </select>
          </aside>

          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        </>
      )}
      {/* Products */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
            >
              <img
                src={product.url}
                alt={product.title}
                className="h-72 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold">{product.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.intro}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-black">
                    {formatPrice(product.price)}
                  </span>
                  {/* Wrap buttons in a flex container with small gap */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductModal(true);
                      }}
                      className="bg-amber-100 text-amber-900 px-4 py-2 rounded-xl font-bold text-sm hover:bg-amber-200 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        addToCart(product);
                        showNotification(`${product.title} added to cart`);
                      }}
                      className="bg-yellow-500 px-4 py-2 rounded-xl font-bold"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product Quick View Modal (outside the map) */}
        {showProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-100 p-4">
            <div className="bg-amber-100 rounded-5xl max-w-4xl w-full overflow-hidden relative animate-in fade-in zoom-in duration-300">
              <button
                onClick={() => setShowProductModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center hover:bg-black/20 z-10"
              >
                ✕
              </button>
              <div className="grid md:grid-cols-2">
                <img
                  src={selectedProduct.url}
                  alt={selectedProduct.title}
                  className="h-full w-full object-cover max-h-125"
                />
                <div className="p-10 flex flex-col justify-center">
                  <span className="text-amber-600 font-bold tracking-widest uppercase text-sm mb-2">
                    Premium Collection
                  </span>
                  <h2 className="text-4xl font-black text-amber-900 mb-4">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {selectedProduct.intro}
                  </p>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-bold text-amber-950">
                      {formatPrice(selectedProduct.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
