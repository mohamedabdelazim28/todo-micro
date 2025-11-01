import React, { useState, useEffect } from 'react'

export default function AddEditModal({ mode = 'add', initial = {}, onClose, onSave }){
  const [form, setForm] = useState({
    title: '',
    desc: '',
    difficulty: 'easy',
    status: 'pending',
    due: ''
  })

  useEffect(()=>{
    if(initial && Object.keys(initial).length){
      setForm({...form, ...initial})
    } else {
      setForm({title:'', desc:'', difficulty:'easy', status:'pending', due:''})
    }
  }, [initial])

  function saveAndClose(e){
    e.preventDefault()
    if(!form.title.trim()) return
    onSave(form)
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <header className="modal-header">
          <h3>{mode === 'add' ? 'Add New Task' : 'Edit Task'}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>

        <form className="modal-body" onSubmit={saveAndClose}>
          <label className="field">
            <div className="label">Task title</div>
            <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="e.g. Create wireframe" />
          </label>

          <label className="field">
            <div className="label">Description</div>
            <textarea value={form.desc} onChange={e=>setForm({...form, desc:e.target.value})} placeholder="Short description" />
          </label>

          <div className="row">
            <label className="field small">
              <div className="label">Difficulty</div>
              <select value={form.difficulty} onChange={e=>setForm({...form, difficulty:e.target.value})}>
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </label>

            <label className="field small">
              <div className="label">Status</div>
              <select value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
                <option value="pending">pending</option>
                <option value="in progress">in progress</option>
                <option value="completed">completed</option>
              </select>
            </label>

            <label className="field small">
              <div className="label">Due date</div>
              <input type="date" value={form.due} onChange={e=>setForm({...form, due:e.target.value})} />
            </label>
          </div>

          <footer className="modal-footer">
            <button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn primary">{mode === 'add' ? 'Add Task' : 'Save Changes'}</button>
          </footer>
        </form>
      </div>
    </div>
  )
}
