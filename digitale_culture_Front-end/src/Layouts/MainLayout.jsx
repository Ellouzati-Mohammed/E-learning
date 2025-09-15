import React from "react";

import {AppMain,AppContainer} from '../styles/AppStyle.js'
import Navbar from "../components/NavBar.jsx";
import Sidebar from "../components/SideBar.jsx";
import { useLocation } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import ChatBotWidget from "../components/ChatBotWidget.jsx";

const MainLayout = ({ children }) => {
    const location = useLocation();
    const { role } = useAuth();

    const hideLayout = ["/signup", "/signin"].includes(location.pathname.toLowerCase());
  return (
    <div className="App" style={AppContainer}>
      {!hideLayout &&<header className="App-header">
        <Navbar />
      </header>}
      <main style={AppMain}>
      {!hideLayout && role !== 'admin' && <Sidebar />}
      {!hideLayout &&<ChatBotWidget /> }
      
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
