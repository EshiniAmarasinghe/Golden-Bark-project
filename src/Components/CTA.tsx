import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="py-12 flex items-center justify-center text-center">
      <div className="mx-auto flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-bold mb-4">Buy Now?</h2>
        <Link
          to="/contact"
          className="bg-stone-900 text-white px-6 py-2 rounded shadow hover:bg-stone-700"
        >
          Contact Us!
        </Link>
      </div>
    </section>
  );
}
