import React, { useState } from 'react'
import './SignUpComponent.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUpComponent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: {
          countryCode: '+91',
          number: '',
        },
        role: '',
    })

    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitMessage, setSubmitMessage] = useState('')
    const [isBuyer, setIsBuyer] = useState(false)
    const [isSeller, setIsSeller] = useState(false)

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'countryCode' || name === 'number') {
          setFormData({
              ...formData,
              phone: {
                  ...formData.phone,
                  [name]: value,
              },
          })
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    const handleCheckboxChange = (type) => {
        if (type === 'buyer') {
            setIsBuyer(!isBuyer)
            setIsSeller(false)
            setFormData({ ...formData, role: isBuyer ? '' : 'buyer' })
        } else {
            setIsSeller(!isSeller)
            setIsBuyer(false)
            setFormData({ ...formData, role: isSeller ? '' : 'seller' })
        }
        setErrors({ ...errors, role: '' })
    }

    const validate = () => {
        let errors = {}
        if (!formData.firstName) errors.firstName = 'First name is required'
        if (!formData.lastName) errors.lastName = 'Last name is required'
        if (!formData.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid'
        }
        if (!formData.password) {
            errors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters'
        }
        if (!formData.phone.countryCode) {
          errors.countryCode = 'Country code is required'
        } else if (!/^\+\d{1,3}$/.test(formData.phone.countryCode)) {
            errors.countryCode = 'Country code must be in the format +123'
        }
        if (!formData.phone.number) {
            errors.number = 'Phone number is required'
        } else if (!/^\d{10}$/.test(formData.phone.number)) {
            errors.number = 'Phone number must be exactly 10 digits'
        }
        if (!formData.role) errors.role = 'user role is required'
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        setErrors(validationErrors)
        console.log(formData)
        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true)
            axios
                .post('http://localhost:3500/api/v1/user/signup', formData)
                .then((response) => {
                    if(response.status == 201) {
                      setIsSubmitting(false)
                      alert('User Created Successfully')
                      navigate('/')
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
    return (
        <>
            <div className='container'>
                <div className='sign-up-form'>
                    <div className='form-container'>
                        <h1>Create Account</h1>
                        {/* <p>Organize, Store & Share your files with TruDrive!</p> */}
                        <form onSubmit={handleSubmit}>
                            <div className='first-last-name-field'>
                                <div
                                    className='form-group'
                                    id='first-name-field'>
                                    <label>First Name</label>
                                    <input
                                        type='text'
                                        name='firstName'
                                        placeholder='First name'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    {errors.firstName && (
                                        <span class='error-message'>
                                            {errors.firstName}
                                        </span>
                                    )}
                                </div>
                                <div
                                    className='form-group'
                                    id='last-name-field'>
                                    <label>Last Name</label>
                                    <input
                                        type='text'
                                        name='lastName'
                                        placeholder='Last name'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    {errors.lastName && (
                                        <span class='error-message'>
                                            {errors.lastName}
                                        </span>
                                    )}
                                </div>
                            </div>
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
                                    <span class='error-message'>
                                        {errors.email}
                                    </span>
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
                                    <span class='error-message'>
                                        {errors.password}
                                    </span>
                                )}
                            </div>
                            <div className='form-group'>
                                <label>Country Code</label>
                                <input
                                    type='text'
                                    name='countryCode'
                                    placeholder='+123'
                                    value={formData.phone.countryCode}
                                    onChange={handleChange}
                                />
                                {errors.countryCode && (
                                    <span className='error-message'>{errors.countryCode}</span>
                                )}
                            </div>
                            <div className='form-group'>
                                <label>Phone Number</label>
                                <input
                                    type='text'
                                    name='number'
                                    value={formData.phone.number}
                                    onChange={handleChange}
                                />
                                {errors.number && (
                                    <span className='error-message'>{errors.number}</span>
                                )}
                            </div>
                            <div className='user_role'>
                                <p className='are_you_a'>Are you a </p>

                                <input
                                    type='checkbox'
                                    checked={isBuyer}
                                    onChange={() =>
                                        handleCheckboxChange('buyer')
                                    }
                                />
                                <label>buyer</label>

                                <input
                                    type='checkbox'
                                    checked={isSeller}
                                    onChange={() =>
                                      handleCheckboxChange('seller')
                                    }
                                />
                                <label>seller</label>
                                <div>
                                    {errors.role && (
                                        <span class='error-message'>
                                            {errors.role}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <button
                                type='submit'
                                className='submit-button'
                                disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Sign Up'}
                            </button>
                            {submitMessage && (
                                <span className='submit-message'>
                                    {submitMessage}
                                </span>
                            )}
                            <span className='existing-account'>
                                Already have an account?{' '}
                                <a href="/login"><span className='log-in'>Log in</span></a>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUpComponent
