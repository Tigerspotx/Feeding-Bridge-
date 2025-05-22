
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, Recycle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManagePickups = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Manage Pickups</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Donation Routing</CardTitle>
            <CardDescription>
              Smart matching system that connects food donors with nearby NGOs
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[200px] bg-gray-50">
            <Recycle className="h-16 w-16 text-green-500 mb-4" />
            <Button asChild className="bg-foodbridge-primary hover:bg-foodbridge-secondary">
              <Link to="/donation-routing">Go to Donation Routing</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pickup Management</CardTitle>
            <CardDescription>
              Manage active pickups and volunteer assignments
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[200px] bg-gray-50">
            <Truck className="h-16 w-16 text-blue-500 mb-4" />
            <p className="text-gray-500 mb-4">Pickup management coming soon</p>
            <Button disabled>Coming Soon</Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Impact Tracking</CardTitle>
          <CardDescription>Track how much food was saved from waste</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <p className="mb-4">
            Our donation routing system helps track the environmental and social impact of food rescue operations:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-6">
            <li>Measure total kilograms of food rescued from waste</li>
            <li>Calculate equivalent meals provided to those in need</li>
            <li>Estimate CO₂ emissions reduced by preventing food waste</li>
            <li>Track water conservation impact from food rescue efforts</li>
          </ul>
          <div className="flex justify-center">
            <Button asChild>
              <Link to="/impact-reports">View Impact Reports</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagePickups;
