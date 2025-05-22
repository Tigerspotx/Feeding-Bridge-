
import React from 'react';
import WasteClassifierComponent from '@/components/WasteClassifier';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WasteClassifierPage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Waste Classifier</h1>
        <p className="text-gray-500">
          Use artificial intelligence to identify the correct waste category for your items
        </p>
      </div>
      
      <WasteClassifierComponent />
      
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Educational Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Learn how to properly sort waste and understand the environmental impact of different disposal methods.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Reduce Contamination</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Improper sorting can contaminate recycling streams. Our classifier helps ensure materials go to the right place.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Environmental Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Proper waste sorting reduces landfill use, cuts greenhouse gas emissions, and conserves natural resources.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteClassifierPage;
