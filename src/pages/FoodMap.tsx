import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import GoogleMap from '@/components/ui/GoogleMap';
import { mockFoodDonations } from '@/data/mockData';
import { Map, List, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const FoodMap = () => {
  const [selectedDonation, setSelectedDonation] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'available'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter donations based on status
  const availableDonations = mockFoodDonations.filter(
    donation => donation.status === 'available'
  );
  
  const displayDonations = viewMode === 'all' 
    ? mockFoodDonations 
    : availableDonations;
    
  // Filter by search query if provided
  const filteredDonations = searchQuery 
    ? displayDonations.filter(donation => 
        donation.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.foodType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.donorName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : displayDonations;
  
  // Create map markers from filtered donations
  const mapMarkers = filteredDonations.map(donation => ({
    id: donation.id,
    position: donation.location,
    title: donation.description,
    label: donation.foodType[0],
    icon: donation.status === 'available' 
      ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
      : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  }));
  
  // Calculate map center based on markers or default to New York
  const calculateCenter = () => {
    if (mapMarkers.length === 0) return { lat: 40.73, lng: -73.99 };
    
    // If a donation is selected, center on it
    if (selectedDonation) {
      const selected = mapMarkers.find(marker => marker.id === selectedDonation);
      if (selected) return selected.position;
    }
    
    // Otherwise calculate average center of all markers
    const sum = mapMarkers.reduce(
      (acc, marker) => ({
        lat: acc.lat + marker.position.lat,
        lng: acc.lng + marker.position.lng
      }),
      { lat: 0, lng: 0 }
    );
    
    return {
      lat: sum.lat / mapMarkers.length,
      lng: sum.lng / mapMarkers.length
    };
  };
  
  const handleMarkerClick = (markerId: string) => {
    setSelectedDonation(markerId);
  };
  
  const handleListItemClick = (donationId: string) => {
    setSelectedDonation(donationId);
  };
  
  // Get details of selected donation
  const selectedDonationDetails = selectedDonation 
    ? mockFoodDonations.find(d => d.id === selectedDonation) 
    : null;
    
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <Badge className="bg-green-500">Available</Badge>;
      case 'assigned':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-400">Assigned</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-blue-600 border-blue-400">Completed</Badge>;
      case 'expired':
        return <Badge variant="outline" className="text-gray-600 border-gray-400">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center">
            <Map className="mr-2 h-8 w-8" /> Food Map
          </h1>
          <p className="text-gray-500">Find food donations in your area</p>
        </div>
        
        <div className="flex items-center mt-4 md:mt-0">
          <Input
            placeholder="Search donations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs mr-2"
          />
          <Button
            variant={viewMode === 'available' ? 'default' : 'outline'}
            onClick={() => setViewMode(viewMode === 'available' ? 'all' : 'available')}
          >
            {viewMode === 'available' ? 'Showing Available' : 'Show Available Only'}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="map" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="map" className="flex items-center gap-1">
            <Map className="h-4 w-4" /> Map View
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-1">
            <List className="h-4 w-4" /> List View
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Interactive Food Map</CardTitle>
              <CardDescription>
                {mapMarkers.length} donations found. 
                {viewMode === 'available' && ` Showing available donations only.`}
                {searchQuery && ` Filtering by: "${searchQuery}"`}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 h-[600px]">
                <div className="col-span-2 h-full">
                  <GoogleMap 
                    center={calculateCenter()}
                    zoom={11} 
                    markers={mapMarkers}
                    onMarkerClick={handleMarkerClick}
                    className="h-full w-full rounded-l-lg"
                  />
                </div>
                
                <div className="border-l p-4 overflow-y-auto h-full">
                  {selectedDonationDetails ? (
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold">{selectedDonationDetails.description}</h3>
                        {getStatusBadge(selectedDonationDetails.status)}
                      </div>
                      
                      <p className="text-gray-500 mb-4">
                        {selectedDonationDetails.donorName}
                      </p>
                      
                      <Separator className="my-4" />
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Food Type</h4>
                          <p>{selectedDonationDetails.foodType}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Quantity</h4>
                          <p>{selectedDonationDetails.quantity}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Pickup Address</h4>
                          <p>{selectedDonationDetails.pickupAddress}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Expiry</h4>
                          <p>{formatDate(selectedDonationDetails.expiryTime)}</p>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex flex-col space-y-2">
                        {selectedDonationDetails.status === 'available' && (
                          <Button className="w-full">Request Pickup</Button>
                        )}
                        
                        <Button variant="outline" className="w-full" onClick={() => {
                          // Open Google Maps for directions
                          const { lat, lng } = selectedDonationDetails.location;
                          window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                        }}>Get Directions</Button>
                        
                        <Button variant="outline" className="w-full" onClick={() => setSelectedDonation(null)}>
                          Close Details
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <Map className="h-16 w-16 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium">Select a donation</h3>
                      <p className="text-gray-500 mt-2">
                        Click on a map marker to see donation details
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Food Donations</CardTitle>
              <CardDescription>
                {filteredDonations.length} donations found. 
                Click on a donation to view its location on the map.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map(donation => (
                    <div 
                      key={donation.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedDonation === donation.id 
                          ? 'border-black bg-gray-50' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleListItemClick(donation.id)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{donation.description}</h3>
                        {getStatusBadge(donation.status)}
                      </div>
                      <p className="text-sm text-gray-500">{donation.donorName}</p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{donation.quantity} | {donation.foodType}</span>
                        <span>Expires: {formatDate(donation.expiryTime)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Filter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No donations found</h3>
                    <p className="text-gray-500">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FoodMap;
