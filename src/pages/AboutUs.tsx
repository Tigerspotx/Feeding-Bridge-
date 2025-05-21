
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Building, Users, Info } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">About FeedingBridge</h1>
      
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            Organization Profile
          </CardTitle>
          <CardDescription>Meet the team behind FeedingBridge</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foodbridge-primary mb-2">Byte Benders</h2>
            <p className="text-gray-600">
              Byte Benders is a tech-driven social enterprise committed to fighting food waste and hunger
              through innovative digital solutions. Founded in 2023, we've been working to build
              bridges between food donors and recipients through our FeedingBridge platform.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Info className="h-5 w-5" />
              Our Mission
            </h3>
            <p className="text-gray-600">
              At Byte Benders, we believe technology can help solve some of the world's most pressing problems.
              Our mission is to reduce food waste by connecting surplus food with those who need it most,
              using data-driven solutions to make food distribution more efficient and equitable.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium">Leadership</h4>
                <p className="text-gray-600">
                  Our diverse team of technologists, food security experts, and community organizers
                  work together to build and improve the FeedingBridge platform.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium">Volunteers</h4>
                <p className="text-gray-600">
                  We're supported by a network of dedicated volunteers who help with food pickup, 
                  delivery, and community outreach.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-foodbridge-primary/10 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Join Our Cause</h3>
            <p className="text-gray-700">
              Whether you're a restaurant with surplus food, an organization helping those in need,
              or someone looking to volunteer your time, FeedingBridge welcomes you to join our
              community and be part of the solution.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutUs;
