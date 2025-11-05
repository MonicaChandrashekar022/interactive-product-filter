interface ProductCardProps {
  product: {
    id: number;
    title: string;
    price: number;
    description: string;
    thumbnail: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
      <h3 className="text-lg font-bold mt-2">{product.title}</h3>
      <p className="text-gray-600 mt-1">${product.price}</p>
      <p className="text-sm mt-2">{product.description}</p>
      <p className="text-xs text-gray-500 mt-1">{product.category}</p>
    </div>
  );
}

