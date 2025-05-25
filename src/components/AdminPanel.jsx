import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Users from './Users'
import MapView from './MapView'
import Categories from './Categories'
import Analytics from './Analytics'
import Reports from './Reports'
import Settings from './Settings'

function AdminPanel() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const navigate = useNavigate()

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.body.classList.toggle('light-mode')
  }

  return (
    <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="map" element={<MapView />} />
          <Route path="categories" element={<Categories />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />} />
        </Routes>
      </main>
    </div>
  )
}

export default AdminPanel