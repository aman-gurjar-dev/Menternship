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
    yearsOfExperience: '',
    about: '',
    professionalBackground: '',
    teachingStyle: '',
    availability: {
      days: [],
      hours: '9:00 AM - 5:00 PM'
    }
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  const validateForm = () => {
    const newErrors = {};
    
    // Basic Information Validation
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
    
    // Professional Information Validation
    if (!formData.expertise.trim()) newErrors.expertise = 'Expertise is required';
    
    if (!formData.yearsOfExperience || isNaN(formData.yearsOfExperience) || formData.yearsOfExperience < 0) {
      newErrors.yearsOfExperience = 'Please enter valid years of experience';
    }

    if (!formData.professionalBackground.trim()) {
      newErrors.professionalBackground = 'Professional background is required';
    }

    if (!formData.teachingStyle.trim()) {
      newErrors.teachingStyle = 'Teaching style is required';
    }

    // About Section Validation
    if (!formData.about.trim()) newErrors.about = 'About section is required';

    // Availability Validation
    if (!formData.availability.days.length) {
      newErrors.availability = 'Please select at least one available day';
    }

    if (!formData.availability.hours.trim()) {
      newErrors.availability = 'Please specify your availability hours';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter(d => d !== day)
          : [...prev.availability.days, day]
      }
    }));
    
    // Clear availability error when days are selected
    if (errors.availability) {
      setErrors(prev => ({ ...prev, availability: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    setErrors({}); // Clear previous errors
  
    try {
      // Format the data according to backend requirements
      const mentorData = {
        name: formData.name.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        expertise: [formData.expertise], // Convert to array as backend expects
        yearsOfExperience: parseInt(formData.yearsOfExperience),
        about: formData.about.trim(),
        professionalBackground: formData.professionalBackground.trim(),
        teachingStyle: formData.teachingStyle.trim(),
        availability: {
          days: formData.availability.days,
          hours: formData.availability.hours
        }
      };

      const response = await axios.post(`${config.backendUrl}/api/mentors/register`, mentorData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000 // 10 second timeout
      });
  
      if (!response.data || !response.data.token || !response.data.mentor) {
        throw new Error('Invalid response from server');
      }

      // Store token and mentor data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'mentor');
      localStorage.setItem('mentorData', JSON.stringify(response.data.mentor));
      localStorage.setItem('mentorId', response.data.mentor._id);
  
      // Redirect to dashboard
      navigate('/mentor-dashboard');
  
    } catch (err) {
      if (err.response) {
        if (err.response.data?.details) {
          setErrors(err.response.data.details);
        } else {
          setErrors({ 
            server: err.response.data?.error || 'Registration failed' 
          });
        }
      } else if (err.request) {
        setErrors({ server: 'Network error. Please check your connection.' });
      } else {
        setErrors({ server: 'An unexpected error occurred' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-white">Mentor Registration</h2>
      
      {errors.server && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {errors.server}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${errors.username ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="Choose a username"
                required
              />
              {errors.username && <p className="mt-1 text-sm text-red-400">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Menternship Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="user@menternship.com"
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="Enter your password"
                required
              />
              {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
            </div>
          </div>
        </div>

        {/* Professional Information Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Professional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Primary Expertise</label>
              <select
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${errors.expertise ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                required
              >
                <option value="">Select your expertise</option>
                <option value="Software Development">Software Development</option>
                <option value="Product Management">Product Management</option>
                <option value="Data Science">Data Science</option>
                <option value="UX/UI Design">UX/UI Design</option>
              </select>
              {errors.expertise && <p className="mt-1 text-sm text-red-400">{errors.expertise}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                min="1"
                max="50"
                className={`mt-1 block w-full rounded-md border ${errors.yearsOfExperience ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="Enter years of experience"
                required
              />
              {errors.yearsOfExperience && <p className="mt-1 text-sm text-red-400">{errors.yearsOfExperience}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Professional Background</label>
              <textarea
                name="professionalBackground"
                value={formData.professionalBackground}
                onChange={handleChange}
                rows="3"
                className={`mt-1 block w-full rounded-md border ${errors.professionalBackground ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="Describe your professional experience and achievements"
                required
              />
              {errors.professionalBackground && <p className="mt-1 text-sm text-red-400">{errors.professionalBackground}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Teaching Style</label>
              <textarea
                name="teachingStyle"
                value={formData.teachingStyle}
                onChange={handleChange}
                rows="3"
                className={`mt-1 block w-full rounded-md border ${errors.teachingStyle ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="Describe your teaching approach and methodology"
                required
              />
              {errors.teachingStyle && <p className="mt-1 text-sm text-red-400">{errors.teachingStyle}</p>}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">About</h3>
          <div>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows="4"
              className={`mt-1 block w-full rounded-md border ${errors.about ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
              placeholder="Tell us about yourself and your mentoring experience"
              required
            />
            {errors.about && <p className="mt-1 text-sm text-red-400">{errors.about}</p>}
          </div>
        </div>

        {/* Availability Section */}
        <div className="bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">Availability</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Available Days</label>
              <div className="grid grid-cols-2 gap-2">
                {weekDays.map(day => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleDayToggle(day)}
                    className={`p-2 rounded-md text-sm ${
                      formData.availability.days.includes(day)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
              {errors.availability && <p className="mt-1 text-sm text-red-400">{errors.availability}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Availability Hours</label>
              <input
                type="text"
                name="availability.hours"
                value={formData.availability.hours}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border ${errors.availability ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white shadow-sm p-2`}
                placeholder="e.g., 9:00 AM - 5:00 PM"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none`}
        >
          {loading ? 'Registering...' : 'Register as Mentor'}
        </button>
      </form>
    </div>
  );
};

export default MentorRegister;