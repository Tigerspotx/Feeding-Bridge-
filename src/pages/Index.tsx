import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Map, Package, Truck, Users, PieChart, Building } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIChat from '@/components/AIChat';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - Improved */}
      <section className="bg-gradient-to-b from-green-50 to-white py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1628693283977-4a067055d9ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-block px-4 py-2 bg-green-100 text-foodbridge-primary rounded-full text-sm font-medium animate-fade-in">
              Fighting Food Waste Together
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              Connecting <span className="text-foodbridge-primary">Food Surplus</span> with
              <span className="text-foodbridge-warning"> Those in Need</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
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
                <Link to="/register?role=ngo">Register as NGO</Link>
              </Button>
              <Button 
                asChild 
                variant="ghost" 
                size="lg"
              >
                <Link to="/register?role=volunteer">Volunteer</Link>
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute -inset-4 bg-green-100 rounded-lg transform rotate-3"></div>
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Food donation" 
                className="rounded-lg shadow-xl w-full object-cover max-h-[500px] relative z-10" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How FoodBridge Works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform connects three key stakeholders to create an efficient food redistribution system
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Donor */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Package className="h-10 w-10 text-foodbridge-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Food Donors</h3>
              <p className="text-gray-600 mb-6">
                Restaurants, grocery stores, events, and individuals can register and list surplus food for pickup
              </p>
              <Link to="/register?role=donor" className="text-foodbridge-primary font-medium flex items-center hover:underline">
                Register as Donor <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* NGO */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Building className="h-10 w-10 text-foodbridge-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">NGOs & Charities</h3>
              <p className="text-gray-600 mb-6">
                Organizations can view available donations, coordinate pickups, and distribute food to those in need
              </p>
              <Link to="/register?role=ngo" className="text-foodbridge-primary font-medium flex items-center hover:underline">
                Register as NGO <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            {/* Volunteer */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Truck className="h-10 w-10 text-foodbridge-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4">Volunteers</h3>
              <p className="text-gray-600 mb-6">
                Help transport food from donors to NGOs or directly to recipients, ensuring timely delivery
              </p>
              <Link to="/register?role=volunteer" className="text-foodbridge-primary font-medium flex items-center hover:underline">
                Become a Volunteer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Section: Food Map */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="bg-white p-4 rounded-xl shadow-xl border-2 border-foodbridge-light">
                <div className="w-full h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Map className="h-16 w-16 text-gray-400" />
                  <p className="ml-2 text-gray-500">Interactive Food Map</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Food Map</h2>
              <p className="text-xl text-gray-600">
                Our interactive map shows the location of food donations, NGOs, and volunteers in your area, making it easy to connect and coordinate pickups.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-foodbridge-primary font-medium">1</span>
                  </div>
                  <p className="text-gray-700">View available food donations near you</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-foodbridge-primary font-medium">2</span>
                  </div>
                  <p className="text-gray-700">Find nearby NGOs and collection points</p>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-foodbridge-primary font-medium">3</span>
                  </div>
                  <p className="text-gray-700">Get real-time updates on food availability</p>
                </li>
              </ul>
              <Button 
                asChild 
                className="bg-foodbridge-primary hover:bg-foodbridge-secondary mt-2"
              >
                <Link to="/food-map">Explore the Food Map</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Section: Manage Pickups */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Manage Pickups</h2>
              <p className="text-xl text-gray-600">
                Efficiently manage food donation pickups with our easy-to-use system designed for donors, NGOs, and volunteers.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Package className="h-8 w-8 text-foodbridge-primary mb-4" />
                    <h3 className="font-semibold mb-2">Schedule Donations</h3>
                    <p className="text-sm text-gray-600">Plan your donations in advance and set pickup times</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Truck className="h-8 w-8 text-foodbridge-primary mb-4" />
                    <h3 className="font-semibold mb-2">Track Pickups</h3>
                    <p className="text-sm text-gray-600">Follow the status of your food donations in real-time</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-foodbridge-primary mb-4" />
                    <h3 className="font-semibold mb-2">Assign Volunteers</h3>
                    <p className="text-sm text-gray-600">Easily assign volunteers to pickup tasks</p>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <PieChart className="h-8 w-8 text-foodbridge-primary mb-4" />
                    <h3 className="font-semibold mb-2">Generate Reports</h3>
                    <p className="text-sm text-gray-600">Create detailed reports of donations and pickups</p>
                  </CardContent>
                </Card>
              </div>
              <Button 
                asChild 
                className="bg-foodbridge-primary hover:bg-foodbridge-secondary mt-2"
              >
                <Link to="/manage-pickups">Start Managing Pickups</Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                alt="Pickup management" 
                className="rounded-lg shadow-xl w-full object-cover h-auto max-h-[500px]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Volunteers */}
      <section className="py-20 px-4 bg-foodbridge-light/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Join Our Volunteer Network</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Make a difference in your community by helping transport food from donors to those in need. Our volunteers are the backbone of our mission.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-32 w-32 rounded-full mx-auto overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
                  alt="Volunteer 1"
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Sarah Johnson</h3>
              <p className="text-gray-500 mb-4">Volunteer Since 2022</p>
              <p className="text-gray-600">
                "Volunteering with FoodBridge gives me a sense of purpose. It's amazing to see how a simple act of delivering food can make such a big difference."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-32 w-32 rounded-full mx-auto overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Volunteer 2"
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Michael Chen</h3>
              <p className="text-gray-500 mb-4">Volunteer Since 2021</p>
              <p className="text-gray-600">
                "The FoodBridge app makes it so easy to find and complete pickups. I can help during my free time and see the direct impact of my work."
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="h-32 w-32 rounded-full mx-auto overflow-hidden mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80" 
                  alt="Volunteer 3"
                  className="w-full h-full object-cover" 
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Priya Patel</h3>
              <p className="text-gray-500 mb-4">Volunteer Since 2023</p>
              <p className="text-gray-600">
                "As a college student, I wanted to help in my community. FoodBridge made it possible to volunteer on my own schedule and make a real impact."
              </p>
            </div>
          </div>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
          >
            <Link to="/register?role=volunteer">Become a Volunteer</Link>
          </Button>
        </div>
      </section>
      
      {/* New Section: Reports */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Impact Reports</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Track the difference we're making together in fighting food waste and hunger
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-foodbridge-primary/10 to-foodbridge-light/30 rounded-lg p-8 text-center">
              <h3 className="text-4xl font-bold text-foodbridge-primary mb-2">2,500+</h3>
              <p className="text-xl text-gray-700">Meals Delivered</p>
            </div>
            
            <div className="bg-gradient-to-br from-foodbridge-accent/10 to-foodbridge-light/30 rounded-lg p-8 text-center">
              <h3 className="text-4xl font-bold text-foodbridge-accent mb-2">850+</h3>
              <p className="text-xl text-gray-700">Food Donations</p>
            </div>
            
            <div className="bg-gradient-to-br from-foodbridge-warning/10 to-foodbridge-warningLight/30 rounded-lg p-8 text-center">
              <h3 className="text-4xl font-bold text-foodbridge-warning mb-2">1,200+</h3>
              <p className="text-xl text-gray-700">Volunteer Hours</p>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              asChild 
              variant="outline"
              className="border-foodbridge-primary text-foodbridge-primary hover:bg-foodbridge-primary/10"
            >
              <Link to="/impact-reports">View Detailed Reports</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* New Section: Organization Profile */}
      <section className="py-20 px-4 bg-foodbridge-primary/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Organization Profile</h2>
            <p className="text-xl text-gray-600">
              FoodBridge is committed to creating a sustainable food ecosystem by connecting those with surplus to those in need.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-foodbridge-primary/20 flex items-center justify-center mr-4 mt-1">
                  <Map className="h-5 w-5 text-foodbridge-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Our Mission</h3>
                  <p className="text-gray-600">To reduce food waste and hunger by building an efficient bridge between food surplus and need.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-foodbridge-primary/20 flex items-center justify-center mr-4 mt-1">
                  <Users className="h-5 w-5 text-foodbridge-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Our Team</h3>
                  <p className="text-gray-600">A passionate group of individuals dedicated to solving the food waste problem through technology and community.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-10 w-10 rounded-full bg-foodbridge-primary/20 flex items-center justify-center mr-4 mt-1">
                  <Building className="h-5 w-5 text-foodbridge-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Our Partners</h3>
                  <p className="text-gray-600">We work with restaurants, grocery stores, food banks, and community organizations to maximize our impact.</p>
                </div>
              </div>
            </div>
            <Button 
              asChild 
              variant="outline"
              className="border-foodbridge-primary text-foodbridge-primary hover:bg-foodbridge-primary/10"
            >
              <Link to="/about-us">Learn More About Us</Link>
            </Button>
          </div>
          <div className="lg:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1593113616828-6f22bca04804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
              alt="Organization team" 
              className="rounded-lg shadow-xl w-full object-cover h-auto" 
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section - Improved */}
      <section className="bg-gradient-to-r from-foodbridge-primary to-foodbridge-secondary py-20 px-4">
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
              className="bg-foodbridge-accent hover:bg-foodbridge-accent/90 text-white"
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
      <AIChat />
    </div>
  );
};

export default Index;
