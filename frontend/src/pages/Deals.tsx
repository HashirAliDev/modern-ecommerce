import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TagIcon, FireIcon } from '@heroicons/react/24/outline';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../features/products/productSlice';
import { AppDispatch, RootState } from '../store';
import { Product } from '../services/api';

const Deals = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products with discount percentage greater than 10%
  const dealsProducts = products
    .filter((product: Product) => product.discountPercentage > 10)
    .sort((a, b) => b.discountPercentage - a.discountPercentage);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {[...Array(8)].map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="animate-pulse bg-gray-200 rounded-lg h-64"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-red-600 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hot Deals</h1>
          <p className="mt-2 text-gray-600">
            Discover our best discounts and special offers
          </p>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-indigo-600">
          <FireIcon className="h-6 w-6" />
          <span className="font-medium">Best Deals</span>
        </div>
      </div>

      {/* Deals Summary */}
      <div className="bg-indigo-50 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-4">
            <TagIcon className="h-8 w-8 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Big Discounts</h3>
              <p className="text-sm text-gray-600">Up to 70% off on selected items</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <FireIcon className="h-8 w-8 text-indigo-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Hot Deals</h3>
              <p className="text-sm text-gray-600">{dealsProducts.length} items on sale</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-2xl">🎯</span>
            <div>
              <h3 className="font-semibold text-gray-900">Limited Time</h3>
              <p className="text-sm text-gray-600">Don't miss out on these deals</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {dealsProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {dealsProducts.map((product: Product) => (
            <div key={product.id} className="group relative">
              <ProductCard product={product} />
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                -{Math.round(product.discountPercentage)}% OFF
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No deals available at the moment.</p>
          <Link
            to="/products"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Deals;
