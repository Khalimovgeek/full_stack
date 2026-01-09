import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/v1/auth/register/", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail || "Signup failed. Try again."
      );
    }
  };


  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      margin: 0,
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{
          fontWeight: 'bold',
          fontSize: '32px',
          marginBottom: '30px',
          padding: '15px 30px',
          borderRadius: '8px',
          width: '100%',
          textAlign: 'center',
          margin: '0 0 30px 0'
        }}>
          Sign Up
        </h1>
        
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <label htmlFor="username" style={{
                color: '#555',
                fontSize: '14px',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}>
                username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                style={{
                  width: '100%',
                  height: '45px',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#333',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2a5298';
                  e.target.style.boxShadow = '0 0 0 3px rgba(42, 82, 152, 0.1)';
                  e.target.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <label htmlFor="email" style={{
                color: '#555',
                fontSize: '14px',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}>
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  height: '45px',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#333',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2a5298';
                  e.target.style.boxShadow = '0 0 0 3px rgba(42, 82, 152, 0.1)';
                  e.target.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <label htmlFor="password" style={{
                color: '#555',
                fontSize: '14px',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}>
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  width: '100%',
                  height: '45px',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#333',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2a5298';
                  e.target.style.boxShadow = '0 0 0 3px rgba(42, 82, 152, 0.1)';
                  e.target.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <label htmlFor="confirmPassword" style={{
                color: '#555',
                fontSize: '14px',
                textTransform: 'capitalize',
                fontWeight: '500'
              }}>
                confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  width: '100%',
                  height: '45px',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#333',
                  fontSize: '14px',
                  transition: 'all 0.3s',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2a5298';
                  e.target.style.boxShadow = '0 0 0 3px rgba(42, 82, 152, 0.1)';
                  e.target.style.outline = 'none';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e5e7eb';
                  e.target.style.boxShadow = 'none';
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
              />
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              height: '45px',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
              marginBottom: '15px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 5px 15px rgba(30, 60, 114, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
            onMouseDown={(e) => {
              e.target.style.transform = 'translateY(0)';
            }}
            onMouseUp={(e) => {
              e.target.style.transform = 'translateY(-2px)';
            }}
          >
            Sign Up
          </button>

          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#666'
          }}>
            Already have an account?{' '}
            <a 
              href="/login" 
              style={{
                color: '#2a5298',
                textDecoration: 'none',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              Login here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}