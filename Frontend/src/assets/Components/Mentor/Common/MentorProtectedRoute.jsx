import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { verifyMentorToken } from '../services/authService';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const MentorProtectedRoute = () => {
  const [isValidating, setIsValidating] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsValidating(true);
        
        // Check if user is logged in and is a mentor
        if (!user) {
          navigate('/mentor/login');
          toast.info('Please login to access mentor dashboard');
          return;
        }
        
        // Additional verification for mentor role
        const isMentor = await verifyMentorToken();
        if (!isMentor) {
          navigate('/');
          toast.error('You do not have mentor privileges');
          return;
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        navigate('/mentor/login');
        toast.error('Session expired. Please login again');
      } finally {
        setIsValidating(false);
      }
    };

    checkAuth();
  }, [user, navigate]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <Loader size="lg" />
          <p className="mt-4 text-lg font-medium text-gray-700">
            Verifying mentor credentials...
          </p>
        </motion.div>
      </div>
    );
  }

  // If all checks pass, render the protected route
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Outlet />
    </motion.div>
  );
};

export default MentorProtectedRoute;