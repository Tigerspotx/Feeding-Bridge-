
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GoogleMap from '@/components/ui/GoogleMap';
import { mockFoodDonations } from '@/data/mockData';

const FoodMap = () => {
  // Extract location data from mockFoodDonations
  const mapMarkers = mockFoodDonations.map(donation => ({
    id: donation.id,
    position: donation.location,
    title: donation.description,
    label: donation.foodType[0],
  }));

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Food Map</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Interactive Food Map</CardTitle>
        </CardHeader>
        <CardContent className="h-[500px]">
          <GoogleMap 
            center={{ lat: 40.73, lng: -73.99 }} 
            markers={mapMarkers}
            className="h-full w-full"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodMap;
