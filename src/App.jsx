import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import TaskList from './components/TaskList'
import Profile from './components/Profile'

export default function App(){
  return (
    <div className="app-root">
      <header className="app-header">
        <Link to="/profile" className="profile-thumb-link" aria-label="Profile">
          <img src="/src/assets/profile.png" alt="profile" className="profile-thumb"/>
        </Link>
        <h1 className="app-brand">Task Manager</h1>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<TaskList/>} />
          <Route path="/profile" element={<Profile/>} />
        </Routes>
      </main>

    </div>
  )
}
