import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../types';
import { fetchProducts } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { FaArrowRight } from 'react-icons/fa';

const categories = [
  {
    id: 'smartphones',
    name: 'Smartphones',
    description: 'Latest smartphones from top brands',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'laptops',
    name: 'Laptops',
    description: 'High-performance laptops for work and gaming',
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'fragrances',
    name: 'Fragrances',
    description: 'Luxury fragrances for men and women',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  },
];

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(
      fetchProducts({
        limit: 8,
        page: 1,
      })
    );
  }, [dispatch]);

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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-12 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Modern E-Commerce
          </h1>
          <p className="text-lg mb-6">
            Discover amazing products at great prices. Shop with confidence and
            enjoy our fast delivery service.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Shop Now
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
          >
            View All
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-200 group-hover:opacity-75 sm:aspect-none sm:h-96">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-center object-cover sm:w-full sm:h-full"
                />
              </div>
              <div className="flex-1 p-4 space-y-2 flex flex-col">
                <h3 className="text-xl font-medium text-gray-900">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">{category.description}</p>
                <div className="flex-1 flex items-end">
                  <Link
                    to={`/products?category=${category.id}`}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deals Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Hot Deals</h2>
          <Link
            to="/deals"
            className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
          >
            View All Deals
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products
            .filter((product) => product.discountPercentage)
            .slice(0, 4)
            .map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
