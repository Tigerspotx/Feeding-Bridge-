
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { classifyWaste } from "@/utils/wasteClassifier";
import { toast } from '@/hooks/use-toast';
import { Trash, Recycle, Save } from 'lucide-react';

type WasteCategory = 'recyclable' | 'compostable' | 'hazardous' | 'general';

const WasteClassifier = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [classification, setClassification] = useState<WasteCategory | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Reset classification
      setClassification(null);
      
      toast(`Image selected: ${file.name} is ready to be classified.`);
    }
  };

  const handleClassify = async () => {
    if (!selectedFile) {
      toast("No image selected. Please select an image to classify.");
      return;
    }

    setIsClassifying(true);
    
    try {
      const result = await classifyWaste(selectedFile);
      setClassification(result);
      
      toast(`Classification complete: This item is ${result}.`);
    } catch (error) {
      console.error("Classification error:", error);
      toast("Classification failed. There was an error classifying your image. Please try again.");
    } finally {
      setIsClassifying(false);
    }
  };

  const getCategoryIcon = (category: WasteCategory) => {
    switch (category) {
      case 'recyclable':
        return <Recycle className="h-16 w-16 text-blue-500" />;
      case 'compostable':
        return <Save className="h-16 w-16 text-green-500" />;
      case 'hazardous':
        return <Trash className="h-16 w-16 text-red-500" />;
      default:
        return <Trash className="h-16 w-16 text-gray-500" />;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Waste Classifier</CardTitle>
        <CardDescription>Upload a photo to identify the correct waste category</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            {imagePreview ? (
              <div className="relative w-full h-64">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-48">
                <Trash className="h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
              </div>
            )}
          </label>
        </div>
        
        {classification && (
          <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
            <div className="mb-2">{getCategoryIcon(classification)}</div>
            <h3 className="text-xl font-bold mb-1 capitalize">{classification}</h3>
            <p className="text-center text-gray-600">
              {classification === 'recyclable' && "This item can be recycled. Please place it in the recycling bin."}
              {classification === 'compostable' && "This item can be composted. Please place it in the compost bin."}
              {classification === 'hazardous' && "This item is hazardous waste. Please dispose of it at a designated facility."}
              {classification === 'general' && "This item goes in general waste."}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleClassify} 
          disabled={!selectedFile || isClassifying} 
          className="w-full"
        >
          {isClassifying ? "Classifying..." : "Classify Waste"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WasteClassifier;
