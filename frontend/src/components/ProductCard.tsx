import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { Product } from '../services/api';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        stock: product.stock,
        quantity: 1,
      })
    );
    toast.success('Added to cart');
  };

  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200">
      <Link to={`/product/${product.id}`} className="block">
        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-t-lg overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-center object-cover group-hover:opacity-90 transition-opacity duration-200"
          />
        </div>
        <div className="px-4 py-3">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.title}
          </h3>
          <div className="mt-1 flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={`${
                    product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                  } h-4 w-4 flex-shrink-0`}
                />
              ))}
            </div>
            <p className="ml-1 text-sm text-gray-500">({product.rating})</p>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <p className="text-lg font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-red-600 font-medium">
                -{Math.round(product.discountPercentage)}% OFF
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        </div>
      </Link>
      <div className="px-4 pb-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
            product.stock === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          <ShoppingCartIcon className="h-5 w-5 mr-2" />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
