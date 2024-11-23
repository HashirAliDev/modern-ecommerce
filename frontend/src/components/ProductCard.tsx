import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Product } from '../types';
import { addToCart } from '../features/cart/cartSlice';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${product._id}`}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link
          to={`/products/${product._id}`}
          className="text-lg font-semibold text-gray-800 hover:text-blue-600"
        >
          {product.name}
        </Link>
        <div className="mt-2 flex items-center">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="ml-1 text-gray-600">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-600">{product.reviews.length} reviews</span>
        </div>
        <div className="mt-2 flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.discountPercentage && (
              <span className="ml-2 text-sm text-red-600">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FaShoppingCart className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
