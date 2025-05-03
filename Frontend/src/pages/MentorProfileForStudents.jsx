import { useState, useEffect } from 'react';
import { Star, MessageSquare, BookOpen, Calendar, Award, Clock } from 'react-feather';
import axios from 'axios';
import { useParams } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Assuming you have an auth context

const MentorProfileForStudents = () => {
  const { mentorId } = useParams();
//   const { currentUser } = useAuth(); // Get current user from auth context
  const [mentor, setMentor] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch mentor data
        const mentorRes = await axios.get(`/api/mentors/${mentorId}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
        setMentor(mentorRes.data);

        // Check if student is following this mentor
        const studentRes = await axios.get(`/api/students/${currentUser.id}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
        setIsFollowing(studentRes.data.followedMentors.includes(mentorId));

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [mentorId, userId]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/api/students/${currentUser.id}/follow/${mentorId}`, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      } else {
        await axios.post(`/api/students/${currentUser.id}/follow/${mentorId}`, {}, {
          headers: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  const handleBookSession = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    try {
      await axios.post('/api/sessions', {
        mentorId,
        studentId: currentUser.id,
        date: selectedDate,
        timeSlot: selectedTime
      }, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
      alert('Session booked successfully!');
    } catch (error) {
      console.error('Error booking session:', error);
      alert('Failed to book session');
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Loading mentor profile...</p>
      </div>
    );
  }

  if (!mentor) {
    return <div className="text-center py-8 text-red-500">Mentor not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row items-center">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src={mentor.profileImage || '/default-mentor.jpg'}
              alt={mentor.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-mentor.jpg';
              }}
            />
            <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{mentor.name}</h1>
              <p className="text-gray-600">{mentor.title}</p>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-gray-700 font-medium">{mentor.rating || '4.8'}</span>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-gray-500">{mentor.sessionsCompleted || 120} sessions</span>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-auto flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleFollowToggle}
                className={`px-4 py-2 rounded-md ${
                  isFollowing
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isFollowing ? 'Following' : 'Follow Mentor'}
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                <MessageSquare className="inline mr-2 h-4 w-4" />
                Message
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left Column */}
          <div className="md:col-span-2 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">
              {mentor.bio || 'No bio provided.'}
            </p>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">Expertise</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {mentor.expertise?.length > 0 ? (
                mentor.expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-sm font-medium text-blue-800"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No expertise listed</p>
              )}
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
            <div className="flex items-center text-gray-700 mb-2">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span>{mentor.availability || 'Monday - Friday, 9am - 5pm'}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 text-gray-400 mr-2" />
              <span>Session Rate: {mentor.rate || '$100/hour'}</span>
            </div>
          </div>

          {/* Right Column */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule a Session</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Time</label>
                <select
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                </select>
              </div>
              <button
                onClick={handleBookSession}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                <BookOpen className="inline mr-2 h-4 w-4" />
                Book Session
              </button>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h2>
              <div className="space-y-3">
                {mentor.achievements?.length > 0 ? (
                  mentor.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start">
                      <Award className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                      <span className="text-gray-700">{achievement}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No achievements listed</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileForStudents;