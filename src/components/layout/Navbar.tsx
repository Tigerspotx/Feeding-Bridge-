
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Menu, User, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Sheet,
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  const dashboardLink = () => {
    if (!currentUser) return null;
    
    switch (currentUser.role) {
      case 'donor':
        return { name: 'Donor Dashboard', path: '/donor-dashboard' };
      case 'ngo':
        return { name: 'NGO Dashboard', path: '/ngo-dashboard' };
      case 'volunteer':
        return { name: 'Volunteer Dashboard', path: '/volunteer-dashboard' };
      default:
        return null;
    }
  };

  const dashboard = dashboardLink();

  return (
    <nav className="bg-white shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-foodbridge-primary">FeedingBridge</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-foodbridge-primary transition"
            >
              {link.name}
            </Link>
          ))}
          {dashboard && (
            <Link
              to={dashboard.path}
              className="text-foodbridge-primary font-medium hover:text-foodbridge-secondary transition"
            >
              {dashboard.name}
            </Link>
          )}
        </div>

        {/* Auth Buttons / User Menu */}
        <div className="hidden md:block">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span>{currentUser.name}</span>
                  <User size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="text-sm">
                  Signed in as <span className="font-medium ml-1">{currentUser.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm">
                  Role: <span className="font-medium ml-1 capitalize">{currentUser.role}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {dashboard && (
                  <DropdownMenuItem asChild>
                    <Link to={dashboard.path}>Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="ml-2">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg py-2 px-4 hover:bg-gray-100 rounded-md"
                >
                  {link.name}
                </Link>
              ))}
              {dashboard && (
                <Link
                  to={dashboard.path}
                  className="text-lg py-2 px-4 text-foodbridge-primary font-medium hover:bg-gray-100 rounded-md"
                >
                  {dashboard.name}
                </Link>
              )}

              {currentUser ? (
                <>
                  <div className="border-t my-2"></div>
                  <div className="px-4 py-2">
                    <p className="text-sm text-gray-500">Signed in as</p>
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-gray-500 mt-1 capitalize">Role: {currentUser.role}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="text-lg py-2 px-4 hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-lg py-2 px-4 text-red-600 hover:bg-gray-100 rounded-md text-left flex items-center gap-2"
                  >
                    <LogOut size={18} />
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t my-2"></div>
                  <Link
                    to="/login"
                    className="text-lg py-2 px-4 hover:bg-gray-100 rounded-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-lg py-2 px-4 text-foodbridge-primary font-medium hover:bg-gray-100 rounded-md"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
