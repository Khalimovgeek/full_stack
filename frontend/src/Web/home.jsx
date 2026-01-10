import React, { useState, useEffect } from 'react';

// If using the config file:
// import { API_ENDPOINTS, apiCall } from '../config/api';

export default function HomePage() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
  title: '',
  description: '',
  completed: false
  });


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const API_BASE_URL = 'http://127.0.0.1:8000';
    
    try {
      const token = localStorage.getItem("access");
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Tasks fetched successfully:', data);
      setTasks(data);
      
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      console.log('Using mock data instead');
      
      // Using mock data as fallback
      setTasks([
        { id: 1, title: 'Complete project report', description: 'Finish the Q1 report', status: 'pending' },
        { id: 2, title: 'Review team feedback', description: 'Go through all feedback', status: 'completed' },
        { id: 3, title: 'Update presentation', description: 'Add new slides', status: 'pending' }
      ]);
    }
  };

  const handleSubmit = async () => {
    try {
      const API_BASE_URL = 'http://127.0.0.1:8000'; // Change this to your backend URL
      
      if (editingTask) {
        // Update task
        const token = localStorage.getItem("access");
        const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${editingTask.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const updatedTask = await response.json();
        setTasks(tasks.map(task => 
          task.id === editingTask.id ? updatedTask : task
        ));
      } else {
        // Create task
        const token = localStorage.getItem("access");
        const response = await fetch(`${API_BASE_URL}/api/v1/tasks/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const newTask = await response.json();
        setTasks([...tasks, newTask]);
      }
      
      closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      const API_BASE_URL = 'http://127.0.0.1:8000'; // Change this to your backend URL
      const token = localStorage.getItem("access");
      const response = await fetch(`${API_BASE_URL}/api/v1/tasks/${id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  const openModal = (task = null) => {
    if (task) {
      setEditingTask(task);
      setFormData({
        title: task.title,
        description: task.description,
        completed: task.completed
      });

    } else {
      setEditingTask(null);
      setFormData({ title: '', description: '', completed: false });

    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', completed: false });

  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '12px'
      }}>
        <h1 style={{ color: '#1e3c72', fontWeight: 'bold', fontSize: '32px', margin: 0 }}>
          Task Manager
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => window.location.href = '/user-dashboard'}
            style={{
              padding: '10px 20px',
              background: '#2a5298',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.target.style.background = '#1e3c72'}
            onMouseLeave={(e) => e.target.style.background = '#2a5298'}
          >
            Dashboard
          </button>
          <button
            onClick={() => window.location.href = '/login'}
            style={{
              padding: '10px 20px',
              background: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
            onMouseLeave={(e) => e.target.style.background = '#dc2626'}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Add Task Button */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => openModal()}
          style={{
            padding: '12px 24px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '16px'
          }}
          onMouseEnter={(e) => e.target.style.background = '#059669'}
          onMouseLeave={(e) => e.target.style.background = '#10b981'}
        >
          + Add New Task
        </button>
      </div>

      {/* Tasks Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {tasks.map(task => (
          <div key={task.id} style={{
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start'
            }}>
              <h3 style={{ color: '#1e3c72', margin: 0, fontSize: '20px' }}>
                {task.title}
              </h3>
              <span style={{
                padding: '4px 12px',
                background: task.completed ? '#10b981' : '#f59e0b',
                color: 'white',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                {task.completed === false ? "pending" : "completed"}
              </span>
            </div>
            
            <p style={{ color: '#666', margin: 0, fontSize: '14px' }}>
              {task.description}
            </p>
            
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '12px'
            }}>
              <button
                onClick={() => openModal(task)}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: '#2a5298',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.background = '#1e3c72'}
                onMouseLeave={(e) => e.target.style.background = '#2a5298'}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  flex: 1,
                  padding: '8px',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.background = '#b91c1c'}
                onMouseLeave={(e) => e.target.style.background = '#dc2626'}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={closeModal}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '500px'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: '#1e3c72', marginBottom: '20px' }}>
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', color: '#666', marginBottom: '8px', fontSize: '14px' }}>
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#666', marginBottom: '8px', fontSize: '14px' }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    minHeight: '100px',
                    boxSizing: 'border-box',
                    fontFamily: 'Arial, sans-serif'
                  }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', color: '#666', marginBottom: '8px', fontSize: '14px' }}>
                  Status
                </label>
                
                <select
                  value={String(formData.completed)}   // convert boolean → string
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      completed: e.target.value === "true" // string → boolean
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="false">Pending</option>
                  <option value="true">Completed</option>
                </select>


              </div>
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#059669'}
                  onMouseLeave={(e) => e.target.style.background = '#10b981'}
                >
                  {editingTask ? 'Update' : 'Create'}
                </button>
                <button
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#4b5563'}
                  onMouseLeave={(e) => e.target.style.background = '#6b7280'}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}