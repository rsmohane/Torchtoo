import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

function Dashboard() {
  const { user } = useAuthStore();
  const [trustScore, setTrustScore] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const profileResponse = await api.get(`/identity/profile/${user?.id}`);
      setProfile(profileResponse.data.data);
      setTrustScore(profileResponse.data.data.trustScore);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.fullName}!</h1>

      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Trust Score Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm uppercase tracking-wide mb-2">Trust Score</h3>
          <div className="flex items-center justify-between">
            <div className="text-4xl font-bold text-blue-600">{trustScore}</div>
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm font-bold">{trustScore}%</div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-4">
            {trustScore >= 80 ? '✅ Excellent' : trustScore >= 60 ? '⚠️ Good' : '❌ Needs Improvement'}
          </p>
        </div>

        {/* KYC Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm uppercase tracking-wide mb-2">KYC Status</h3>
          <div className="flex items-center gap-4">
            <div className="text-3xl">{profile?.isKycVerified ? '✅' : '⏳'}</div>
            <div>
              <p className="font-semibold">
                {profile?.isKycVerified ? 'Verified' : 'Pending'}
              </p>
              <p className="text-sm text-gray-600">
                {profile?.isKycVerified ? 'All documents approved' : 'Upload documents to verify'}
              </p>
            </div>
          </div>
          {!profile?.isKycVerified && (
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
              Start KYC Verification
            </button>
          )}
        </div>

        {/* Account Status */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm uppercase tracking-wide mb-2">Account Status</h3>
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div>
              <p className="font-semibold">Active</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Member since {new Date(profile?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 text-left">
            <div className="text-2xl mb-2">📧</div>
            <p className="font-semibold">Send Secure Email</p>
          </button>
          <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 text-left">
            <div className="text-2xl mb-2">🔐</div>
            <p className="font-semibold">Manage Vault</p>
          </button>
          <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 text-left">
            <div className="text-2xl mb-2">🔑</div>
            <p className="font-semibold">API Keys</p>
          </button>
          <button className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 text-left">
            <div className="text-2xl mb-2">⚙️</div>
            <p className="font-semibold">Settings</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;