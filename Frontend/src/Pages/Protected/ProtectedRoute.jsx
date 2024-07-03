// ProtectedRoute.js
import React from 'react';
import { Navigate,useLocation  } from 'react-router-dom';
import { isAuthenticated } from '../../services/auth';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const location = useLocation();
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login"  state={{ from: location, message: 'You must log in first!' }} />;
};

export default ProtectedRoute;
