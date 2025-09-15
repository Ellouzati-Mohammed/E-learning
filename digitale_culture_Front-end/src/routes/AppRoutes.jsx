import { Routes, Route } from "react-router-dom";
import HomeScreen from "../screens/HomeScreen.jsx";
import CoursDomain from "../screens/CoursDomainPage";
import Activitie from "../screens/Activities";
import Profile from "../screens/Profile";
import SignUp from "../screens/auth/SignUp.jsx";
import SignIn from "../screens/auth/SignIn.jsx";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DomainsCours/:DomainId"
        element={
          <ProtectedRoute>
            <CoursDomain />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DomainsCours/Activities/:CoursId"
        element={
          <ProtectedRoute>
            <Activitie />
          </ProtectedRoute>
        }
      />
     
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignIn" element={<SignIn />} />
    </Routes>
  );
};

export default AppRoutes;
