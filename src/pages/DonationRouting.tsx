import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from '@/hooks/use-toast';
import { Recycle, Save, Map as MapIcon, Home } from 'lucide-react';
import { format } from 'date-fns';
import { FoodDonation, User } from '@/types';
import { mockFoodDonations } from '@/data/mockData';
import GoogleMap from '@/components/ui/GoogleMap';
import { useNavigate } from 'react-router-dom';

// Mock NGOs for demonstration
const mockNGOs: User[] = [
  { 
    id: 'ngo1', 
    name: 'Food Rescue Network', 
    email: 'info@foodrescue.org', 
    role: 'ngo',
    phone: '555-123-4567',
    address: '123 Main St, New York, NY',
    location: { lat: 40.7128, lng: -74.006 },
    organizationName: 'Food Rescue Network',
    organizationDescription: 'We rescue surplus food and distribute it to those in need.'
  },
  { 
    id: 'ngo2', 
    name: 'Community Pantry', 
    email: 'contact@communitypantry.org', 
    role: 'ngo',
    phone: '555-987-6543',
    address: '456 Park Ave, New York, NY',
    location: { lat: 40.7358, lng: -73.9911 },
    organizationName: 'Community Pantry',
    organizationDescription: 'Local food pantry serving the community for over 10 years.'
  },
  { 
    id: 'ngo3', 
    name: 'Hunger Relief Initiative', 
    email: 'help@hungerrelief.org', 
    role: 'ngo',
    phone: '555-456-7890',
    address: '789 Broadway, New York, NY',
    location: { lat: 40.7484, lng: -73.9857 },
    organizationName: 'Hunger Relief Initiative',
    organizationDescription: 'Fighting hunger and food waste through community partnerships.'
  },
];

// Statistics for tracking impact
interface FoodWasteStats {
  totalKgSaved: number;
  totalMealsSaved: number;
  co2Reduction: number;
  waterSaved: number;
}

