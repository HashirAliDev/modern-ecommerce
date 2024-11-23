import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Product } from '../types';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const discountedPrice = product.price * (1 - (product.discountPercentage || 0) / 100);

  return (
    <Link
      to={`/product/${product._id}`}
      className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="aspect-w-4 aspect-h-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
        />
      </div>

      {product.discountPercentage && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
          {Math.round(product.discountPercentage)}% OFF
        </div>
      )}

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {product.title}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="mx-2 text-gray-300">•</span>
          <span className="text-sm text-gray-600">{product.category}</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {product.discountPercentage ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaShoppingCart className="mr-1" />
            Add
          </button>
        </div>

        {product.stock < 10 && (
          <p className="mt-2 text-sm text-red-600">
            Only {product.stock} left in stock!
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
