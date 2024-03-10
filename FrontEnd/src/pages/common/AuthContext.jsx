import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();
// :(
export const AuthProvider = ({ children }) => {
  const initialUserRole = Cookies.get('userRole') || null;
  const storedToken = Cookies.get('token') || null;
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(initialUserRole);
  const [userToken, setUserToken] = useState(storedToken);

  // Check if the user role is stored in cookies when the component mounts
  useEffect(() => {
    try {
      const storedUserRole = Cookies.get('userRole');
      const token = Cookies.get('token');
      if (storedUserRole && token) {
        setUserRole(storedUserRole);
        setUserToken(token);
      } else {
        toast.error('Please Login');
      }
    } catch (error) {
      console.error('Error retrieving user data from cookies:', error);
      toast.error('An error occurred. Please try again.');
    }

  }, []);

  const login = (role, token) => {
    setUserRole(role);
    setUserToken(token)
    // Save the user role in cookies
    Cookies.set('userRole', role, { expires: 1, path: '/' });
    Cookies.set('token', token, { expires: 1, path: '/' });
  };

  const logout = () => {
    setUserRole(null);
    setUserToken(null);
    // Remove the user role from cookies
    Cookies.remove('userRole', { path: '/' });
    Cookies.remove('token', { path: '/' });
    Cookies.remove('pvt', { path: '/' });
    toast.warning('Logout Success!')
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout, userToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
