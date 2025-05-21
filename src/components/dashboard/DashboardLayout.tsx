
import React, { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
}

const SidebarLink = ({ to, icon, children, isActive = false }: SidebarLinkProps) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive
        ? 'bg-foodbridge-primary text-white'
        : 'hover:bg-gray-100'
    }`}
  >
    <span className="text-xl">{icon}</span>
    <span>{children}</span>
  </Link>
);

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
  sidebarLinks: {
    to: string;
    icon: React.ReactNode;
    label: string;
  }[];
  activeLink: string;
}

const DashboardLayout = ({ title, children, sidebarLinks, activeLink }: DashboardLayoutProps) => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-white">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-foodbridge-primary">FeedingBridge</span>
          </Link>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500">Logged in as:</p>
          <p className="font-medium">{currentUser?.name}</p>
          <p className="text-sm text-gray-500 capitalize">{currentUser?.role}</p>
        </div>
        <nav className="flex-grow p-4 space-y-1">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.to}
              to={link.to}
              icon={link.icon}
              isActive={link.to === activeLink}
            >
              {link.label}
            </SidebarLink>
          ))}
        </nav>
        <div className="p-4 border-t mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{title}</h1>
          <div className="md:hidden">
            {/* Mobile menu button */}
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
