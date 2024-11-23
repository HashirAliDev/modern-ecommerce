import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { fetchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 12,
      })
    );
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(
      fetchProducts({
        page: Math.ceil(products.length / 12) + 1,
        limit: 12,
      })
    );
  };

  const handleFilterChange = (category: string) => {
    dispatch(
      fetchProducts({
        page: 1,
        limit: 12,
        category,
      })
    );
  };

  if (loading && products.length === 0) {
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
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {loading && (
        <div className="flex justify-center mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}
      {!loading && products.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
