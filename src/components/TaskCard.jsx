import React from 'react'

export default function TaskCard({ task, onEdit, onDelete }){
  return (
    <div className={`task-card ${task.difficulty}`}>
      <div className="card-top">
        <h3>{task.title}</h3>
        <div className="card-actions">
          <button className="icon" onClick={()=>onEdit(task)} title="Edit">✎</button>
          <button className="icon" onClick={()=>onDelete(task.id)} title="Delete">🗑</button>
        </div>
      </div>

      <p className="desc">{task.desc}</p>
      <div className="badges">
        <span className={`badge diff ${task.difficulty}`}>{task.difficulty}</span>
        <span className={`badge status ${task.status.replace(' ', '-')}`}>{task.status}</span>
        <span className="due">Due: {task.due || '...'}</span>
      </div>
    </div>
  )
}
