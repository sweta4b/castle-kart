import { useContext } from "react";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    console.log(localStorage.getItem('user'))
    console.log(storedUser)  
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem("token");
    return storedToken ? storedToken: null;
  });

  const navigate = useNavigate();

  const signUp = async (email, password, firstName, lastName) => {

    try {
      const response = await axios.post('/api/auth/signup', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      console.log(response.data)
      const { encodedToken, user } = response.data;
      setToken(encodedToken);
      setUser(user);
      localStorage.setItem("token", encodedToken);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (error) {
      console.error("Sign up failed", error);
      throw new Error("Failed to sign up");
    }
  };

  const signIn = async (email, password) => {

    try {
      const response = await axios.post('/api/auth/login', {
        email: email,
        password: password
      });

      const { encodedToken, foundUser: user } = response.data;

      if (user && user.email === email) {
        setToken(encodedToken);
        setUser(user);
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert("Invalid email or password");
    }
  };

  const signOutUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
