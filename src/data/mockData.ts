
import { FoodDonation, PickupAssignment } from "@/types";

// Mock food donations
export const mockFoodDonations: FoodDonation[] = [
  {
    id: "donation1",
    donorId: "1",
    donorName: "John Donor",
    description: "Leftover catering food from office event",
    quantity: "20 meals",
    foodType: "Prepared meals",
    expiryTime: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours from now
    pickupAddress: "123 Main St, New York, NY",
    location: { lat: 40.712, lng: -74.006 },
    status: "available",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "donation2",
    donorId: "1",
    donorName: "John Donor",
    description: "Fresh vegetables and fruits",
    quantity: "15 kg",
    foodType: "Fresh produce",
    expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    pickupAddress: "123 Main St, New York, NY",
    location: { lat: 40.712, lng: -74.006 },
    status: "assigned",
    ngoId: "2",
    volunteerId: "3",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "donation3",
    donorId: "4",
    donorName: "City Bakery",
    description: "Day-old bread and pastries",
    quantity: "30 items",
    foodType: "Bakery",
    expiryTime: new Date(Date.now() + 12 * 60 * 60 * 1000), // 12 hours from now
    pickupAddress: "456 Park Ave, New York, NY",
    location: { lat: 40.7580, lng: -73.9855 },
    status: "available",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "donation4",
    donorId: "5",
    donorName: "Green Grocer",
    description: "Slightly bruised apples and pears",
    quantity: "10 kg",
    foodType: "Fresh produce",
    expiryTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from now
    pickupAddress: "789 Broadway, New York, NY",
    location: { lat: 40.7352, lng: -73.9911 },
    status: "assigned",
    ngoId: "2",
    volunteerId: "3",
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "donation5",
    donorId: "6",
    donorName: "Hotel Grand",
    description: "Buffet food from event",
    quantity: "40 meals",
    foodType: "Prepared meals",
    expiryTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours from now
    pickupAddress: "100 5th Ave, New York, NY",
    location: { lat: 40.7399, lng: -73.9910 },
    status: "completed",
    ngoId: "2",
    volunteerId: "3",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    id: "donation6",
    donorId: "1",
    donorName: "John Donor",
    description: "Unopened milk and dairy products",
    quantity: "10 items",
    foodType: "Dairy",
    expiryTime: new Date(Date.now() + 36 * 60 * 60 * 1000), // 36 hours from now
    pickupAddress: "123 Main St, New York, NY",
    location: { lat: 40.712, lng: -74.006 },
    status: "completed",
    ngoId: "7",
    volunteerId: "8",
    createdAt: new Date(Date.now() - 36 * 60 * 60 * 1000), // 36 hours ago
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
];

// Mock pickup assignments
export const mockPickupAssignments: PickupAssignment[] = [
  {
    id: "pickup1",
    donationId: "donation2",
    ngoId: "2",
    volunteerId: "3",
    status: "assigned",
    pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "pickup2",
    donationId: "donation4",
    ngoId: "2",
    volunteerId: "3",
    status: "in-progress",
    pickupTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    id: "pickup3",
    donationId: "donation5",
    ngoId: "2",
    volunteerId: "3",
    status: "completed",
    pickupTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    completedTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    updatedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
];
