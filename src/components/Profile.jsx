import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile(){
  const nav = useNavigate()
  const user = {
    name: 'Fatma Mohamed',
    title: 'UI/UX Designer',
    bio: 'Designing experiences that make technology simple and enjoyable for everyone.',
    email: 'fatma.mo@gmail.com',
    phone: '+20 01067936684',
    website: 'www.fatma.com',
    location: 'Mansoura'
  }

  return (
    <section className="profile-page">
      <div className="profile-card">
        <div className="profile-top">
          <div className="avatar-wrap">
            <img src="/src/assets/profile.png" alt="avatar" className="avatar" />
            <button className="avatar-edit">+</button>
          </div>
          <div className="profile-info">
            <h2>{user.name}</h2>
            <p className="job">{user.title} ............</p>
            <p className="bio">{user.bio}</p>

            <div className="contacts">
              <div>✉ {user.email}</div>
              <div>📞 {user.phone}</div>
              <div>🔗 {user.website}</div>
              <div>📍 {user.location}</div>
            </div>

            <div className="profile-actions">
              <button className="btn primary">Edit Profile</button>
              <button className="btn ghost" onClick={()=>nav('/')}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
