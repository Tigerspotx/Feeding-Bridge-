
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import GoogleMap from '@/components/ui/GoogleMap';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
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
import { Calendar, CheckCheck, Home, Map, User } from 'lucide-react';
import { format } from 'date-fns';
import { FoodDonation, PickupAssignment } from '@/types';
import { mockFoodDonations, mockPickupAssignments } from '@/data/mockData';

const VolunteerDashboard = () => {
  const { currentUser } = useAuth();
  const [assignments, setAssignments] = useState<Array<PickupAssignment & { donation?: FoodDonation }>>(
    mockPickupAssignments
      .filter(p => p.volunteerId === currentUser?.id)
      .map(pickup => {
        const donation = mockFoodDonations.find(d => d.id === pickup.donationId);
        return { ...pickup, donation };
      })
  );
  
  const assignedPickups = assignments.filter(a => a.status === 'assigned');
  const activePickups = assignments.filter(a => a.status === 'in-progress');
  const completedPickups = assignments.filter(a => a.status === 'completed');
  
  const handleStartPickup = (pickupId: string) => {
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === pickupId) {
        return { ...assignment, status: 'in-progress', updatedAt: new Date() };
      }
      return assignment;
    });
    
    setAssignments(updatedAssignments);
    toast.success('Pickup started! Navigate to the pickup location.');
  };
  
  const handleCompletePickup = (pickupId: string) => {
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === pickupId) {
        return { 
          ...assignment, 
          status: 'completed', 
          completedTime: new Date(),
          updatedAt: new Date() 
        };
      }
      return assignment;
    });
    
    setAssignments(updatedAssignments);
    toast.success('Pickup completed! Thank you for your help.');
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'assigned':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">Ready for Pickup</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Completed</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };
  
  const sidebarLinks = [
    { to: '/volunteer-dashboard', icon: <Home />, label: 'Dashboard' },
    { to: '/volunteer-dashboard/map', icon: <Map />, label: 'Pickup Map' },
    { to: '/volunteer-dashboard/history', icon: <Calendar />, label: 'Pickup History' },
    { to: '/profile', icon: <User />, label: 'My Profile' },
  ];

  return (
    <DashboardLayout 
      title="Volunteer Dashboard" 
      sidebarLinks={sidebarLinks}
      activeLink="/volunteer-dashboard"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Assigned Pickups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{assignedPickups.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activePickups.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedPickups.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Pickups */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[...assignedPickups, ...activePickups].length > 0 ? (
            [...assignedPickups, ...activePickups].map(assignment => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Pickup #{assignment.id.substring(7, 11)}</CardTitle>
                    {getStatusBadge(assignment.status)}
                  </div>
                  <CardDescription>
                    {assignment.donation?.donorName || 'Unknown Donor'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pb-0">
                  <div className="h-[140px] -mx-6">
                    <GoogleMap
                      center={assignment.donation?.location || { lat: 40.7128, lng: -74.006 }}
                      zoom={15}
                      markers={[{
                        id: assignment.id,
                        position: assignment.donation?.location || { lat: 40.7128, lng: -74.006 },
                        title: 'Pickup Location'
                      }]}
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-sm mb-1">
                      <strong>Food:</strong> {assignment.donation?.description}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Quantity:</strong> {assignment.donation?.quantity}
                    </p>
                    <p className="text-sm mb-1">
                      <strong>Pickup:</strong> {assignment.pickupTime ? format(new Date(assignment.pickupTime), 'MMM d, h:mma') : 'Flexible'}
                    </p>
                    <p className="text-sm truncate">
                      <strong>Address:</strong> {assignment.donation?.pickupAddress}
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-4 pb-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">View Details</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Pickup Details</DialogTitle>
                        <DialogDescription>
                          Complete information about this pickup assignment
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-medium">Status</h3>
                            <p>{getStatusBadge(assignment.status)}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Scheduled Pickup</h3>
                            <p>{assignment.pickupTime ? format(new Date(assignment.pickupTime), 'MMM d, h:mma') : 'Flexible'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium">Organization</h3>
                          <p>Food Rescue</p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium">Donor</h3>
                          <p>{assignment.donation?.donorName}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium">Pickup Address</h3>
                          <p>{assignment.donation?.pickupAddress}</p>
                        </div>
                        
                        <div>
                          <h3 className="font-medium">Food Details</h3>
                          <p><strong>Description:</strong> {assignment.donation?.description}</p>
                          <p><strong>Quantity:</strong> {assignment.donation?.quantity}</p>
                          <p><strong>Type:</strong> {assignment.donation?.foodType}</p>
                          <p><strong>Expires:</strong> {assignment.donation ? format(new Date(assignment.donation.expiryTime), 'MMM d, h:mma') : ''}</p>
                        </div>
                        
                        <div className="h-[200px] mt-2">
                          <GoogleMap
                            center={assignment.donation?.location || { lat: 40.7128, lng: -74.006 }}
                            zoom={15}
                            markers={[{
                              id: assignment.id,
                              position: assignment.donation?.location || { lat: 40.7128, lng: -74.006 },
                              title: 'Pickup Location'
                            }]}
                          />
                        </div>

                        <div>
                          <Button 
                            className="w-full mt-2"
                            onClick={() => {
                              // Open in Google Maps
                              const lat = assignment.donation?.location.lat;
                              const lng = assignment.donation?.location.lng;
                              window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
                            }}
                          >
                            Navigate to Location
                          </Button>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            toast.success('Message sent to NGO');
                          }}
                        >
                          Contact NGO
                        </Button>
                        {assignment.status === 'assigned' && (
                          <Button 
                            className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
                            onClick={() => {
                              handleStartPickup(assignment.id);
                            }}
                          >
                            Start Pickup
                          </Button>
                        )}
                        {assignment.status === 'in-progress' && (
                          <Button 
                            className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
                            onClick={() => {
                              handleCompletePickup(assignment.id);
                            }}
                          >
                            Mark as Completed
                          </Button>
                        )}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  {assignment.status === 'assigned' && (
                    <Button 
                      className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
                      onClick={() => handleStartPickup(assignment.id)}
                    >
                      Start Pickup
                    </Button>
                  )}
                  
                  {assignment.status === 'in-progress' && (
                    <Button
                      className="bg-foodbridge-primary hover:bg-foodbridge-secondary"
                      onClick={() => handleCompletePickup(assignment.id)}
                    >
                      Complete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <Card className="col-span-3">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCheck className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium mb-2">No Active Pickups</h3>
                <p className="text-gray-500 text-center max-w-md mb-4">
                  You don't have any active pickups assigned. Check back later or contact your NGO coordinator.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Completed Pickups */}
        <Card>
          <CardHeader>
            <CardTitle>Recently Completed Pickups</CardTitle>
            <CardDescription>
              Your pickup history from the past 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            {completedPickups.length > 0 ? (
              <div className="space-y-4">
                {completedPickups.map(assignment => (
                  <div 
                    key={assignment.id} 
                    className="flex justify-between items-center border-b pb-3 last:border-0"
                  >
                    <div>
                      <p className="font-medium">{assignment.donation?.donorName}</p>
                      <p className="text-sm text-gray-500">{assignment.donation?.description}</p>
                      <p className="text-xs text-gray-400">
                        Completed on {assignment.completedTime ? format(new Date(assignment.completedTime), 'MMM d, h:mma') : 'Unknown'}
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Completed Pickup</DialogTitle>
                          <DialogDescription>
                            Details of your completed food pickup
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-xl">Pickup #{assignment.id.substring(7, 11)}</h3>
                            {getStatusBadge(assignment.status)}
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Donor</h4>
                              <p>{assignment.donation?.donorName}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Food Details</h4>
                              <p>{assignment.donation?.description}</p>
                              <p className="text-sm">{assignment.donation?.quantity} | {assignment.donation?.foodType}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Pickup Location</h4>
                              <p>{assignment.donation?.pickupAddress}</p>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium text-gray-500">Timeline</h4>
                              <div className="flex items-center text-sm">
                                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                                <p>Assigned: {format(new Date(assignment.createdAt), 'MMM d, h:mma')}</p>
                              </div>
                              <div className="flex items-center text-sm">
                                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                                <p>Completed: {assignment.completedTime ? format(new Date(assignment.completedTime), 'MMM d, h:mma') : 'Unknown'}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-1">No completed pickups</h3>
                <p className="text-gray-500 mb-4">
                  You haven't completed any pickups yet
                </p>
              </div>
            )}
          </CardContent>
          {completedPickups.length > 5 && (
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Completed Pickups
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default VolunteerDashboard;
