import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchBar from './SearchBar';
import { RootState } from '../store';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemsCount = useSelector((state: RootState) => state.cart.itemsCount);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-gray-900">ModernShop</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-8 hidden sm:block">
            <SearchBar />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/products"
                className="text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Products
              </Link>
              <Link
                to="/categories"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Categories
              </Link>
              <Link
                to="/deals"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Deals
              </Link>
            </div>
            <Link
              to="/cart"
              className="p-2 text-gray-500 hover:text-gray-900 relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {itemsCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-indigo-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              className="p-2 text-gray-500 hover:text-gray-900 ml-4"
            >
              <UserIcon className="h-6 w-6" />
            </Link>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden ml-4">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <XMarkIcon className="block h-6 w-6" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/products"
            className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-indigo-500 text-indigo-700 bg-indigo-50"
          >
            Products
          </Link>
          <Link
            to="/categories"
            className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            Categories
          </Link>
          <Link
            to="/deals"
            className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
          >
            Deals
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
