
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (userData: Partial<User>, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Donor',
    email: 'donor@example.com',
    phone: '1234567890',
    role: 'donor',
    address: '123 Main St, City',
    location: { lat: 40.7128, lng: -74.006 }
  },
  {
    id: '2',
    name: 'Food Rescue NGO',
    email: 'ngo@example.com',
    phone: '0987654321',
    role: 'ngo',
    organizationName: 'Food Rescue',
    organizationDescription: 'We rescue surplus food and distribute to those in need',
    address: '456 Center Ave, City',
    location: { lat: 40.7148, lng: -74.0025 }
  },
  {
    id: '3',
    name: 'Sam Volunteer',
    email: 'volunteer@example.com',
    phone: '5556667777',
    role: 'volunteer',
    address: '789 Side St, City',
    location: { lat: 40.7138, lng: -74.0045 }
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('foodbridge_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    // Mock authentication
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email and role
      const user = MOCK_USERS.find(u => u.email === email && u.role === role);
      
      if (!user) {
        throw new Error('Invalid credentials or user not found');
      }
      
      // Store user in context and localStorage
      setCurrentUser(user);
      localStorage.setItem('foodbridge_user', JSON.stringify(user));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (userData: Partial<User>, password: string) => {
    // Mock registration
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone,
        role: userData.role || 'donor',
        address: userData.address,
        location: userData.location,
        organizationName: userData.organizationName,
        organizationDescription: userData.organizationDescription
      };
      
      // Store user in context and localStorage
      setCurrentUser(newUser);
      localStorage.setItem('foodbridge_user', JSON.stringify(newUser));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    // Mock logout
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear user from context and localStorage
      setCurrentUser(null);
      localStorage.removeItem('foodbridge_user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
