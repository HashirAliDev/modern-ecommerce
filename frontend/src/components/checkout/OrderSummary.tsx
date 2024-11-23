import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../types';

const OrderSummary: React.FC = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center">
          <p className="text-lg font-medium">Subtotal</p>
          <p className="text-lg font-semibold">${total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-sm text-gray-600">Shipping</p>
          <p className="text-sm font-medium">Free</p>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t">
          <p className="text-xl font-semibold">Total</p>
          <p className="text-xl font-bold">${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
