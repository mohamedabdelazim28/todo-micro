import React, { useState, useMemo, useEffect } from 'react'
import TaskCard from './TaskCard'
import AddEditModal from './AddEditModal'

const STORAGE_KEY = 'todo_app_tasks_v1'

const initialTasks = [
  { id: 1, title: 'Task 1', desc: 'create wireframe', difficulty: 'easy' , status: 'completed', due: '2025-11-10' },
  { id: 2, title: 'Task 2', desc: 'design UI', difficulty: 'medium', status: 'in progress', due: '2025-11-12' },
  { id: 3, title: 'Task 3', desc: 'write docs', difficulty: 'hard', status: 'pending', due: '2025-11-20' },
]

export default function TaskList() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return initialTasks
      return JSON.parse(raw)
    } catch (e) {
      console.error('Failed to load tasks from localStorage', e)
      return initialTasks
    }
  })
  const [query, setQuery] = useState('')

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e)
    }
  }, [tasks])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return tasks
    return tasks.filter(t =>
      (t.title || '').toLowerCase().includes(q) ||
      (t.desc || '').toLowerCase().includes(q) ||
      (t.status || '').toLowerCase().includes(q) ||
      (t.difficulty || '').toLowerCase().includes(q)
    )
  }, [query, tasks])

  function openAdd() {
    setModalMode('add')
    setEditingTask(null)
    setModalOpen(true)
  }

  function openEdit(task) {
    setModalMode('edit')
    setEditingTask(task)
    setModalOpen(true)
  }

  function handleSave(form) {
    if (modalMode === 'add') {
      const newTask = { ...form, id: Date.now() }
      setTasks(prev => [newTask, ...prev])
    } else if (modalMode === 'edit' && editingTask) {
      setTasks(prev => prev.map(t => t.id === editingTask.id ? { ...t, ...form } : t))
    }
    setModalOpen(false)
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <section className="task-page">
      <div className="task-container">
        <h2>Task List</h2>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
          <input
            className="search"
            placeholder="Search tasks"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="add-btn" onClick={openAdd}>Add New Task</button>
        </div>

        <div className="grid">
          {filtered.length === 0 ? (
            <p className="empty">No tasks. Add your first task!</p>
          ) : (
            filtered.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEdit}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>

      {modalOpen && (
        <AddEditModal
          mode={modalMode}
          initial={modalMode === 'edit' ? editingTask : {}}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </section>
  )
}
