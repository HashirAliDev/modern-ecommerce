import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import CartItem from '../components/CartItem';
import { FaShoppingBag } from 'react-icons/fa';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, total } = useSelector((state: RootState) => state.cart);

  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.product.price * (1 - (item.product.discountPercentage || 0) / 100);
    return sum + itemPrice * item.quantity;
  }, 0);

  const totalSavings = items.reduce((sum, item) => {
    if (!item.product.discountPercentage) return sum;
    const savings = (item.product.price * item.product.discountPercentage / 100) * item.quantity;
    return sum + savings;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="text-center py-12">
          <FaShoppingBag className="mx-auto text-gray-400 text-6xl mb-4" />
          <p className="text-gray-600 mb-6">Your cart is empty</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {items.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {totalSavings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Total Savings</span>
                  <span>-${totalSavings.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {totalSavings > 0 && (
                  <p className="text-sm text-green-600 mt-1">
                    You saved ${totalSavings.toFixed(2)}!
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            
            <button
              onClick={() => navigate('/products')}
              className="w-full mt-3 text-blue-600 hover:text-blue-700 px-6 py-3 rounded-lg border border-blue-600 hover:border-blue-700 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
