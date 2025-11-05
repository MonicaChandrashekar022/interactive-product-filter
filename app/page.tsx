"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";

// Define a Product interface for type safety
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data: Product[]) => {
        setProducts(data);
        // Extract unique categories and set state
        setCategories([...new Set(data.map((p) => p.category))]);
      })
      .catch(() => setError("Failed to fetch products"))
      .finally(() => setLoading(false));
  }, []);

  // Filter products based on search term and selected category
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
