import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../utils/config';

const UserHome = () => {
  const [goals, setGoals] = useState([]);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const response = await fetch(`${config.backendUrl}/api/goals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setGoals(data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    const fetchMessages = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const response = await fetch(`${config.backendUrl}/api/messages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchGoals();
    fetchMessages();
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 overflow-auto">
      {/* Goals & Progress Section */}
      <section className="mb-6 p-6 rounded-lg shadow-lg border-1 border-black">
        <h3 className="text-xl font-semibold">Goals & Progress</h3>
        {goals.length > 0 ? (
          goals.map((goal, index) => (
            <div key={goal._id || index} className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
              <p><strong>Goal:</strong> {goal.title}</p>
              <p><strong>Total Days:</strong> {goal.totalDays}</p>
              <p><strong>Days Completed:</strong> {goal.completedDays}</p>
              <p><strong>Skipped Days:</strong> {goal.skippedDays}</p>
              <p><strong>Days Remaining:</strong> {Math.max(goal.totalDays - (goal.completedDays + goal.skippedDays), 0)}</p>
              <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                <div
                  className="bg-blue-700 h-4 rounded-full"
                  style={{ width: `${(goal.completedDays / goal.totalDays) * 100}%` }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <p>No goals set yet.</p>
        )}
        <button
          className="mt-4 bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer"
          onClick={() => navigate('/UserDashboard/usergoals')}
        >
          Add Goal
        </button>
      </section>

      {/* Recent Messages Section */}
      <section className="mb-6 p-6 rounded-lg shadow-lg border-1 border-black">
        <h3 className="text-xl font-semibold">Recent Messages</h3>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={message._id || index} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p><strong>From:</strong> {message.sender}</p>
              <p><strong>Message:</strong> {message.text}</p>
              <p className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No recent messages.</p>
        )}
      </section>
    </div>
  );
};

export default UserHome;
