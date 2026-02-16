import React from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import AddEntry from './AddEntry'
import Home from './Home'
import ViewEntry from './ViewEntry'
import EditEntry from './EditEntry'
import Landing from './Landing'

function AppContent() {
  const navigate = useNavigate()
  return (
    <div className="app-root">
      <header className="app-header">
        <nav className="app-nav">
          <button className="nav-btn" onClick={() => navigate('/')}>Home</button>
          <Link to="/add" className="nav-btn">Add</Link>
        </nav>
      </header>
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/list" element={<Home />} />
            <Route path="/add" element={<AddEntry />} />
            <Route path="/view/:id" element={<ViewEntry />} />
            <Route path="/edit/:id" element={<EditEntry />} />
          </Routes>
        </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
