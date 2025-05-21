
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Home, Map, User } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const Profile = () => {
  const { currentUser } = useAuth();

  const sidebarLinks = [
    { to: '/donor-dashboard', icon: <Home />, label: 'Dashboard' },
    { to: '/donor-history', icon: <Calendar />, label: 'Donation History' },
    { to: '/food-map', icon: <Map />, label: 'View Map' },
    { to: '/profile', icon: <User />, label: 'My Profile' },
  ];

  return (
    <DashboardLayout 
      title="My Profile" 
      sidebarLinks={sidebarLinks}
      activeLink="/profile"
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={currentUser?.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={currentUser?.email} readOnly />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={currentUser?.address} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={currentUser?.phone || ''} />
              </div>
              <Button type="button" className="mt-4 bg-foodbridge-primary hover:bg-foodbridge-secondary">
                Update Profile
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button type="button" className="mt-2">
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
