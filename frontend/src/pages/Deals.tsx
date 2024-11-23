import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { RootState } from '../types';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const Deals: React.FC = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ category: 'deals' }));
  }, [dispatch]);

  const sortedProducts = [...products]
    .filter((product: Product) => product.discountPercentage)
    .sort((a: Product, b: Product) => {
      if (!a.discountPercentage || !b.discountPercentage) return 0;
      return b.discountPercentage - a.discountPercentage;
    });

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
      <h1 className="text-3xl font-bold mb-8">Hot Deals</h1>
      {sortedProducts.length === 0 ? (
        <div className="text-center text-gray-600">No deals available at the moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Deals;
