import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    fetch("https://focusstack-api.onrender.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

  return (
    <div className={dark ? "dark" : ""}>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="absolute top-4 right-4 text-xl focus:outline-none"
          aria-label="Toggle dark mode"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <h1 className="text-3xl font-bold text-center mb-8 dark:text-white">
          🧠 FocusStack
        </h1>

        {/* Filter buttons */}
        <div className="flex justify-center mb-6 gap-4">
          {["all", "timers", "apps", "gear"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full border ${
                category === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              } dark:bg-gray-800 dark:text-gray-300`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 dark:text-white">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">
                  {product.description}
                </p>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          FocusStack is curated by <strong>Eugene</strong>. Some links are affiliate
          links — they cost you nothing but help keep the site online.
        </footer>
      </main>
    </div>
  );
}
