import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'

// Components
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import AdminPanel from './components/AdminPanel.jsx'

// Pages
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import ServiceDetails from './pages/ServiceDetails.jsx'
import UserProfile from './pages/UserProfile.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Account from './pages/Account.jsx'
import MyServices from './pages/MyServices.jsx'

function App() {
  const { isAuthenticated } = useAuth()
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />
    }
    return children
  }

  // Admin protected route
  const AdminProtectedRoute = ({ children }) => {
    if (!isAdminAuthenticated) {
      return <Navigate to="/admin_log" replace />
    }
    return children
  }

  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin_log" element={
        <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
      } />
      <Route path="/admin/*" element={
        <AdminProtectedRoute>
          <AdminPanel />
        </AdminProtectedRoute>
      } />

      {/* Website Routes */}
      <Route path="/*" element={
        <div className="flex flex-col min-h-screen website-container">
          <Navbar />
          <main className="flex-grow mt-28">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/service/:id" element={<ServiceDetails />} />
              <Route path="/user/:username" element={<UserProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="/my-services" element={
                <ProtectedRoute>
                  <MyServices />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      } />
    </Routes>
  )
}

export default App