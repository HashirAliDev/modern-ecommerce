import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';

interface FiltersProps {
  categories: string[];
  onFilterChange: (filters: { category?: string; minPrice?: number; maxPrice?: number }) => void;
}

const Filters: React.FC<FiltersProps> = ({ categories, onFilterChange }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    onFilterChange({ category, minPrice: priceRange.min, maxPrice: priceRange.max });
    dispatch(fetchProducts({ category, minPrice: priceRange.min, maxPrice: priceRange.max }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange({ min, max });
    onFilterChange({ category: selectedCategory, minPrice: min, maxPrice: max });
    dispatch(fetchProducts({ category: selectedCategory, minPrice: min, maxPrice: max }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          <button
            className={`block w-full text-left px-3 py-2 rounded ${
              selectedCategory === '' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
            }`}
            onClick={() => handleCategoryChange('')}
          >
            All Categories
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`block w-full text-left px-3 py-2 rounded ${
                selectedCategory === category ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="0"
              value={priceRange.min}
              onChange={(e) => handlePriceChange(Number(e.target.value), priceRange.max)}
              className="w-24 px-2 py-1 border rounded"
              placeholder="Min"
            />
            <span>to</span>
            <input
              type="number"
              min="0"
              value={priceRange.max}
              onChange={(e) => handlePriceChange(priceRange.min, Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
