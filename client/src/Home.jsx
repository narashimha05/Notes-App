import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <nav className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Notes App</div>
          <div className="flex space-x-4">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="mb-8">
            <span className="text-6xl"></span>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Your Personal Notes App
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Capture your thoughts, organize your ideas, and keep track of
            everything important. Simple, secure, and always accessible.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg"
            >
              Start Taking Notes
            </Link>
            <Link
              to="/login"
              className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 font-semibold text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure</h3>
            <p className="text-gray-600">
              Your notes are protected with secure authentication and encrypted
              storage.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast</h3>
            <p className="text-gray-600">
              Quick and responsive interface lets you capture ideas instantly.
            </p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Accessible
            </h3>
            <p className="text-gray-600">
              Access your notes from anywhere, on any device, at any time.
            </p>
          </div>
        </div>

        <div className="text-center mt-20 bg-white p-12 rounded-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to get organized?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of users who trust Notes App with their important
            thoughts and ideas.
          </p>
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold text-lg inline-block"
          >
            Create Your Account
          </Link>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Notes App. Simple note-taking for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
