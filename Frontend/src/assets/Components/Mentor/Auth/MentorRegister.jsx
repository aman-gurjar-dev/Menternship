import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from '../../../utils/config';

const MentorRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    expertise: '',
    yearsOfExperience: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[a-zA-Z0-9._%+-]+@menternship\.com$/.test(formData.email)) {
      newErrors.email = 'Must be a valid @menternship.com email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.expertise.trim()) newErrors.expertise = 'Expertise is required';
    
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience) || formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Please enter valid years of experience';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    setErrors({}); // Clear previous errors
  
    try {
      const response = await axios.post(`${config.backendUrl}/api/mentors/register`, {
        ...formData,
        yearsOfExperience: parseInt(formData.yearsOfExperience)
      }, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000 // 10 second timeout
      });
  
      // Store token, user role, mentor data, and mentor id
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'mentor');
      localStorage.setItem('mentorData', JSON.stringify(response.data.mentor));
      localStorage.setItem('mentorId', response.data.mentor.id); // Store the mentor's id
  
      // Redirect to dashboard
      navigate('/mentor-dashboard');
  
    } catch (err) {
      // Handle Axios errors
      if (err.response) {
        // Server responded with error status
        if (err.response.data?.details) {
          // Field-specific errors from backend
          setErrors(err.response.data.details);
        } else {
          setErrors({ 
            server: err.response.data?.error || 'Registration failed' 
          });
        }
      } else if (err.request) {
        // Request was made but no response
        setErrors({ server: 'Network error. Please check your connection.' });
      } else {
        // Other errors
        setErrors({ server: 'An unexpected error occurred' });
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Mentor Registration</h2>
      
      {errors.server && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
          />
          {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Menternship Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
            placeholder="user@menternship.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        {/* Expertise Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Primary Expertise</label>
          <select
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border ${errors.expertise ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
          >
            <option value="">Select your expertise</option>
            <option value="Software Development">Software Development</option>
            <option value="Product Management">Product Management</option>
            <option value="Data Science">Data Science</option>
            <option value="UX/UI Design">UX/UI Design</option>
          </select>
          {errors.expertise && <p className="mt-1 text-sm text-red-600">{errors.expertise}</p>}
        </div>

        {/* Years of Experience Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
          <input
            type="number"
            name="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            min="1"
            max="50"
            className={`mt-1 block w-full rounded-md border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-300'} shadow-sm p-2`}
          />
          {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`}
        >
          {loading ? 'Registering...' : 'Register as Mentor'}
        </button>
      </form>
    </div>
  );
};

export default MentorRegister;