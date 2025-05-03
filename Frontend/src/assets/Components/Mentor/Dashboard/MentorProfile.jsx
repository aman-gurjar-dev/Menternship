import { useState } from 'react';
import { Edit, Check, X, Linkedin, Github, Globe, Award, Briefcase, Clock, Star, User, Mail, Phone, MapPin } from 'react-feather';
import { Avatar, Badge, Button } from '../components/ui';

const MentorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Johnson',
    title: 'Senior Software Engineer at TechCorp',
    bio: '10+ years experience in full-stack development with specialization in React, Node.js, and cloud architecture. Passionate about mentoring the next generation of developers.',
    expertise: ['React', 'Node.js', 'AWS', 'TypeScript', 'Mentoring'],
    availability: 'Mon-Fri, 9am-5pm',
    rate: '$120/hour',
    verified: true,
    rating: 4.9,
    sessionsCompleted: 142,
    studentsHelped: 87,
    responseRate: '98%',
    email: 'sarah.johnson@menternship.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'sarahjohnson.dev',
    github: 'github.com/sarahjohnson',
    linkedin: 'linkedin.com/in/sarahjohnson',
  });

  const [editData, setEditData] = useState({ ...profile });

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setProfile(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    icon={<X className="h-4 w-4 mr-2" />}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    icon={<Check className="h-4 w-4 mr-2" />}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => setIsEditing(true)}
                  icon={<Edit className="h-4 w-4 mr-2" />}
                >
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt={profile.name}
                      size="xl"
                    />
                    {profile.verified && (
                      <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-center">
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => handleEditChange('name', e.target.value)}
                        className="text-xl font-bold text-gray-900 text-center border-b border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                    ) : (
                      <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                    )}
                    
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className="text-gray-600 text-center border-b border-gray-300 focus:outline-none focus:border-blue-500 mt-1 w-full"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.title}</p>
                    )}
                    
                    <div className="mt-2 flex items-center justify-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="ml-1 text-gray-700 font-medium">{profile.rating}</span>
                      <span className="mx-1 text-gray-500">•</span>
                      <span className="text-gray-500">{profile.sessionsCompleted} sessions</span>
                    </div>
                    
                    {profile.verified && (
                      <div className="mt-2">
                        <Badge variant="success" icon={<Check className="h-3 w-3" />}>
                          Verified Mentor
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Sessions</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{profile.sessionsCompleted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{profile.studentsHelped}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Response</p>
                    <p className="mt-1 text-lg font-semibold text-gray-900">{profile.responseRate}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => handleEditChange('email', e.target.value)}
                          className="flex-1 text-sm text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <a href={`mailto:${profile.email}`} className="text-sm text-gray-700 hover:text-blue-600">
                          {profile.email}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => handleEditChange('phone', e.target.value)}
                          className="flex-1 text-sm text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <a href={`tel:${profile.phone.replace(/\D/g, '')}`} className="text-sm text-gray-700 hover:text-blue-600">
                          {profile.phone}
                        </a>
                      )}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editData.location}
                          onChange={(e) => handleEditChange('location', e.target.value)}
                          className="flex-1 text-sm text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        <span className="text-sm text-gray-700">{profile.location}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Social Links</h3>
                  <div className="mt-2 flex space-x-4">
                    {isEditing ? (
                      <>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
                          <input
                            type="url"
                            value={editData.linkedin}
                            onChange={(e) => handleEditChange('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/username"
                            className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">GitHub</label>
                          <input
                            type="url"
                            value={editData.github}
                            onChange={(e) => handleEditChange('github', e.target.value)}
                            placeholder="github.com/username"
                            className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs text-gray-500 mb-1">Website</label>
                          <input
                            type="url"
                            value={editData.website}
                            onChange={(e) => handleEditChange('website', e.target.value)}
                            placeholder="yourwebsite.com"
                            className="w-full text-sm border-b border-gray-300 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        {profile.linkedin && (
                          <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                            <Linkedin className="h-5 w-5" />
                          </a>
                        )}
                        {profile.github && (
                          <a href={`https://${profile.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700">
                            <Github className="h-5 w-5" />
                          </a>
                        )}
                        {profile.website && (
                          <a href={`https://${profile.website}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500">
                            <Globe className="h-5 w-5" />
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  About
                </h3>
                {isEditing && (
                  <span className="text-sm text-gray-500">Characters: {editData.bio.length}/500</span>
                )}
              </div>
              <div className="px-6 py-4">
                {isEditing ? (
                  <textarea
                    value={editData.bio}
                    onChange={(e) => handleEditChange('bio', e.target.value)}
                    maxLength="500"
                    rows="5"
                    className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
                )}
              </div>
            </div>

            {/* Expertise Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Award className="h-5 w-5 text-gray-500 mr-2" />
                  Areas of Expertise
                </h3>
              </div>
              <div className="px-6 py-4">
                {isEditing ? (
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {editData.expertise.map((skill, index) => (
                        <div key={index} className="flex items-center bg-blue-50 rounded-full px-3 py-1">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) => {
                              const newExpertise = [...editData.expertise];
                              newExpertise[index] = e.target.value;
                              handleEditChange('expertise', newExpertise);
                            }}
                            className="bg-transparent border-none focus:ring-0 text-sm text-blue-800"
                          />
                          <button
                            onClick={() => {
                              const newExpertise = editData.expertise.filter((_, i) => i !== index);
                              handleEditChange('expertise', newExpertise);
                            }}
                            className="ml-1 text-blue-400 hover:text-blue-600"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleEditChange('expertise', [...editData.expertise, ''])}
                      className="text-sm text-blue-600 hover:text-blue-500"
                    >
                      + Add Skill
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.expertise.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-sm font-medium text-blue-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Availability & Rates */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-2" />
                    Availability
                  </h3>
                </div>
                <div className="px-6 py-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.availability}
                      onChange={(e) => handleEditChange('availability', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.availability}</p>
                  )}
                </div>
              </div>

              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                    Session Rate
                  </h3>
                </div>
                <div className="px-6 py-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.rate}
                      onChange={(e) => handleEditChange('rate', e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  ) : (
                    <p className="text-gray-700">{profile.rate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Verification Documents (for editing) */}
            {isEditing && (
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Verification Documents</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload documents to verify your identity and credentials
                  </p>
                </div>
                <div className="px-6 py-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <div className="flex justify-center">
                      <svg className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div className="mt-2 flex text-sm text-gray-600">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload files</span>
                        <input type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      PDF, JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentorProfile;