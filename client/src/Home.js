import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Register } from './components/NewComponets/Register';
import { useMetaMask } from './context/MetaMaskContext'; // Import MetaMask context

export const Home = () => {
    const { account, isRegistered, user } = useMetaMask(); // Access context values
    const navigate = useNavigate(); // Initialize useNavigate hook



    useEffect(() => {
        // Check if the user is registered
        if (isRegistered) {
          if (user?.userName) {
            // Check if user has a valid username
            if (user.userType === 'patient') {
              navigate('/patient'); // Navigate to patient dashboard
            } else if (user.userType === 'doctor') {
              navigate('/doctor'); // Navigate to doctor dashboard
            }
          }
        }
      }, [isRegistered, user, navigate,account]);
    
      return (
        <div>
          {/* If user is not registered, show Register component */}
          {!isRegistered ? (
            <Register accountAddress={account}/>
          ) : (
            // If user is registered, the useEffect will navigate to the correct route
            <div>Redirecting...</div> // Placeholder until navigation happens
          )}
        </div>
      );
};
