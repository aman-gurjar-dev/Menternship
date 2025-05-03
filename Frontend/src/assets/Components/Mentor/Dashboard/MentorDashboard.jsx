import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Users, BookOpen, MessageSquare, BarChart2, HelpCircle, Bell, Search, Edit } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    bio: '',
    expertise: [],
    sessionRate: 0,
    availability: {
      days: [],
      hours: ''
    }
  });
  const [newExpertise, setNewExpertise] = useState('');
  
  useEffect(() => {
    const ellipses = document.querySelectorAll('img[src*="Ellipse"]');
    ellipses.forEach(el => el.remove());
    }, []);

  useEffect(() => {
    const fetchMentorDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
  
        const response = await axios.get('http://localhost:3000/api/mentors/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        console.log('Fetched mentor data:', response.data); // Log the fetched data
  
        setMentor(response.data);
        setEditData({
          name: response.data.name,
          email: response.data.email,
          bio: response.data.bio || '',
          expertise: response.data.expertise || [],
          sessionRate: response.data.sessionRate || 0,
          availability: response.data.availability || {
            days: [],
            hours: '9:00 AM - 5:00 PM'
          }
        });
        setNotificationCount(response.data.pendingMessages || 0);
      } catch (err) {
        console.error('Error fetching mentor details:', err); // Log the error
        setError(err.response?.data?.error || 'Failed to fetch mentor details');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMentorDetails();
  }, [navigate]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvailabilityChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [name]: value
      }
    }));
  };

  const toggleDay = (day) => {
    setEditData(prev => {
      const newDays = prev.availability.days.includes(day)
        ? prev.availability.days.filter(d => d !== day)
        : [...prev.availability.days, day];
      return {
        ...prev,
        availability: {
          ...prev.availability,
          days: newDays
        }
      };
    });
  };

  const addExpertise = () => {
    if (newExpertise.trim() && !editData.expertise.includes(newExpertise.trim())) {
      setEditData(prev => ({
        ...prev,
        expertise: [...prev.expertise, newExpertise.trim()]
      }));
      setNewExpertise('');
    }
  };

  const removeExpertise = (index) => {
    setEditData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  const handleProfileUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:3000/api/mentors/update-profile',
      editData, // Add the request body
      {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json' // Add content type
        }
      });
  
      console.log('Profile updated response:', response.data); // Log the response
  
      setMentor(response.data.updatedMentor);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err); // Log the error
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const LineChart = ({ data }) => {
    const maxValue = Math.max(...data.map(item => item.sessions), 10);
    
    return (
      <div className="h-full w-full">
        <div className="flex items-end h-48">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center px-1">
              <div 
                className="w-full bg-blue-500 rounded-t-sm"
                style={{ height: `${(item.sessions / maxValue) * 100}%` }}
              />
              <span className="text-xs text-gray-500 mt-1">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center text-sm text-gray-500">
          Sessions per month
        </div>
      </div>
    );
  };

  const PieChart = ({ data }) => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercent = 0;
    
    return (
      <div className="h-full w-full flex justify-center items-center">
        <svg viewBox="0 0 100 100" className="w-40 h-40">
          {data.map((item, index) => {
            const percent = (item.value / total) * 100;
            const startPercent = cumulativePercent;
            cumulativePercent += percent;
            
            return (
              <circle
                key={index}
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke={colors[index % colors.length]}
                strokeWidth="10"
                strokeDasharray={`${percent} ${100 - percent}`}
                strokeDashoffset={`${25 - startPercent}`}
              />
            );
          })}
          <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" className="text-sm font-medium">
            {total} Students
          </text>
        </svg>
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!mentor) {
    return <div className="p-4">No mentor data found</div>;
  }

  const stats = {
    currentStudents: mentor.followersCount || 0,
    upcomingSessions: mentor.upcomingSessions || 0,
    averageRating: mentor.averageRating || 0,
    pendingMessages: mentor.pendingMessages || 0,
    sessionActivity: mentor.sessionActivity || [],
    studentDistribution: mentor.studentDistribution || []
  };

  const sessionData = mentor.slots
    ?.filter(slot => slot.status === 'booked')
    .map(slot => ({
      id: slot._id,
      student: slot.bookedBy?.name || 'Student',
      course: slot.course || 'Mentorship Session',
      time: slot.time,
      date: slot.date
    })) || [];

  const performanceData = {
    ratings: mentor.averageRating || 0,
    sessionsCompleted: mentor.completedSessions || 0,
    studentsHelped: mentor.followersCount || 0,
    responseTime: mentor.averageResponseTime || '2h 15m',
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-xl font-semibold text-white">Mentor Dashboard</h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-white hover:text-blue-300"
              >
                <Edit className="h-5 w-5 mr-1" />
                {isEditing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 relative">
                <Bell className="h-6 w-6" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </button>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <img
                  className="h-8 w- 8 rounded-full"
                  src={mentor.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                  alt="User  profile"
                />
                <span className="ml-2 text-sm font-medium text-white">{mentor.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email*</label>
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleEditChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleEditChange}
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Session Rate ($/hr)</label>
                  <input
                    type="number"
                    name="sessionRate"
                    value={editData.sessionRate}
                    onChange={handleEditChange}
                    min="0"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Availability Hours</label>
                  <input
                    type="text"
                    name="hours"
                    value={editData.availability.hours}
                    onChange={handleAvailabilityChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 9:00 AM - 5:00 PM"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Available Days</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {daysOfWeek.map(day => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          editData.availability.days.includes(day)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expertise</label>
                  <div className="mt-1 flex">
                    <input
                      type="text"
                      value={newExpertise}
                      onChange={(e) => setNewExpertise(e.target.value)}
                      className="block w-full border border-gray-300 rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add new expertise"
                    />
                    <button
                      type="button"
                      onClick={addExpertise}
                      className="px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-100 hover:bg-gray-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {editData.expertise.map((exp, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {exp}
                        <button
                          type="button"
                          onClick={() => removeExpertise(index)}
                          className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleProfileUpdate}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'sessions', 'students', 'resources','message'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">Current Students</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.currentStudents}</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Sessions</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.upcomingSessions}</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                      <BarChart2 className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">Average Rating</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.averageRating}/5</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                      <MessageSquare className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dt className="text-sm font-medium text-gray-500 truncate">Pending Messages</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{stats.pendingMessages}</div>
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="bg-gray-800 shadow rounded-lg overflow-hidden lg:col-span-2">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Session Activity</h3>
                </div>
                <div className="px-4 py-5 sm:p-6 h-80">
                  <LineChart data={stats.sessionActivity} />
                </div>
              </div>

              <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Upcoming Sessions</h3>
                    <button className="text-sm text-blue-600 hover:text-blue-500">View All</button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {sessionData.slice(0, 4).map((session) => (
                    <div key={session.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-600 truncate">{session.student}</p>
                          <p className="mt-1 text-sm text-gray-500">{session.course}</p>
                        </div>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            <Clock className="mr-1 h-3 w-3" />
                            {session.time}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {session.date}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <button className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                            Details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Student Distribution</h3>
                </div>
                <div className="px-4 py-5 sm:p-6 h-64">
                  <PieChart data={stats.studentDistribution} />
                </div>
              </div>

              <div className="bg-gray-800 shadow rounded-lg overflow-hidden lg:col-span-2">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Your Performance</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Average Rating</h4>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold text-gray-900">{performanceData.ratings}</span>
                        <span className="ml-1 text-sm font-medium text-gray-500">out of 5</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Sessions Completed</h4>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold text-gray-900">{performanceData.sessionsCompleted}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Students Helped</h4>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold text-gray-900">{performanceData.studentsHelped}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500">Average Response Time</h4>
                      <div className="mt-1 flex items-baseline">
                        <span className="text-3xl font-semibold text-gray-900">{performanceData.responseTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="mt-8">
            <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Your Sessions</h3>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mentor.slots?.map((slot) => (
                        <tr key={slot._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src={slot.bookedBy?.profileImage || "https://via.placeholder.com/40"} alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{slot.bookedBy?. name || 'Student'}</div>
                                <div className="text-sm text-gray-500">{slot.bookedBy?.email || ''}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slot.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{slot.time}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              slot.status === 'booked' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {slot.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Details</button>
                            <button className="text-red-600 hover:text-red-900">Cancel</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <button 
              className="bg-white overflow-hidden shadow rounded-lg p-4 flex items-center hover:bg-gray-50"
              onClick={() => navigate('/mentor/schedule')}
            >
              <div className="bg-blue-100 rounded-md p-3 mr-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Schedule Session</span>
            </button>

            <button 
              className="bg-white overflow-hidden shadow rounded-lg p-4 flex items-center hover:bg-gray-50"
              onClick={() => navigate('/mentor-dashboard/messages')}
            >
              <div className="bg-green-100 rounded-md p-3 mr-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">View Messages</span>
            </button>

            <button 
              className="bg-white overflow-hidden shadow rounded-lg p-4 flex items-center hover:bg-gray-50"
              onClick={() => setActiveTab('students')}
            >
              <div className="bg-yellow-100 rounded-md p-3 mr-4">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Manage Students</span>
            </button>

            <button 
              className="bg-white overflow-hidden shadow rounded-lg p-4 flex items-center hover:bg-gray-50"
              onClick={() => navigate('/support')}
            >
              <div className="bg-purple-100 rounded-md p-3 mr-4">
                <HelpCircle className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-900">Get Support</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorDashboard;