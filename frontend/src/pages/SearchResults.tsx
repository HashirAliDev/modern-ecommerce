import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../types';
import { searchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const SearchResults: React.FC = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const { items: products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (query) {
      dispatch(searchProducts({ search: query }));
    }
  }, [dispatch, query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for "{query}"
      </h1>
      {products.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          No products found for "{query}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
