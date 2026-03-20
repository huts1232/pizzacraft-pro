'use client'

import { useMemo, useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

export default function LandingPage() {
  const [activeRestaurants, setActiveRestaurants] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const supabase = useMemo(() => 
    createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!), 
    []
  )

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [restaurantsResult, ordersResult] = await Promise.all([
          supabase.from('restaurants').select('id', { count: 'exact' }).eq('is_active', true),
          supabase.from('orders').select('id', { count: 'exact' })
        ])

        setActiveRestaurants(restaurantsResult.count || 0)
        setTotalOrders(ordersResult.count || 0)
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  const handleGetStarted = () => {
    window.location.href = '/login'
  }

  const features = [
    {
      icon: '🍕',
      title: 'Smart Menu Management',
      description: 'Easily manage your pizza menu, categories, sizes, and toppings with our intuitive interface.'
    },
    {
      icon: '📱',
      title: 'Mobile-First Ordering',
      description: 'Customers can order seamlessly from any device with our responsive ordering system.'
    },
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Track sales, popular items, and customer behavior with comprehensive analytics.'
    },
    {
      icon: '🚚',
      title: 'Delivery Management',
      description: 'Manage delivery zones, fees, and estimated times to optimize your delivery service.'
    },
    {
      icon: '💰',
      title: 'Flexible Pricing',
      description: 'Set different prices for different sizes, create promotions, and manage discounts easily.'
    },
    {
      icon: '⚡',
      title: 'Order Tracking',
      description: 'Real-time order status updates keep customers informed from kitchen to doorstep.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-red-600">🍕 PizzaCraft Pro</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <button
                onClick={handleGetStarted}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Streamline Your
              <span className="text-red-600"> Pizza Business</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              PizzaCraft Pro helps pizza restaurants manage orders, menus, and customers with ease. 
              Boost your sales and improve customer satisfaction with our all-in-one platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <button
                onClick={handleGetStarted}
                className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Start Free Trial
              </button>
              <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-50 transition-colors">
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-red-600">
                  {isLoading ? '...' : activeRestaurants.toLocaleString()}
                </div>
                <div className="text-gray-600">Active Restaurants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">
                  {isLoading ? '...' : totalOrders.toLocaleString()}
                </div>
                <div className="text-gray-600">Orders Processed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600">98%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Pizza Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From order management to analytics, PizzaCraft Pro provides all the tools you need to succeed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">
              One price, all features included. No hidden fees.
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-red-600 text-white text-center py-6">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
                <div className="mt-4">
                  <span className="text-5xl font-bold">$49</span>
                  <span className="text-xl">/month</span>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Unlimited menu items and categories
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Real-time order management
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Customer database management
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Analytics and reporting
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    Promotion and discount codes
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-3">✓</span>
                    24/7 customer support
                  </li>
                </ul>
                <button
                  onClick={handleGetStarted}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold mt-8 hover:bg-red-700 transition-colors"
                >
                  Start Free Trial
                </button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Pizza Business?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of pizza restaurants already using PizzaCraft Pro to increase sales and improve customer satisfaction.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-red-400 mb-4">🍕 PizzaCraft Pro</div>
              <p className="text-gray-400">
                Streamlining pizza ordering for restaurants and customers worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 PizzaCraft Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}