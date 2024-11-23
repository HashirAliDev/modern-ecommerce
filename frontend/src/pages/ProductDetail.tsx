import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types';
import { fetchProductById } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<string>('');

  const { currentProduct: product, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.imageUrl) {
      setSelectedImage(product.imageUrl);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
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
    }
  };

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

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 text-xl">Product not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[product.imageUrl, ...(product.images || [])].map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`aspect-w-1 aspect-h-1 w-full border-2 rounded-lg overflow-hidden ${
                  selectedImage === image ? 'border-blue-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-lg font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-500">
              ({product.reviews.length} reviews)
            </span>
          </div>

          <div className="flex items-baseline space-x-4">
            <p className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                {product.discountPercentage}% OFF
              </div>
            )}
          </div>

          <div className="border-t border-b py-4">
            <p className="text-gray-700">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Brand</span>
              <span className="font-medium">{product.brand}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Category</span>
              <span className="font-medium">{product.category}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Stock</span>
              <span className="font-medium">{product.stock} units</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
