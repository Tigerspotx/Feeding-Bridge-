
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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
import { toast } from '@/components/ui/sonner';
import { Calendar, Home, List, Map, User } from 'lucide-react';
import { format } from 'date-fns';
import GoogleMap from '@/components/ui/GoogleMap';
import { FoodDonation } from '@/types';
import { mockFoodDonations } from '@/data/mockData';

const DonorDashboard = () => {
  const { currentUser } = useAuth();
  const [donations, setDonations] = useState<FoodDonation[]>(
    mockFoodDonations.filter(d => d.donorId === currentUser?.id)
  );
  
  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    description: '',
    quantity: '',
    foodType: '',
    expiryHours: '24',
    pickupAddress: currentUser?.address || '',
  });
  
  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      const expiryTime = new Date(now.getTime() + parseInt(formValues.expiryHours) * 60 * 60 * 1000);
      
      const newDonation: FoodDonation = {
        id: `donation_${Date.now()}`,
        donorId: currentUser?.id || '',
        donorName: currentUser?.name || '',
        description: formValues.description,
        quantity: formValues.quantity,
        foodType: formValues.foodType,
        expiryTime,
        pickupAddress: formValues.pickupAddress,
        location: currentUser?.location || { lat: 40.7128, lng: -74.006 },
        status: 'available',
        createdAt: now,
        updatedAt: now,
      };
      
      setDonations([newDonation, ...donations]);
      setFormValues({
        description: '',
        quantity: '',
        foodType: '',
        expiryHours: '24',
        pickupAddress: currentUser?.address || '',
      });
      
      setIsSubmitting(false);
      toast.success('Food donation listed successfully!');
    }, 1000);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Available</span>;
      case 'assigned':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Assigned</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Expired</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const sidebarLinks = [
    { to: '/donor-dashboard', icon: <Home />, label: 'Dashboard' },
    { to: '/donor-dashboard/history', icon: <Calendar />, label: 'Donation History' },
    { to: '/donor-dashboard/map', icon: <Map />, label: 'View Map' },
    { to: '/profile', icon: <User />, label: 'My Profile' },
  ];

  return (
    <DashboardLayout 
      title="Donor Dashboard" 
      sidebarLinks={sidebarLinks}
      activeLink="/donor-dashboard"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Donations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{donations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {donations.filter(d => d.status === 'available').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Pickups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {donations.filter(d => d.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Donation Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Donate Food</CardTitle>
            <CardDescription>
              List your surplus food for pickup by local NGOs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Food Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the food you're donating"
                  value={formValues.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    placeholder="e.g. 5kg, 10 meals, 20 items"
                    value={formValues.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="foodType">Food Type</Label>
                  <Input
                    id="foodType"
                    name="foodType"
                    placeholder="e.g. Prepared meals, Produce, Bakery"
                    value={formValues.foodType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryHours">Expiry Time (hours from now)</Label>
                  <Input
                    id="expiryHours"
                    name="expiryHours"
                    type="number"
                    min="1"
                    max="72"
                    value={formValues.expiryHours}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pickupAddress">Pickup Address</Label>
                  <Input
                    id="pickupAddress"
                    name="pickupAddress"
                    value={formValues.pickupAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-foodbridge-primary hover:bg-foodbridge-secondary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'List Food Donation'}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {/* Recent Donations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Your Donations</CardTitle>
              <CardDescription>
                Track the status of your food donations
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {donations.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Listed On</TableHead>
                      <TableHead>Details</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium truncate max-w-[200px]">
                          {donation.description}
                        </TableCell>
                        <TableCell>{donation.quantity}</TableCell>
                        <TableCell>
                          {format(new Date(donation.expiryTime), 'MMM d, h:mma')}
                        </TableCell>
                        <TableCell>{getStatusBadge(donation.status)}</TableCell>
                        <TableCell>
                          {format(new Date(donation.createdAt), 'MMM d, h:mma')}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>Donation Details</DialogTitle>
                                <DialogDescription>
                                  Details about your food donation
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div>
                                  <h3 className="font-medium">Description</h3>
                                  <p>{donation.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="font-medium">Quantity</h3>
                                    <p>{donation.quantity}</p>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Food Type</h3>
                                    <p>{donation.foodType}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h3 className="font-medium">Status</h3>
                                    <p>{getStatusBadge(donation.status)}</p>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Expires</h3>
                                    <p>{format(new Date(donation.expiryTime), 'MMM d, h:mma')}</p>
                                  </div>
                                </div>
                                <div>
                                  <h3 className="font-medium">Pickup Address</h3>
                                  <p>{donation.pickupAddress}</p>
                                </div>
                                {donation.ngoId && (
                                  <div>
                                    <h3 className="font-medium">Assigned NGO</h3>
                                    <p>Food Rescue</p>
                                  </div>
                                )}
                                <div className="h-[200px] mt-2">
                                  <GoogleMap
                                    center={donation.location}
                                    zoom={15}
                                    markers={[{
                                      id: donation.id,
                                      position: donation.location,
                                      title: 'Pickup Location'
                                    }]}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" type="button">
                                  {donation.status === 'available' ? 'Edit Details' : 'Close'}
                                </Button>
                                {donation.status === 'available' && (
                                  <Button 
                                    variant="destructive" 
                                    type="button"
                                    onClick={() => {
                                      toast.success('Donation cancelled successfully');
                                    }}
                                  >
                                    Cancel Donation
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <List className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">No donations yet</h3>
                <p className="text-gray-500 mb-4">
                  You haven't listed any food donations yet
                </p>
              </div>
            )}
          </CardContent>
          {donations.length > 5 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Donations
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonorDashboard;
