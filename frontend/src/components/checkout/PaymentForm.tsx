import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { CreditCardIcon } from '@heroicons/react/24/outline';

interface PaymentFormData {
  type: 'card' | 'paypal';
  card?: {
    number: string;
    expiry: string;
    cvc: string;
    name: string;
  };
}

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { loading } = useSelector((state: RootState) => state.checkout);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === 'card') {
      if (!name.trim()) {
        newErrors.name = 'Name is required';
      }

      if (!cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Invalid card number';
      }

      if (!expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      } else {
        const [month, year] = expiryDate.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        if (expiry < new Date()) {
          newErrors.expiryDate = 'Card has expired';
        }
      }

      if (!cvc.match(/^\d{3,4}$/)) {
        newErrors.cvc = 'Invalid CVC';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const paymentData: PaymentFormData = {
      type: paymentMethod,
      ...(paymentMethod === 'card' && {
        card: {
          number: cardNumber.replace(/\s/g, ''),
          expiry: expiryDate,
          cvc,
          name,
        },
      }),
    };

    onSubmit(paymentData);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex-1 p-4 border rounded-lg transition-colors ${
              paymentMethod === 'card'
                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500 ring-opacity-50'
                : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CreditCardIcon className="h-6 w-6 text-indigo-600" />
              <span className="font-medium">Credit Card</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('paypal')}
            className={`flex-1 p-4 border rounded-lg transition-colors ${
              paymentMethod === 'paypal'
                ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-500 ring-opacity-50'
                : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 text-blue-500"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42c-.756 3.915-4.004 5.196-7.961 5.196h-2.03c-.527 0-.973.38-1.058.9L8.853 22.63c-.068.42.244.792.673.792h4.016c.482 0 .892-.348.968-.82l.04-.24.748-4.738.048-.267c.075-.472.485-.82.967-.82h.616c3.938 0 7.021-1.6 7.924-6.22.378-1.95.182-3.578-.634-4.728" />
              </svg>
              <span className="font-medium">PayPal</span>
            </div>
          </button>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="card-name"
              className="block text-sm font-medium text-gray-700"
            >
              Name on Card
            </label>
            <input
              type="text"
              id="card-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              required
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <input
              type="text"
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                errors.cardNumber
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
              }`}
              required
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="expiry"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <input
                type="text"
                id="expiry"
                value={expiryDate}
                onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                placeholder="MM/YY"
                maxLength={5}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.expiryDate
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                required
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">{errors.expiryDate}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-gray-700"
              >
                CVC
              </label>
              <input
                type="text"
                id="cvc"
                value={cvc}
                onChange={(e) =>
                  setCvc(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))
                }
                placeholder="123"
                maxLength={4}
                className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                  errors.cvc
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
                }`}
                required
              />
              {errors.cvc && (
                <p className="mt-1 text-sm text-red-600">{errors.cvc}</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                loading
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {loading ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      )}

      {paymentMethod === 'paypal' && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">
            You will be redirected to PayPal to complete your payment.
          </p>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {loading ? 'Redirecting...' : 'Continue with PayPal'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