const DonationRouting = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [donations, setDonations] = useState<FoodDonation[]>(mockFoodDonations);
  const [availableDonations, setAvailableDonations] = useState<FoodDonation[]>([]);
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);
  const [selectedNGO, setSelectedNGO] = useState<string | null>(null);
  const [isRouting, setIsRouting] = useState(false);
  const [stats, setStats] = useState<FoodWasteStats>({
    totalKgSaved: 0,
    totalMealsSaved: 0,
    co2Reduction: 0,
    waterSaved: 0,
  });

  // Filter donations based on status and expiryTime
  useEffect(() => {
    const available = donations.filter(donation => {
      // Only show available donations that haven't expired
      const isAvailable = donation.status === 'available';
      const expiryTime = new Date(donation.expiryTime);
      const hasntExpired = expiryTime > new Date();
      return isAvailable && hasntExpired;
    });
    setAvailableDonations(available);

    // Calculate waste reduction statistics based on completed donations
    const completedDonations = donations.filter(d => d.status === 'completed');
    calculateWasteStats(completedDonations);
  }, [donations]);

  const calculateWasteStats = (completedDonations: FoodDonation[]) => {
    // This is a simplified calculation for demo purposes
    // In a real app, you would have more detailed data about each donation
    const totalKg = completedDonations.length * 5; // Assume average 5kg per donation
    const totalMeals = totalKg * 2.5; // Assume 2.5 meals per kg
    const co2 = totalKg * 2.5; // Assume 2.5kg CO2 saved per kg food
    const water = totalKg * 1000; // Assume 1000L water saved per kg food

    setStats({
      totalKgSaved: totalKg,
      totalMealsSaved: Math.round(totalMeals),
      co2Reduction: co2,
      waterSaved: water,
    });
  };

  const handleMatchNGO = (donation: FoodDonation) => {
    setSelectedDonation(donation);
    // In a real app, this would use an algorithm to find the best NGO match
    // based on food type, quantity, location, etc.
    setSelectedNGO(null); // Reset selection
  };

  const handleConfirmRouting = () => {
    if (!selectedDonation || !selectedNGO) {
      toast("Selection incomplete. Please select an NGO to route this donation.");
      return;
    }

    setIsRouting(true);

    // Simulate API call to update donation and create assignment
    setTimeout(() => {
      // Update donation status
      const updatedDonation: FoodDonation = {
        ...selectedDonation,
        status: 'assigned',
        ngoId: selectedNGO,
        updatedAt: new Date()
      };

      // Update the donations list
      setDonations(donations.map(d => 
        d.id === selectedDonation.id ? updatedDonation : d
      ));

      setIsRouting(false);
      setSelectedDonation(null);
      setSelectedNGO(null);

      toast("Donation routed successfully. The food donation has been assigned to the selected NGO.");
    }, 1500);
  };

  // Calculate matching score between food donation and NGO (simplified)
  const calculateMatchScore = (donation: FoodDonation, ngo: User): number => {
    // In a real app, this would use distance, food preferences, capacity, etc.
    // For demo, just using a random score between 50-100
    return Math.floor(Math.random() * 50) + 50;
  };

  // Find best NGO match for a donation
  const findBestNGOMatch = (donation: FoodDonation): User => {
    // In a real app, this would use more sophisticated matching algorithm
    return mockNGOs[Math.floor(Math.random() * mockNGOs.length)];
  };

  const getExpiryTimeColor = (expiryTime: Date) => {
    const now = new Date();
    const hoursLeft = Math.max(0, (new Date(expiryTime).getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (hoursLeft < 6) return "text-red-600";
    if (hoursLeft < 12) return "text-orange-500";
    if (hoursLeft < 24) return "text-yellow-500";
    return "text-green-500";
  };

  const sidebarLinks = [
    { to: '/donor-dashboard', icon: <Home />, label: 'Dashboard' },
    { to: '/food-map', icon: <MapIcon />, label: 'Food Map' },
    { to: '/donation-routing', icon: <Recycle />, label: 'Donation Routing' },
    { to: '/impact-reports', icon: <Save />, label: 'Impact Reports' },
  ];

  return (
    <DashboardLayout 
      title="Donation Routing" 
      sidebarLinks={sidebarLinks}
      activeLink="/donation-routing"
    >
      <div className="space-y-6">
        {/* Impact Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Food Rescued
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalKgSaved} kg</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Meals Provided
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalMealsSaved}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                CO₂ Emissions Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.co2Reduction} kg</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Water Saved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.waterSaved} L</div>
            </CardContent>
          </Card>
        </div>

        {/* Smart Routing System */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Donations */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Available Food Donations</CardTitle>
              <CardDescription>
                Food donations that need to be routed to NGOs
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableDonations.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Food Details</TableHead>
                        <TableHead>Expiry</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Suggested NGO</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableDonations.map((donation) => {
                        const bestMatch = findBestNGOMatch(donation);
                        const matchScore = calculateMatchScore(donation, bestMatch);
                        
                        return (
                          <TableRow key={donation.id}>
                            <TableCell className="font-medium">
                              {donation.donorName}
                            </TableCell>
                            <TableCell className="truncate max-w-[150px]">
                              {donation.foodType}: {donation.description}
                            </TableCell>
                            <TableCell className={getExpiryTimeColor(donation.expiryTime)}>
                              {format(new Date(donation.expiryTime), 'MMM d, h:mma')}
                            </TableCell>
                            <TableCell className="truncate max-w-[150px]">
                              {donation.pickupAddress}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <span>{bestMatch.organizationName}</span>
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                  {matchScore}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMatchNGO(donation)}
                              >
                                Route
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-10">
                  <Recycle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No available donations</h3>
                  <p className="text-gray-500">
                    There are currently no food donations that need routing
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* NGO Partners */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>NGO Partners</CardTitle>
              <CardDescription>
                Organizations that can receive food donations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockNGOs.map((ngo) => (
                  <div key={ngo.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{ngo.organizationName}</h3>
                    <p className="text-sm text-gray-500 my-1">{ngo.organizationDescription}</p>
                    <div className="text-sm text-gray-600 mt-2">
                      <p>📍 {ngo.address}</p>
                      <p>📞 {ngo.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Routing Map */}
        <Card>
          <CardHeader>
            <CardTitle>Donation Routing Map</CardTitle>
            <CardDescription>
              Visual representation of food donations and NGOs
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[400px]">
              <GoogleMap
                center={{ lat: 40.7128, lng: -74.006 }}
                zoom={12}
                markers={[
                  ...availableDonations.map(donation => ({
                    id: donation.id,
                    position: donation.location,
                    title: `${donation.foodType}: ${donation.description}`,
                    color: "#ffaa00" // Amber for available donations
                  })),
                  ...mockNGOs.map(ngo => ({
                    id: ngo.id,
                    position: ngo.location || { lat: 40.7128, lng: -74.006 },
                    title: ngo.organizationName || ngo.name,
                    color: "#008000" // Green for NGOs
                  }))
                ]}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* NGO Selection Dialog */}
      <Dialog open={!!selectedDonation} onOpenChange={(open) => !open && setSelectedDonation(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Route Donation to NGO</DialogTitle>
            <DialogDescription>
              Select the most suitable NGO for this donation
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="donor">Donor</Label>
                <Input id="donor" value={selectedDonation?.donorName || ''} readOnly className="bg-gray-50" />
              </div>
              <div>
                <Label htmlFor="food-type">Food Type</Label>
                <Input id="food-type" value={selectedDonation?.foodType || ''} readOnly className="bg-gray-50" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={selectedDonation?.description || ''} readOnly className="bg-gray-50" />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="expiry">Expires</Label>
                <Input 
                  id="expiry" 
                  value={selectedDonation ? format(new Date(selectedDonation.expiryTime), 'MMM d, h:mma') : ''} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" value={selectedDonation?.quantity || ''} readOnly className="bg-gray-50" />
              </div>
            </div>
            
            <div>
              <Label htmlFor="address">Pickup Address</Label>
              <Input id="address" value={selectedDonation?.pickupAddress || ''} readOnly className="bg-gray-50" />
            </div>
            
            <div>
              <Label htmlFor="ngo">Select NGO</Label>
              <Select onValueChange={setSelectedNGO} value={selectedNGO || undefined}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an NGO" />
                </SelectTrigger>
                <SelectContent>
                  {mockNGOs.map(ngo => (
                    <SelectItem key={ngo.id} value={ngo.id}>
                      {ngo.organizationName} ({calculateMatchScore(selectedDonation || mockFoodDonations[0], ngo)}% match)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDonation(null)}>Cancel</Button>
            <Button 
              onClick={handleConfirmRouting} 
              disabled={isRouting || !selectedNGO}
            >
              {isRouting ? "Routing..." : "Confirm Routing"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DonationRouting;
