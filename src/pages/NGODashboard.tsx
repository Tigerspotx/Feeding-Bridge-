
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GoogleMap from '@/components/ui/GoogleMap';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/components/ui/sonner';
import { Calendar, Home, List, Map, User } from 'lucide-react';
import { format } from 'date-fns';
import { FoodDonation, PickupAssignment } from '@/types';
import { mockFoodDonations, mockPickupAssignments } from '@/data/mockData';

const NGODashboard = () => {
  const { currentUser } = useAuth();
  const [availableDonations, setAvailableDonations] = useState<FoodDonation[]>(
    mockFoodDonations.filter(d => d.status === 'available')
  );
  const [assignedDonations, setAssignedDonations] = useState<FoodDonation[]>(
    mockFoodDonations.filter(d => d.ngoId === currentUser?.id)
  );
  const [pickups, setPickups] = useState<PickupAssignment[]>(
    mockPickupAssignments.filter(p => p.ngoId === currentUser?.id)
  );
  const [selectedDonation, setSelectedDonation] = useState<FoodDonation | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<string | null>(null);
  
  // Mock volunteers
  const volunteers = [
    { id: '3', name: 'Sam Volunteer' },
    { id: '8', name: 'Alex Helper' },
    { id: '9', name: 'Jamie Assistant' },
  ];
  
  const handleAssignVolunteer = () => {
    if (!selectedDonation || !selectedVolunteer) {
      toast.error('Please select a volunteer');
      return;
    }
    
    // Update donation status
    const updatedDonation: FoodDonation = {
      ...selectedDonation,
      status: 'assigned',
      ngoId: currentUser?.id,
      volunteerId: selectedVolunteer,
      updatedAt: new Date()
    };
    
    // Create new pickup assignment
    const newPickup: PickupAssignment = {
      id: `pickup_${Date.now()}`,
      donationId: selectedDonation.id,
      ngoId: currentUser?.id || '',
      volunteerId: selectedVolunteer,
      status: 'assigned',
      pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // Default 2 hours from now
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    // Update state
    setAvailableDonations(availableDonations.filter(d => d.id !== selectedDonation.id));
    setAssignedDonations([updatedDonation, ...assignedDonations]);
    setPickups([newPickup, ...pickups]);
    
    toast.success('Volunteer assigned successfully');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'available':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">Available</span>;
      case 'assigned':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Assigned</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">Expired</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const handleDonationClick = (donationId: string) => {
    const donation = availableDonations.find(d => d.id === donationId);
    if (donation) {
      setSelectedDonation(donation);
    }
  };
  
  const sidebarLinks = [
    { to: '/ngo-dashboard', icon: <Home />, label: 'Dashboard' },
    { to: '/ngo-dashboard/food-map', icon: <Map />, label: 'Food Map' },
    { to: '/ngo-dashboard/pickups', icon: <List />, label: 'Manage Pickups' },
    { to: '/ngo-dashboard/volunteers', icon: <User />, label: 'Volunteers' },
    { to: '/ngo-dashboard/reports', icon: <Calendar />, label: 'Reports' },
    { to: '/profile', icon: <User />, label: 'Organization Profile' },
  ];

  return (
    <DashboardLayout 
      title="NGO Dashboard" 
      sidebarLinks={sidebarLinks}
      activeLink="/ngo-dashboard"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available Food
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{availableDonations.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assigned Pickups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {pickups.filter(p => p.status === 'assigned').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {pickups.filter(p => p.status === 'in-progress').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed Today
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {pickups.filter(p => 
                  p.status === 'completed' && 
                  p.completedTime && 
                  p.completedTime.toDateString() === new Date().toDateString()
                ).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Food Map and Available Donations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Available Food Map</CardTitle>
              <CardDescription>
                Food donations available for pickup
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px]">
                <GoogleMap
                  center={{ lat: 40.7128, lng: -74.006 }}
                  zoom={12}
                  markers={availableDonations.map(donation => ({
                    id: donation.id,
                    position: donation.location,
                    title: donation.description,
                    onClick: () => handleDonationClick(donation.id)
                  }))}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Available Donations */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Available Food Donations</CardTitle>
              <CardDescription>
                Recent food donations available for pickup
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableDonations.length > 0 ? (
                <div className="overflow-y-auto max-h-[320px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Expires</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableDonations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-medium">
                            {donation.donorName}
                          </TableCell>
                          <TableCell className="truncate max-w-[150px]">
                            {donation.description}
                          </TableCell>
                          <TableCell>
                            {format(new Date(donation.expiryTime), 'MMM d, h:mma')}
                          </TableCell>
                          <TableCell>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-foodbridge-primary border-foodbridge-primary hover:bg-foodbridge-primary hover:text-white"
                                  onClick={() => setSelectedDonation(donation)}
                                >
                                  Claim
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Claim Food Donation</DialogTitle>
                                  <DialogDescription>
                                    Assign a volunteer to pick up this donation
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div>
                                    <h3 className="font-medium mb-1">Food Details</h3>
                                    <p className="text-sm mb-1"><strong>Description:</strong> {selectedDonation?.description}</p>
                                    <p className="text-sm mb-1"><strong>Quantity:</strong> {selectedDonation?.quantity}</p>
                                    <p className="text-sm mb-1"><strong>Type:</strong> {selectedDonation?.foodType}</p>
                                    <p className="text-sm mb-1"><strong>Expiry:</strong> {selectedDonation ? format(new Date(selectedDonation.expiryTime), 'MMM d, h:mma') : ''}</p>
                                    <p className="text-sm"><strong>Address:</strong> {selectedDonation?.pickupAddress}</p>
                                  </div>
                                  <div>
                                    <h3 className="font-medium mb-2">Assign Volunteer</h3>
                                    <Select onValueChange={(value) => setSelectedVolunteer(value)}>
                                      <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a volunteer" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {volunteers.map(volunteer => (
                                          <SelectItem key={volunteer.id} value={volunteer.id}>
                                            {volunteer.name}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <h3 className="font-medium mb-2">Pickup Time</h3>
                                    <Input 
                                      type="datetime-local" 
                                      defaultValue={new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString().slice(0, 16)}
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button 
                                    onClick={handleAssignVolunteer}
                                    className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
                                  >
                                    Assign Volunteer
                                  </Button>
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
                  <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No available donations</h3>
                  <p className="text-gray-500">
                    There are currently no food donations available for pickup
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Active Pickups */}
        <Card>
          <CardHeader>
            <CardTitle>Active Pickups</CardTitle>
            <CardDescription>
              Manage your ongoing food pickup assignments
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pickups.filter(p => p.status !== 'completed').length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Volunteer</TableHead>
                      <TableHead>Donor</TableHead>
                      <TableHead>Food Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pickup Time</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pickups
                      .filter(p => p.status !== 'completed')
                      .map((pickup) => {
                        const donation = mockFoodDonations.find(d => d.id === pickup.donationId);
                        
                        return (
                          <TableRow key={pickup.id}>
                            <TableCell className="font-medium">
                              {pickup.volunteerId === '3' ? 'Sam Volunteer' : 'Unassigned'}
                            </TableCell>
                            <TableCell>
                              {donation?.donorName}
                            </TableCell>
                            <TableCell className="truncate max-w-[150px]">
                              {donation?.description}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(pickup.status)}
                            </TableCell>
                            <TableCell>
                              {pickup.pickupTime ? format(new Date(pickup.pickupTime), 'MMM d, h:mma') : 'Not set'}
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
                                    <DialogTitle>Pickup Details</DialogTitle>
                                    <DialogDescription>
                                      Pickup assignment details and status
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h3 className="font-medium">Status</h3>
                                        <p>{getStatusBadge(pickup.status)}</p>
                                      </div>
                                      <div>
                                        <h3 className="font-medium">Scheduled Pickup</h3>
                                        <p>{pickup.pickupTime ? format(new Date(pickup.pickupTime), 'MMM d, h:mma') : 'Not set'}</p>
                                      </div>
                                    </div>
                                    
                                    <div>
                                      <h3 className="font-medium">Volunteer</h3>
                                      <p>{pickup.volunteerId === '3' ? 'Sam Volunteer' : 'Unassigned'}</p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="font-medium">Donor</h3>
                                      <p>{donation?.donorName}</p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="font-medium">Pickup Address</h3>
                                      <p>{donation?.pickupAddress}</p>
                                    </div>
                                    
                                    <div>
                                      <h3 className="font-medium">Food Details</h3>
                                      <p><strong>Description:</strong> {donation?.description}</p>
                                      <p><strong>Quantity:</strong> {donation?.quantity}</p>
                                      <p><strong>Expires:</strong> {donation ? format(new Date(donation.expiryTime), 'MMM d, h:mma') : ''}</p>
                                    </div>
                                    
                                    <div className="h-[200px] mt-2">
                                      <GoogleMap
                                        center={donation?.location || { lat: 40.7128, lng: -74.006 }}
                                        zoom={15}
                                        markers={[{
                                          id: donation?.id || '',
                                          position: donation?.location || { lat: 40.7128, lng: -74.006 },
                                          title: 'Pickup Location'
                                        }]}
                                      />
                                    </div>
                                  </div>
                                  <DialogFooter>
                                    <Button 
                                      variant="outline" 
                                      type="button"
                                      onClick={() => {
                                        toast.success('Message sent to volunteer');
                                      }}
                                    >
                                      Message Volunteer
                                    </Button>
                                    <Button 
                                      type="button"
                                      className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
                                      onClick={() => {
                                        // Generate receipt
                                        toast.success('Pickup receipt generated');
                                      }}
                                    >
                                      Generate Receipt
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <List className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">No active pickups</h3>
                <p className="text-gray-500 mb-4">
                  You don't have any ongoing food pickup assignments
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NGODashboard;
