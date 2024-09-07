import { useState, useEffect } from 'react';

// Example implementation for demo purposes
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user data from API or localStorage
    // Example data retrieval
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData) {
      setIsAuthenticated(true);
      setUserRole(userData.role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  return { isAuthenticated, userRole };
};
