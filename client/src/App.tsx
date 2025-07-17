import { useState } from 'react'
import { LoginForm } from './components/userAuth'
import { Button } from './components/common'
import { type User } from './types/user'
import './App.css'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [showLogin, setShowLogin] = useState(false)

  const handleLogin = (userData: User) => {
    setUser(userData)
    setShowLogin(false)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Example Web Application</h1>
        <p>Built with Vite + React + TypeScript</p>
      </header>

      <main className="app-main">
        {user ? (
          <div className="user-dashboard">
            <h2>Welcome, {user.firstName} {user.lastName}!</h2>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            <Button onClick={handleLogout} variant="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <div className="auth-section">
            {showLogin ? (
              <LoginForm 
                onLogin={handleLogin} 
                onCancel={() => setShowLogin(false)}
              />
              
            ) : (
              <div className="welcome-section">
                <h2>Welcome to Our Application</h2>
                <p>Please login to access your dashboard</p>
                <Button onClick={() => setShowLogin(true)}>
                  Login
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2025 Example Web App. Built with modern web technologies.</p>
      </footer>
    </div>
  )
}

export default App
