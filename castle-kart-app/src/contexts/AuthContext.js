import { useContext, useEffect } from "react";
import { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken || null;
  });

  const navigate = useNavigate();

  const signUp = async (email, password, firstName, lastName) => {
    try {
      const response = await axios.post('/api/auth/signup', {
        firstName,
        lastName,
        email,
        password
      });
      const { encodedToken, user } = response.data;
      setToken(encodedToken);
      setUser(user);
      saveUserAndTokenToLocalStorage(user, encodedToken);
      navigate("/");
    } catch (error) {
      handleAuthError(error, "Failed to sign up");
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      console.log(response)
      const { encodedToken, foundUser: user } = response.data;

      if (user && user.email === email) {
        setToken(encodedToken);
        setUser(user);
        saveUserAndTokenToLocalStorage(user, encodedToken);
        navigate("/");
        toast("Login successful", {
          position: 'bottom-right',
          autoClose: 2000,
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      handleAuthError(error, "Invalid email or password");
    }
  };

  const signOutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const saveUserAndTokenToLocalStorage = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleAuthError = (error, defaultMessage) => {
    console.error("Authentication error:", error);
    const errorMessage = error.response?.data?.message || defaultMessage;
    toast(errorMessage, {
      position: 'bottom-right',
      autoClose: 2000,
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return {
    signUp,
    signIn,
    signOut: signOutUser,
    user,
    token
  };
}

export default AuthProvider;
