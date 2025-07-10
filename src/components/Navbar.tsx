import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageSquare, MapPin, Home, LogOut, Lightbulb, BarChart3, Users, MapIcon } from 'lucide-react';
import LogoutDialog from './LogoutDialog';
import { useDashboardStore } from '../store/dashboardStore';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const setCurrentUser = useDashboardStore(state => state.setCurrentUser);
  const [navbarHeight, setNavbarHeight] = useState(64); // Default height

  // Calculate navbar height based on content
  useEffect(() => {
    // Always set a consistent height for editor mode
    const isEditorMode = location.pathname.includes('/editor') || location.pathname === '/encuestas';
    setNavbarHeight(isEditorMode ? 80 : 64); // 80px for editor (includes tabs), 64px for admin
  }, [location.pathname]);

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    setCurrentUser(null);
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Determine if we're in editor mode
  const isEditorMode = location.pathname.includes('/editor');

  const dashboardPath = '/dashboard';

  // Dashboard sub-tabs
  const dashboardTabs = [
    { name: 'Adversarios', icon: Users, path: `${dashboardPath}?tab=adversarios` },
    { name: 'Cochabamba', icon: MapIcon, path: `${dashboardPath}?tab=cochabamba` }
  ];

  const navItems = [
    { name: 'Comunicación', icon: MessageSquare, path: '/comunicacion' },
    { name: 'Territorial', icon: MapPin, path: '/territorial' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col h-full">
            {/* Main navbar row */}
            <div className="flex items-center justify-between h-16">
              {/* Regular navigation items */}
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-2 px-5 h-full text-sm font-medium transition-all duration-300 relative ${
                      isActive(item.path)
                        ? 'text-primary'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                    {isActive(item.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                  </Link>
                );
              })}
            </div>
            
            {/* Dashboard sub-tabs row - only visible on dashboard pages */}
            {(location.pathname.includes('/dashboard') || location.pathname === '/encuestas') && (
              <div className="flex items-center justify-center h-4 border-t border-primary/10">
                <div className="flex items-center">
                  {dashboardTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActiveTab = tab.path.startsWith('/encuestas') 
                      ? location.pathname === '/encuestas'
                      : location.pathname.includes('/dashboard') && 
                        (location.search.includes('tab=' + tab.path.split('=')[1]) || 
                        (tab.path.includes('adversarios') && !location.search));
                    return (
                      <Link
                        key={tab.name}
                        to={tab.path}
                        className={\`flex items-center gap-1 px-3 h-4 text-xs font-medium transition-all duration-300 relative ${
                          isActiveTab
                            ? 'text-primary'
                            : 'text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        <Icon className="w-3 h-3" />
                        {tab.name}
                        {isActiveTab && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Right side - Logout Button */}
            <button
              onClick={() => setIsLogoutDialogOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-md rounded-lg hover:bg-card hover:shadow-neon transition-all duration-300"
            >
              <LogOut className="w-5 h-5 text-primary group-hover:animate-pulse-slow" />
              <span className="text-gray-400 group-hover:text-white">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Centered Logout Dialog */}
      <LogoutDialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}