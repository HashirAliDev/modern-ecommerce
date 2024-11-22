import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, clearFilters, fetchProducts } from '../features/products/productSlice';
import { RootState } from '../store';
import { getCategories } from '../services/api';

interface Category {
  slug: string;
  name: string;
  url: string;
}

const Filters = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state: RootState) => state.products);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localFilters, setLocalFilters] = useState({
    price: filters.price || [0, 1000],
    category: filters.category || '',
    rating: filters.rating || 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const categoryList = await getCategories();
        if (Array.isArray(categoryList)) {
          setCategories(categoryList);
        } else {
          setError('Invalid category data received');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handlePriceChange = (value: [number, number]) => {
    setLocalFilters(prev => ({ ...prev, price: value }));
  };

  const handleCategoryChange = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    if (category) {
      setLocalFilters(prev => ({
        ...prev,
        category: category.name.toLowerCase()
      }));
    }
  };

  const handleRatingChange = (value: number) => {
    setLocalFilters(prev => ({ ...prev, rating: value }));
  };

  const handleClearFilters = () => {
    // Reset local filter state
    setLocalFilters({
      price: [0, 1000],
      category: '',
      rating: 0,
    });
    // Clear Redux filters
    dispatch(clearFilters());
    // Fetch products without filters
    dispatch(fetchProducts());
    // Close mobile filters if open
    setIsMobileFiltersOpen(false);
  };

  const handleApplyFilters = () => {
    // Dispatch current filters to Redux store and trigger a fetch
    dispatch(setFilters(localFilters));
    dispatch(fetchProducts());
    // Close mobile filters if open
    setIsMobileFiltersOpen(false);
  };

  const formatCategoryName = (category: string | null | undefined): string => {
    if (typeof category !== 'string') return '';
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="relative bg-white shadow-md rounded-lg p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`skeleton-${index}`} className="h-4 bg-gray-200 rounded w-3/4"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative bg-white shadow-md rounded-lg p-4">
        <div className="text-red-500 text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative bg-white shadow-md rounded-lg p-4">
      {/* Mobile filter dialog */}
      <div className="flex items-center justify-between lg:hidden mb-4">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
        >
          <FunnelIcon className="h-5 w-5 mr-2 text-gray-400" />
          Filters
        </button>
        <button
          type="button"
          className="text-sm text-gray-500 hover:text-gray-700"
          onClick={handleClearFilters}
        >
          Clear All
        </button>
      </div>

      <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="space-y-6">
          {/* Price Range */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={localFilters.price[0]}
                  onChange={(e) =>
                    handlePriceChange([parseInt(e.target.value), localFilters.price[1]])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500">${localFilters.price[0]}</span>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={localFilters.price[1]}
                  onChange={(e) =>
                    handlePriceChange([localFilters.price[0], parseInt(e.target.value)])
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-500">${localFilters.price[1]}</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Categories</h3>
            <div className="mt-4 space-y-2">
              {categories.map((category) => (
                <div key={category.slug} className="flex items-center">
                  <input
                    type="radio"
                    id={category.slug}
                    name="category"
                    value={category.name}
                    checked={localFilters.category === category.name.toLowerCase()}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label htmlFor={category.slug} className="ml-3 text-sm text-gray-600 capitalize">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Ratings</h3>
            <div className="mt-4 space-y-2">
              {[4, 3, 2, 1].map((stars) => (
                <div key={`rating-group-${stars}`} className="flex items-center">
                  <input
                    type="radio"
                    id={`rating-${stars}`}
                    name="rating"
                    value={stars}
                    checked={localFilters.rating === stars}
                    onChange={(e) => handleRatingChange(parseInt(e.target.value))}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                  />
                  <label
                    htmlFor={`rating-${stars}`}
                    className="ml-3 flex items-center text-sm text-gray-600"
                  >
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <StarIcon
                          key={`star-${stars}-${index}`}
                          className={`h-4 w-4 flex-shrink-0 ${
                            index < stars ? 'text-yellow-400' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">& Up</span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleApplyFilters}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear All Filters
            </button>
          </div>

          {/* Clear Filters (Desktop) */}
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
