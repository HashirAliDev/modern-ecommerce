import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';
import {
  setStep,
  setShippingAddress,
  setPaymentMethod,
  createPaymentIntent,
  resetCheckout,
} from '../features/checkout/checkoutSlice';
import { clearCart } from '../features/cart/cartSlice';
import ShippingForm from '../components/checkout/ShippingForm';
import PaymentForm from '../components/checkout/PaymentForm';
import OrderSummary from '../components/checkout/OrderSummary';
import OrderConfirmation from '../components/checkout/OrderConfirmation';
import { toast } from 'react-hot-toast';

interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { step, loading, error, orderId } = useSelector(
    (state: RootState) => state.checkout
  );
  const { items, total } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (items.length === 0 && !orderId) {
      navigate('/cart');
    }
    return () => {
      dispatch(resetCheckout());
    };
  }, [isAuthenticated, items, navigate, orderId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleShippingSubmit = (shippingData: any) => {
    dispatch(setShippingAddress(shippingData));
    dispatch(setStep(2));
  };

  const handlePaymentSubmit = async (paymentData: any) => {
    try {
      dispatch(setPaymentMethod(paymentData));
      
      // Create payment intent
      const result = await dispatch(createPaymentIntent(total)).unwrap();
      
      if (result.success) {
        dispatch(setStep(3));
        dispatch(clearCart());
        toast.success('Order placed successfully!');
      }
    } catch (error) {
      toast.error('Payment processing failed. Please try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ShippingForm onSubmit={handleShippingSubmit} />;
      case 2:
        return (
          <div className="space-y-8">
            <PaymentForm onSubmit={handlePaymentSubmit} />
            <OrderSummary items={items as CartItem[]} total={total} />
          </div>
        );
      case 3:
        return <OrderConfirmation orderId={orderId} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Checkout Progress */}
        <div className="border-b border-gray-200 pb-8">
          <div className="flex justify-between items-center">
            <div
              className={`flex items-center ${
                step >= 1 ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                1
              </span>
              <span className="ml-2 font-medium">Shipping</span>
            </div>
            <div
              className={`h-0.5 w-16 ${
                step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
            <div
              className={`flex items-center ${
                step >= 2 ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                2
              </span>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div
              className={`h-0.5 w-16 ${
                step >= 3 ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
            <div
              className={`flex items-center ${
                step >= 3 ? 'text-indigo-600' : 'text-gray-400'
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 3
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                3
              </span>
              <span className="ml-2 font-medium">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
          </div>
        )}

        {/* Step Content */}
        {!loading && renderStep()}
      </div>
    </div>
  );
};

export default Checkout;
