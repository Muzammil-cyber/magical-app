import { useState } from 'react';



const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticateUser = () => {
        const isAuthenticated = document.cookie.includes('auth');
        setIsAuthenticated(isAuthenticated);
    };

    return {
        isAuthenticated,
        authenticateUser,
    };
};

export default useAuth;