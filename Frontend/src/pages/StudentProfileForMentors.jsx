import { useState, useEffect } from 'react';
// import { user } from 'react-feather/dist/icons/graduation-cap';
// import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentProfileForMentors = ({ mentorId }) => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(`/api/students/${studentId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setStudent(res.data);
        setNotes(res.data.mentorNotes || '');
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleStartSession = async () => {
    try {
      const response = await axios.post('/api/sessions', {
        studentId,
        mentorId,
        date: new Date().toISOString()
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert(`Session started! ID: ${response.data.sessionId}`);
    } catch (error) {
      console.error('Error starting session:', error);
      alert('Failed to start session');
    }
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      await axios.patch(`/api/students/${studentId}/notes`, {
        notes
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Notes saved successfully!');
    } catch (error) {
      console.error('Error saving notes:', error);
      alert('Failed to save notes');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!student) {
    return <div className="text-center py-8 text-red-500">Student not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Profile Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <img
              className="h-20 w-20 rounded-full object-cover"
              src={student.profileImage || '/default-student.jpg'}
              alt={student.name}
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
              <div className="flex items-center mt-2">
                <GraduationCap className="h-5 w-5 text-gray-400" />
                <span className="ml-2 text-gray-600">
                  {student.college || 'College not specified'} • {student.major || 'Undeclared'}
                </span>
              </div>
            </div>
            <div className="ml-auto space-x-3">
              <button
                onClick={handleStartSession}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <BookOpen className="inline mr-2 h-4 w-4" />
                Start Session
              </button>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
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
            <p className="text-gray-700 mb-6">{student.bio || 'No bio provided.'}</p>
            
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Learning Goals</h2>
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              {student.learningGoals?.length > 0 ? (
                <ul className="list-disc pl-5 space-y-2">
                  {student.learningGoals.map((goal, index) => (
                    <li key={index} className="text-gray-700">{goal}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No learning goals specified.</p>
              )}
            </div>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">Previous Sessions</h2>
            <div className="space-y-3">
              {student.previousSessions?.length > 0 ? (
                student.previousSessions.slice(0, 3).map((session, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <span className="font-medium">{session.topic || 'General Discussion'}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{session.duration || 30} minutes</span>
                    </div>
                    {session.notes && (
                      <p className="mt-2 text-sm text-gray-600">{session.notes}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No previous sessions</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-2" />
                <a href={`mailto:${student.email}`} className="text-blue-600 hover:underline">
                  {student.email}
                </a>
              </div>
              {student.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`tel:${student.phone}`} className="text-blue-600 hover:underline">
                    {student.phone}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule Availability</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">
                    {student.availability?.days || 'Monday, Wednesday, Friday'}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">
                    {student.availability?.hours || '3:00 PM - 7:00 PM'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shared Notes</h2>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 h-24"
                placeholder="Add notes about this student..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              ></textarea>
              <button
                onClick={handleSaveNotes}
                disabled={isSaving}
                className={`mt-2 px-3 py-1 rounded-md text-sm ${isSaving ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
              >
                {isSaving ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileForMentors;