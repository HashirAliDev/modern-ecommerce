import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../types';

const Account = () => {
  const { user, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <p className="text-gray-900">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            onClick={() => {/* TODO: Implement password change */}}
          >
            Change Password
          </button>
        </div>

        {user.role === 'admin' && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
            <div className="space-x-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
                onClick={() => {/* TODO: Navigate to product management */}}
              >
                Manage Products
              </button>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
                onClick={() => {/* TODO: Navigate to order management */}}
              >
                Manage Orders
              </button>
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">Danger Zone</h2>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            onClick={() => {/* TODO: Implement account deletion */}}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
