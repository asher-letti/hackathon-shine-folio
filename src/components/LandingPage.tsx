
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trophy, Users, Zap, Code, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Hackfolio
            </span>
          </div>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Your Hackathon
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent block">
                Achievement Hub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The professional portfolio platform for hackathon enthusiasts. 
              Showcase your coding competitions, earn badges, and impress recruiters.
            </p>
            <div className="flex items-center justify-center space-x-4 mb-12">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 text-lg">
                  Create Your Portfolio
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 text-lg">
                View Demo
              </Button>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Purple Like System</h3>
              <p className="text-gray-600">
                Interactive purple-themed likes with beautiful animations. Show appreciation for amazing hackathon projects.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Achievement Badges</h3>
              <p className="text-gray-600">
                Earn beautiful badges based on your hackathon participation, technologies used, and community engagement.
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Showcase</h3>
              <p className="text-gray-600">
                Present your hackathon achievements in a clean, professional format that impresses recruiters.
              </p>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Hackathon Portfolios</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">1,200+</div>
              <div className="text-gray-600">Projects Showcased</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Achievement Badges</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">10,000+</div>
              <div className="text-gray-600">Purple Hearts Given</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to showcase your hackathon journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of developers already building their professional hackathon portfolios.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
              Start Building Your Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
