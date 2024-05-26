import React, { useState } from 'react'
import './LoginComponent.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginComponent() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validate = () => {
    let errors = {}
    if (!formData.email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid'
    }
    if (!formData.password) {
      errors.password = 'Password is required'
    }
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true)
      axios
                .post('http://localhost:3500/api/v1/user/login', formData, { withCredentials: true })
                .then((response) => {
                    if(response.status == 200) {
                      setIsSubmitting(false)
                      console.log(response)
                      alert('User Logged in Successfully')
                      navigate('/')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
    }
  }

  return (
    <div className='container'>
      <div className='log-in-form'>
        <div className='form-container'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Email</label>
              <input
                type='email'
                name='email'
                placeholder='Email id'
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className='error-message'>{errors.email}</span>
              )}
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className='error-message'>{errors.password}</span>
              )}
            </div>
            <button
              type='submit'
              className='login-submit-button'
              disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Login'}
            </button>
            {submitMessage && (
              <span className='submit-message'>{submitMessage}</span>
            )}
            <span className='existing-account'>
              Don't have an account? <span className='create_one'>Create one!</span>
            </span>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginComponent
