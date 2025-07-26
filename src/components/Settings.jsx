import { useState } from 'react'

function Settings() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const handlePasswordChange = (e) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }

    if (currentPassword !== 'admin') {
      setMessage({ type: 'error', text: 'Current password is incorrect' })
      return
    }

    // Update password logic here
    setMessage({ type: 'success', text: 'Password updated successfully' })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="admin-page-container">
      <h1 className="page-title">Settings</h1>
      
      <div className="card" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <h2 className="text-xl mb-4">Change Password</h2>
        {message.text && (
          <div className={`mb-4 p-3 rounded ${
            message.type === 'error' ? 'bg-red-500/20' : 'bg-green-500/20'
          }`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handlePasswordChange} className="settings-form">
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="button">
            Change Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings