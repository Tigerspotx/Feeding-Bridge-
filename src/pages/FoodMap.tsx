
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from 'lucide-react';

const FoodMap = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Food Map</h1>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Interactive Food Map</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[500px] bg-gray-100">
          <Map className="h-16 w-16 text-gray-400" />
          <p className="mt-4 text-gray-500">Food Map Coming Soon</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodMap;
