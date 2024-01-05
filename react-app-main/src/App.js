import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ElementHomePage from './components/0_homepage';
import ElementInsightsPage from './components/8_insightspage';
import ReportCrimeForm from './components/5_ReportCrime'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './common/navigation';
import LoginPage from './components/1_loginpage';
import Admin from './components/6_admin_page';
import SignUpPage from './components/2_signuppage';
import ElementThankyouPage from './components/9_thankyoupage';
import { UserProvider } from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <UserProvider>
    <Router> 
      <div className="App">
      <ToastContainer /> 
        <Navigation />
        <Routes>
          <Route exact path="/" element={<ElementHomePage />} />
          <Route exact path="/insights" element={<ProtectedRoute><ElementInsightsPage/></ProtectedRoute>}/>
          <Route exact path="/reportacrime" element={<ProtectedRoute><ReportCrimeForm /></ProtectedRoute>} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>}/>
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/thankyou" element={<ProtectedRoute><ElementThankyouPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
    </UserProvider>
  );
}

export default App;
