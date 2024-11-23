import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import {
  removeFromCart,
  updateQuantity,
} from '../features/cart/cartSlice';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item._id));
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= item.product.stock) {
      dispatch(updateQuantity({ productId: item._id, quantity: newQuantity }));
    }
  };

  const itemTotal = item.product.price * item.quantity;
  const discountedPrice = item.product.price * (1 - (item.product.discountPercentage || 0) / 100);
  const discountedTotal = discountedPrice * item.quantity;

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <img
        src={item.product.thumbnail}
        alt={item.product.title}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1 ml-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {item.product.title}
        </h3>
        
        <div className="mt-1 flex items-center text-sm text-gray-500">
          <span>{item.product.category}</span>
          {item.product.discountPercentage && (
            <>
              <span className="mx-2">•</span>
              <span className="text-red-500">
                {Math.round(item.product.discountPercentage)}% OFF
              </span>
            </>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <FaMinus size={12} />
            </button>
            
            <span className="text-gray-700">{item.quantity}</span>
            
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              disabled={item.quantity >= item.product.stock}
              className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
              <FaPlus size={12} />
            </button>
          </div>

          <div className="text-right">
            {item.product.discountPercentage ? (
              <div>
                <span className="text-lg font-bold text-gray-900">
                  ${discountedTotal.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${itemTotal.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ${itemTotal.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleRemoveFromCart}
        className="ml-4 p-2 text-gray-400 hover:text-red-500"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
