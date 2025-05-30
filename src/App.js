import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import Login from './components/Auth/Login';
import Home from './components/Home/HeroSection';
import JobsList from './components/Jobs/JobsList';
import JobDetails from './components/Jobs/JobDetails';
import './assets/styles/global.css';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/jobs"
                element={
                  <ProtectedRoute>
                    <JobsList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jobs/:id"
                element={
                  <ProtectedRoute>
                    <JobDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;