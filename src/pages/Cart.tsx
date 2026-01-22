import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "./Libraries/utilities";

/* ======================
   TypeScript Interfaces
   ====================== */
interface CartItem {
  id: number | string;
  title: string;
  price: number;
  url: string;
  quantity: number;
}

export default function CartPage() {
  /* ======================
     State Management
     ====================== */
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("ceylon_premium_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [promoCode, setPromoCode] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("card");

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("ceylon_premium_cart", JSON.stringify(cart));
  }, [cart]);

  /* ======================
     Calculations & Logic
     ====================== */
  const updateQuantity = (id: string | number, delta: number) => {
    setCart((prev: CartItem[]) =>
      prev
        .map((item: CartItem) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item: CartItem) => item.quantity > 0)
    );
  };

  // 1. Calculate Subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 2. Shipping Logic: $15 fee, or FREE if over $100
  const shippingFee = subtotal < 100.0 || subtotal === 0 ? 0 : 15.0;

  // 3. Discount Logic
  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "CEYLON10") {
      setDiscountPercent(0.1); // 10% off
      alert("Promo code CEYLON10 applied!");
    } else {
      alert("Invalid Promo Code");
      setDiscountPercent(0);
    }
  };

  const discountAmount = subtotal * discountPercent;
  const grandTotal = subtotal + shippingFee - discountAmount;

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-amber-900">
            Your Shopping Cart
          </h1>
          <Link
            to="/products"
            className="text-amber-700 font-bold hover:underline"
          >
            ← Back to Shop
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-amber-100">
            <p className="text-xl text-gray-500 mb-6">
              Your cart is currently empty.
            </p>
            <Link
              to="/products"
              className="bg-amber-900 text-white px-8 py-3 rounded-xl font-bold"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: List of Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-6 rounded-3xl shadow-sm flex gap-6 items-center border border-amber-100"
                >
                  <img
                    src={item.url}
                    className="w-24 h-24 rounded-2xl object-cover"
                    alt={item.title}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-amber-900">
                      {item.title}
                    </h3>
                    <p className="text-amber-600 font-bold">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-amber-200 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-amber-900 hover:bg-amber-50 rounded-full"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center font-bold text-amber-900 hover:bg-amber-50 rounded-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Summary & Payment */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-md h-fit border border-amber-100">
              <h2 className="text-2xl font-bold mb-6 text-amber-900">
                Payment Details
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-lg font-medium text-gray-600">
                  <span>Sub Total:</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-lg font-medium text-gray-600">
                  <span>Shipping:</span>
                  <span
                    className={
                      shippingFee === 0 ? "text-green-600 font-bold" : ""
                    }
                  >
                    {shippingFee === 0 ? "FREE" : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-medium text-green-600 border-b border-amber-50 pb-4">
                  <span>Discounts:</span>
                  <span>
                    -{discountPercent * 100}% (-${discountAmount.toFixed(2)})
                  </span>
                </div>

                <div className="flex justify-between text-2xl font-black text-amber-950 pt-2">
                  <span>Total:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="flex gap-2 mb-8">
                <input
                  type="text"
                  placeholder="Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  onClick={handleApplyPromo}
                  className="bg-amber-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-amber-800 transition-colors"
                >
                  Apply
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="mb-8">
                <p className="text-xs font-bold text-amber-800/50 uppercase tracking-widest mb-3">
                  Pay Via
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {["card", "paypal", "cod"].map((method) => (
                    <button
                      key={method}
                      onClick={() => setPaymentMethod(method)}
                      className={`py-2 rounded-xl border-2 text-xs font-bold transition-all ${
                        paymentMethod === method
                          ? "border-yellow-500 bg-yellow-50 text-amber-900 shadow-sm"
                          : "border-gray-100 text-gray-400 hover:border-amber-100"
                      }`}
                    >
                      {method === "card" && "💳 Card"}
                      {method === "paypal" && "🅿️ PayPal"}
                      {method === "cod" && "💵 Cash"}
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-amber-950 py-5 rounded-2xl font-bold text-xl shadow-lg shadow-yellow-100 transition-all active:scale-95 ">
                Checkout Now
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Secure SSL Encrypted Checkout
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
