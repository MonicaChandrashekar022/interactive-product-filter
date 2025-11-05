"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setCategories([...new Set(data.map((p: any) => p.category))]);
      })
      .catch(() => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? p.category === selectedCategory : true)
  );

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Store</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductGrid products={filteredProducts} />
    </div>
  );
}

