import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productSlice';
import { RootState } from '../types';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import Pagination from '../components/Pagination';

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const { products, total, loading, error } = useSelector((state: RootState) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const itemsPerPage = 12;

  useEffect(() => {
    // Fetch initial products
    dispatch(fetchProducts({ limit: itemsPerPage, skip: (currentPage - 1) * itemsPerPage }));
    
    // Fetch categories
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Failed to fetch categories:', err));
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    dispatch(fetchProducts({ limit: itemsPerPage, skip: (page - 1) * itemsPerPage }));
  };

  const handleFilterChange = (filters: { category?: string; minPrice?: number; maxPrice?: number }) => {
    dispatch(fetchProducts({ ...filters, limit: itemsPerPage, skip: (currentPage - 1) * itemsPerPage }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <Filters categories={categories} onFilterChange={handleFilterChange} />
        </div>
        
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {total > itemsPerPage && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(total / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
