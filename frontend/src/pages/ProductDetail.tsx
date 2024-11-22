import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { StarIcon } from '@heroicons/react/24/solid';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { fetchProductById, clearCurrentProduct } from '../features/products/productSlice';
import { RootState } from '../store';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Products
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Image */}
          <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
            <img
              src={currentProduct.thumbnail}
              alt={currentProduct.title}
              className="object-cover object-center w-full h-full"
            />
          </div>

          {/* Product Details */}
          <div className="mt-8 lg:mt-0">
            <h1 className="text-3xl font-bold text-gray-900">{currentProduct.title}</h1>
            
            <div className="mt-4">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center">
                <p className="text-3xl text-gray-900">${currentProduct.price}</p>
                {currentProduct.discountPercentage > 0 && (
                  <span className="ml-4 text-sm text-red-500">
                    {currentProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`${
                        rating < Math.floor(currentProduct.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-200'
                      } h-5 w-5 flex-shrink-0`}
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-700">
                  {currentProduct.rating} out of 5 stars
                </p>
              </div>
            </div>

            {/* Stock */}
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                Stock: {currentProduct.stock}{' '}
                {currentProduct.stock < 10 && (
                  <span className="text-red-500">Low Stock!</span>
                )}
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-900">{currentProduct.description}</p>
            </div>

            {/* Brand & Category */}
            <div className="mt-6">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Brand: <span className="font-medium">{currentProduct.brand}</span>
                </p>
                <span className="mx-2 text-gray-300">|</span>
                <p className="text-sm text-gray-700">
                  Category:{' '}
                  <Link
                    to={`/category/${currentProduct.category}`}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {currentProduct.category}
                  </Link>
                </p>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="mt-8">
              <button
                type="button"
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Product Images Gallery */}
        {currentProduct.images && currentProduct.images.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentProduct.images.map((image: string, index: number) => (
                <div
                  key={index}
                  className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${currentProduct.title} - Image ${index + 1}`}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
