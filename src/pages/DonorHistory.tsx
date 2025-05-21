
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { 
  Card, 
  CardContent, 
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
import { Calendar, Home, Map, User } from 'lucide-react';
import { format } from 'date-fns';
import { mockFoodDonations } from '@/data/mockData';
import { FoodDonation } from '@/types';

const DonorHistory = () => {
  const { currentUser } = useAuth();
  const [donations] = useState<FoodDonation[]>(
    mockFoodDonations.filter(d => d.donorId === currentUser?.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );
  
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
    { to: '/donor-history', icon: <Calendar />, label: 'Donation History' },
    { to: '/food-map', icon: <Map />, label: 'View Map' },
    { to: '/profile', icon: <User />, label: 'My Profile' },
  ];

  return (
    <DashboardLayout 
      title="Donation History" 
      sidebarLinks={sidebarLinks}
      activeLink="/donor-history"
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>All Donations</CardTitle>
          </CardHeader>
          <CardContent>
            {donations.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Description</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Food Type</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Listed On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="font-medium truncate max-w-[200px]">
                          {donation.description}
                        </TableCell>
                        <TableCell>{donation.quantity}</TableCell>
                        <TableCell>{donation.foodType}</TableCell>
                        <TableCell>
                          {format(new Date(donation.expiryTime), 'MMM d, h:mma')}
                        </TableCell>
                        <TableCell>{getStatusBadge(donation.status)}</TableCell>
                        <TableCell>
                          {format(new Date(donation.createdAt), 'MMM d, h:mma')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No donation history found.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonorHistory;
