import React from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  return (
    <div className="container landing-container">
      <h1 className="landing-title">📋 Data Manager</h1>
      <p className="subtitle">A simple and elegant way to manage your data entries with Google Sheets integration</p>

      <div className="nav-links">
        <Link to="/add" className="nav-link">
          <span className="icon">➕</span>
          Add New Entry
        </Link>
        <Link to="/list" className="nav-link secondary">
          <span className="icon">👁️</span>
          View All Entries
        </Link>
      </div>

      <div className="feature-list">
        <h3>Features</h3>
        <ul>
          <li>Add new entries with name and age</li>
          <li>View all your stored entries</li>
          <li>Edit existing entries anytime</li>
          <li>Delete entries you no longer need</li>
          <li>Data synced with Google Sheets</li>
          <li>Mobile-friendly interface</li>
        </ul>
      </div>
    </div>
  )
}
