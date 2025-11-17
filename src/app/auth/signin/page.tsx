'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Star, User, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SignInPage() {
  const router = useRouter();
  const [isChild, setIsChild] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn('credentials', {
        ...formData,
        isChild: isChild.toString(),
        redirect: false,
      });

      if (result?.error) {
        toast.error('Sign in failed. Please try again.');
      } else {
        toast.success('Welcome to English Buddy! 🎉');
        router.push('/');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text animated-gradient">
              English Buddy
            </h1>
            <Star className="w-10 h-10 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-xl text-gray-600">Start Your Learning Adventure!</p>
        </div>

        <div className="kid-card">
          {/* Account Type Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsChild(true)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                isChild
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              👦 I'm a Kid
            </button>
            <button
              type="button"
              onClick={() => setIsChild(false)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                !isChild
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              👨 I'm a Parent
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <User className="w-5 h-5" />
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg"
                placeholder={isChild ? 'Enter your name' : 'Parent name'}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Mail className="w-5 h-5" />
                Email {!isChild && '(optional for demo)'}
              </label>
              <input
                type="email"
                required={!isChild}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg"
                placeholder={
                  isChild ? 'parent@example.com' : 'your@email.com'
                }
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
                <Lock className="w-5 h-5" />
                Password (demo mode - any password)
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-lg"
                placeholder="Enter password"
              />
            </div>

            <button
              type="submit"
              className="kid-button w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xl"
            >
              {isChild ? "Let's Learn! 🚀" : 'Get Started 📊'}
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-4">
            Demo mode: Use any credentials to sign in
          </p>
        </div>
      </motion.div>
    </div>
  );
}
