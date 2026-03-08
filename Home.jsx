import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🔐 GRT Torch Bearer
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Secure Professional Identity Infrastructure Platform
            <br />
            Complete automation for identity, security, trust, and compliance
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">🆔 Identity Verification</h3>
          <p className="text-gray-600">Auto KYC verification with AI-powered document OCR and face matching</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">⚡ Trust Engine</h3>
          <p className="text-gray-600">Automated trust score calculation based on behavior and verification</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">🔒 Secure Vault</h3>
          <p className="text-gray-600">Military-grade encryption for sensitive data and documents</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">📧 Secure Email</h3>
          <p className="text-gray-600">End-to-end encrypted email with risk assessment and threat detection</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">🛡️ Security</h3>
          <p className="text-gray-600">Zero Trust architecture with geo-fencing and login risk assessment</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-3">🔗 Blockchain</h3>
          <p className="text-gray-600">Immutable record anchoring for compliance and audit trails</p>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold">50+</div>
            <p>Automated Processes</p>
          </div>
          <div>
            <div className="text-4xl font-bold">99.9%</div>
            <p>Uptime SLA</p>
          </div>
          <div>
            <div className="text-4xl font-bold">256-bit</div>
            <p>AES Encryption</p>
          </div>
          <div>
            <div className="text-4xl font-bold">Zero</div>
            <p>Data Breaches</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;