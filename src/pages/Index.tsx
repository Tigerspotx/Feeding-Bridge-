
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Connecting <span className="text-foodbridge-primary">Food Surplus</span> with
              <span className="text-foodbridge-warning"> Those in Need</span>
            </h1>
            <p className="text-xl text-gray-600">
              FoodBridge helps reduce food waste by connecting donors with NGOs and volunteers
              to ensure surplus food reaches those who need it most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
              >
                <Link to="/register?role=donor">Donate Food</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
              >
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Food donation" 
              className="rounded-lg shadow-xl w-full object-cover max-h-[500px]" 
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How FoodBridge Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects three key stakeholders to create an efficient food redistribution system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Donor */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-foodbridge-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a4 4 0 00-4-4H8.8a4 4 0 00-3.6 2.3L2 12v8a2 2 0 002 2h16a2 2 0 002-2v-8l-3.2-7.7A4 4 0 0015.2 2H14a4 4 0 00-4 4v2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Food Donors</h3>
              <p className="text-gray-600 mb-6">
                Restaurants, grocery stores, events, and individuals can register and list surplus food for pickup
              </p>
              <Link to="/register?role=donor" className="text-foodbridge-primary font-medium flex items-center">
                Register as Donor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* NGO */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-foodbridge-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">NGOs & Charities</h3>
              <p className="text-gray-600 mb-6">
                Organizations can view available donations, coordinate pickups, and distribute food to those in need
              </p>
              <Link to="/register?role=ngo" className="text-foodbridge-primary font-medium flex items-center">
                Register as NGO <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Volunteer */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-foodbridge-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Volunteers</h3>
              <p className="text-gray-600 mb-6">
                Help transport food from donors to NGOs or directly to recipients, ensuring timely delivery
              </p>
              <Link to="/register?role=volunteer" className="text-foodbridge-primary font-medium flex items-center">
                Become a Volunteer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="bg-foodbridge-primary text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold">500+</p>
              <p className="mt-2 text-green-100">Food Donations</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">50+</p>
              <p className="mt-2 text-green-100">Partner NGOs</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">200+</p>
              <p className="mt-2 text-green-100">Active Volunteers</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold">1000+</p>
              <p className="mt-2 text-green-100">People Fed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What People Say About Us</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Join our community of donors, NGOs, and volunteers making a difference
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Restaurant Owner</h4>
                  <p className="text-sm text-gray-500">Food Donor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "FoodBridge has made it incredibly easy for us to donate our surplus food. Instead of throwing it away, we're now helping those in need."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-bold">Food Bank Director</h4>
                  <p className="text-sm text-gray-500">NGO Partner</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The platform has streamlined our operations and increased our capacity to serve the community. We receive quality food donations consistently."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300"></div>
                <div className="ml-4">
                  <h4 className="font-bold">College Student</h4>
                  <p className="text-sm text-gray-500">Volunteer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Volunteering with FoodBridge has been rewarding. The app makes it easy to see where and when I'm needed, and I can make a real difference in my community."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-foodbridge-accent to-foodbridge-secondary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Join our growing community of donors, NGOs, and volunteers fighting food waste and hunger
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-foodbridge-primary hover:bg-gray-100"
            >
              <Link to="/register?role=donor">Donate Food</Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              className="bg-foodbridge-primary hover:bg-foodbridge-primary/90 text-white"
            >
              <Link to="/register?role=ngo">Register NGO</Link>
            </Button>
            <Button 
              asChild 
              size="lg"
              variant="outline" 
              className="bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link to="/register?role=volunteer">Volunteer</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
