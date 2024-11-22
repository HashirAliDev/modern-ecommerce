import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

interface OrderConfirmationProps {
  orderId: string;
  onNewOrder: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  orderId,
  onNewOrder,
}) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
          <CheckCircleIcon className="h-10 w-10 text-green-500" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Thank you for your order!
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Your order #{' '}
          <span className="font-medium text-gray-900">{orderId}</span> has been
          successfully placed.
        </p>
        <p className="mt-2 text-base text-gray-500">
          We'll send you an email with your order details and tracking information.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <Link
            to="/orders"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View Order Details
          </Link>
          <button
            onClick={onNewOrder}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Continue Shopping
          </button>
        </div>
      </div>

      <div className="mt-16">
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-xl font-semibold text-gray-900 text-center">
            What's next?
          </h3>
          <dl className="mt-10 space-y-10">
            <div>
              <dt className="font-medium text-gray-900">Order Confirmation Email</dt>
              <dd className="mt-2 text-gray-500">
                You'll receive an email confirmation with your order details
                shortly. Please check your spam folder if you don't see it in your
                inbox.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-900">Shipping Updates</dt>
              <dd className="mt-2 text-gray-500">
                We'll notify you when your order ships and provide tracking
                information. You can also check your order status anytime in your
                account.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-900">Need Help?</dt>
              <dd className="mt-2 text-gray-500">
                Our customer support team is here to help! Contact us through{' '}
                <Link
                  to="/support"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  our support page
                </Link>{' '}
                or email us at{' '}
                <a
                  href="mailto:support@example.com"
                  className="text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  support@example.com
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Having trouble?{' '}
            <Link
              to="/faq"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Check our FAQ
            </Link>{' '}
            or{' '}
            <Link
              to="/contact"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
