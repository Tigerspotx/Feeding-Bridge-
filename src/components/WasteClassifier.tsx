
import React, { useState } from 'react';
import { Upload, UploadIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { classifyWasteImage, ClassificationResult, WasteCategory } from '@/utils/wasteClassifier';
import { toast } from '@/hooks/use-toast';

const WasteClassifier = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);
  const [classificationResult, setClassificationResult] = useState<ClassificationResult | null>(null);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Helper function for image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type and size
      if (!file.type.includes('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPEG, PNG, etc.)",
          variant: "destructive",
        });
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setClassificationResult(null);
    }
  };

  // Function to handle classification
  const handleClassify = async () => {
    if (!selectedImage) return;
    
    setIsClassifying(true);
    setLoadingProgress(10);
    
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.floor(Math.random() * 15);
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 500);
      
      // Perform classification
      const result = await classifyWasteImage(selectedImage);
      
      clearInterval(progressInterval);
      setLoadingProgress(100);
      setClassificationResult(result);
      
      toast({
        title: "Classification Complete",
        description: `This item appears to be ${result.category}`,
      });
    } catch (error) {
      console.error('Classification error:', error);
      toast({
        title: "Classification Error",
        description: "We couldn't process this image. Please try another.",
        variant: "destructive",
      });
    } finally {
      setIsClassifying(false);
      setTimeout(() => setLoadingProgress(0), 500);
    }
  };

  // Reset the state
  const handleReset = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedImage(null);
    setImagePreview(null);
    setClassificationResult(null);
    setLoadingProgress(0);
  };

  // Get badge styling based on waste category
  const getCategoryBadge = (category: WasteCategory) => {
    switch (category) {
      case 'recyclable':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Recyclable</Badge>;
      case 'compostable':
        return <Badge className="bg-green-500 hover:bg-green-600">Compostable</Badge>;
      case 'hazardous':
        return <Badge className="bg-red-500 hover:bg-red-600">Hazardous</Badge>;
      case 'general':
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">General Waste</Badge>;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <Upload className="h-6 w-6" /> 
            AI Waste Classifier
          </CardTitle>
          <CardDescription>
            Upload a photo of your waste item to get AI-powered classification and disposal recommendations
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center">
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 w-full flex flex-col items-center justify-center p-4">
                  <UploadIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-500 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">PNG, JPG, WEBP (Max 5MB)</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="relative h-64 w-full">
                  <img
                    src={imagePreview}
                    alt="Selected waste item"
                    className="h-full w-full object-contain rounded-lg"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={handleReset}
                  >
                    Change
                  </Button>
                </div>
              )}
              
              {selectedImage && !isClassifying && !classificationResult && (
                <Button 
                  className="mt-4 w-full"
                  onClick={handleClassify}
                  disabled={isClassifying}
                >
                  Classify Waste
                </Button>
              )}
              
              {isClassifying && (
                <div className="w-full mt-4">
                  <Progress value={loadingProgress} className="h-2 mb-2" />
                  <p className="text-sm text-center text-gray-500">
                    Analyzing image...
                  </p>
                </div>
              )}
            </div>
            
            <div>
              {classificationResult ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Classification Result</h3>
                    {getCategoryBadge(classificationResult.category)}
                  </div>
                  
                  <p>{classificationResult.description}</p>
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Confidence: {Math.round(classificationResult.confidence * 100)}%</p>
                    <Progress value={classificationResult.confidence * 100} className="h-2" />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-2">Disposal Tips:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {classificationResult.tips.map((tip, index) => (
                        <li key={index} className="text-sm">{tip}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <Alert>
                    <AlertDescription>
                      This classification is provided as guidance. When in doubt, check your local waste management guidelines.
                    </AlertDescription>
                  </Alert>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Upload className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium mb-2">How It Works</h3>
                  <p className="text-sm text-gray-500">
                    Upload a photo of your waste item and our AI will classify it into one of these categories:
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    <Badge className="bg-blue-500">Recyclable</Badge>
                    <Badge className="bg-green-500">Compostable</Badge>
                    <Badge className="bg-red-500">Hazardous</Badge>
                    <Badge className="bg-gray-500">General Waste</Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col text-sm text-center text-gray-500 pt-0">
          <p>
            This tool helps you sort waste properly but always refer to your local waste management guidelines.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WasteClassifier;
