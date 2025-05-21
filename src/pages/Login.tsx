
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface LoginFormValues {
  email: string;
  password: string;
  role: UserRole;
}

const Login = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormValues>();
  
  // Get role from URL query params (if provided)
  const queryParams = new URLSearchParams(location.search);
  const roleParam = queryParams.get('role') as UserRole | null;
  
  // Set default role based on URL or default to 'donor'
  const [selectedRole, setSelectedRole] = useState<UserRole>(roleParam || 'donor');
  
  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password, selectedRole);
      
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
      
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };
  
  const handleRoleChange = (value: UserRole) => {
    setSelectedRole(value);
    setValue('role', value);
  };

  // Demo account credentials based on selected role
  const getDemoEmail = () => {
    switch (selectedRole) {
      case 'donor':
        return 'donor@example.com';
      case 'ngo':
        return 'ngo@example.com';
      case 'volunteer':
        return 'volunteer@example.com';
      default:
        return '';
    }
  };

  const handleDemoLogin = () => {
    const email = getDemoEmail();
    const password = 'password'; // Demo password is the same for all accounts

    onSubmit({ email, password, role: selectedRole });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to FoodBridge</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">I am a:</Label>
              <RadioGroup 
                defaultValue={selectedRole}
                onValueChange={(value) => handleRoleChange(value as UserRole)}
                className="flex space-x-2"
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
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                {...register('password', { required: 'Password is required' })}
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
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
            
            <div className="text-center">
              <Button 
                type="button"
                variant="outline"
                onClick={handleDemoLogin}
                className="w-full mt-2"
              >
                Try Demo Account
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Use demonstration account for {selectedRole} role
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <div className="text-center text-sm">
            Don't have an account?{' '}
            <Link 
              to={`/register${roleParam ? `?role=${roleParam}` : ''}`} 
              className="text-foodbridge-primary font-medium hover:underline"
            >
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
