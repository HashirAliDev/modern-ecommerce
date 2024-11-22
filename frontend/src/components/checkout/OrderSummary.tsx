import React from 'react';
import { CartItem } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);

  const subtotal = total || 0;
  const shipping = 0; // Free shipping for now
  const tax = subtotal * 0.1; // 10% tax
  const finalTotal = subtotal + shipping + tax;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium">${subtotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping</p>
          <p className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tax (10%)</p>
          <p className="font-medium">${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between border-t pt-2 font-semibold">
          <p>Total</p>
          <p>${finalTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
