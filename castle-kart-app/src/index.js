import React from "react";
import ReactDOM from "react-dom";
import{BrowserRouter as Router} from "react-router-dom"
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppProvider, {AppContext} from "./contexts/AppContext";
import  AuthProvider  from "./contexts/AuthContext";

export {AppContext}


// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <AuthProvider>
      <AppProvider> 
         <App />
    </AppProvider>
    </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
)