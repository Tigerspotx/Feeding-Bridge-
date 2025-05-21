
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';

interface RegisterFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  address?: string;
  organizationName?: string;
  organizationDescription?: string;
}

const Register = () => {
  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<RegisterFormValues>();
  
  // Get role from URL query params (if provided)
  const queryParams = new URLSearchParams(location.search);
  const roleParam = queryParams.get('role') as UserRole | null;
  
  // Set default role based on URL or default to 'donor'
  const [selectedRole, setSelectedRole] = useState<UserRole>(roleParam || 'donor');
  
  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: selectedRole,
        address: data.address,
        // Default location (can be replaced with actual geocoding later)
        location: { lat: 40.7128, lng: -74.006 },
      };
      
      // Add organization data for NGOs
      if (selectedRole === 'ngo') {
        Object.assign(userData, {
          organizationName: data.organizationName,
          organizationDescription: data.organizationDescription,
        });
      }
      
      await registerUser(userData, data.password);
      
      // Redirect based on role
      switch (selectedRole) {
        case 'donor':
          navigate('/donor-dashboard');
          break;
        case 'ngo':
          navigate('/ngo-dashboard');
          break;
        case 'volunteer':
          navigate('/volunteer-dashboard');
          break;
        default:
          navigate('/');
      }
      
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };
  
  const handleRoleChange = (value: UserRole) => {
    setSelectedRole(value);
    setValue('role', value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md my-8">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register with FoodBridge</CardTitle>
          <CardDescription className="text-center">
            Create your account to start making a difference
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">I want to register as a:</Label>
              <RadioGroup 
                defaultValue={selectedRole}
                onValueChange={(value) => handleRoleChange(value as UserRole)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="donor" id="donor" />
                  <Label htmlFor="donor" className="cursor-pointer">Donor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ngo" id="ngo" />
                  <Label htmlFor="ngo" className="cursor-pointer">NGO</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="volunteer" id="volunteer" />
                  <Label htmlFor="volunteer" className="cursor-pointer">Volunteer</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Basic info for all users */}
            <div className="space-y-2">
              <Label htmlFor="name">
                {selectedRole === 'ngo' ? 'Contact Person Name' : 'Full Name'}
              </Label>
              <Input 
                id="name"
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="your@email.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone"
                placeholder="123-456-7890"
                {...register('phone', { required: 'Phone number is required' })}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input 
                id="address"
                placeholder="123 Main St, City, Country"
                {...register('address')}
              />
            </div>

            {/* NGO specific fields */}
            {selectedRole === 'ngo' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input 
                    id="organizationName"
                    placeholder="Your NGO Name"
                    {...register('organizationName', { 
                      required: selectedRole === 'ngo' ? 'Organization name is required' : false 
                    })}
                  />
                  {errors.organizationName && (
                    <p className="text-sm text-red-500">{errors.organizationName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organizationDescription">Organization Description</Label>
                  <Textarea 
                    id="organizationDescription"
                    placeholder="Briefly describe your organization and its mission"
                    {...register('organizationDescription')}
                  />
                </div>
              </>
            )}

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  }
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full bg-foodbridge-primary hover:bg-foodbridge-secondary" 
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link 
              to={`/login${roleParam ? `?role=${roleParam}` : ''}`} 
              className="text-foodbridge-primary font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
