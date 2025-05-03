import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../utils/config";
import { FiPlus, FiCheck, FiX, FiTrash2, FiSkipForward } from "react-icons/fi";
import { RiMoonClearLine } from "react-icons/ri";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get(`${config.backendUrl}/api/goals`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setGoals(response.data);
        setError("");
      } catch (error) {
        console.error("Error fetching goals:", error.response?.data || error.message);
        setError("Failed to load goals. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const addGoal = async () => {
    if (!newGoal || !duration) {
      setError("Please enter a goal and duration.");
      return;
    }

    const goalData = {
      title: newGoal,
      totalDays: parseInt(duration, 10),
      completedDays: 0,
      skippedDays: 0,
    };

    try {
      const response = await axios.post(`${config.backendUrl}/api/goals`, goalData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setGoals((prevGoals) => [...prevGoals, response.data]);
      setNewGoal("");
      setDuration("");
      setError("");
    } catch (error) {
      console.error("Error adding goal:", error.response?.data || error.message);
      setError("Failed to add goal. Please try again.");
    }
  };

  const updateGoal = async (id, completedDays, skippedDays, totalDays) => {
    if (completedDays + skippedDays > totalDays) {
      setError("Total tracked days cannot exceed the total goal duration!");
      return;
    }

    try {
      const response = await axios.put(
        `${config.backendUrl}/api/goals/${id}`,
        { completedDays, skippedDays },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal._id === id ? { ...goal, ...response.data } : goal))
      );
      setError("");
    } catch (error) {
      console.error("Error updating goal:", error.response?.data || error.message);
      setError("Failed to update goal. Please try again.");
    }
  };

  const deleteGoal = async (id) => {
    try {
      await axios.delete(`${config.backendUrl}/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== id));
      setError("");
    } catch (error) {
      console.error("Error deleting goal:", error.response?.data || error.message);
      setError("Failed to delete goal. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <RiMoonClearLine className="text-purple-500 mr-2" size={28} />
          <h2 className="text-3xl font-bold">Your Goals</h2>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-100 flex items-center">
            <FiX className="mr-2" />
            {error}
          </div>
        )}

        {/* Add New Goal */}
        <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <FiPlus className="mr-2" /> Add New Goal
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter goal title"
              className="p-3 w-full bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-400"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter duration (days)"
              className="p-3 w-full bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-100 placeholder-gray-400"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
            />
            <button
              className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center transition-colors"
              onClick={addGoal}
            >
              <FiPlus className="mr-2" /> Add Goal
            </button>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-6">
          {goals.length === 0 ? (
            <div className="text-center py-12 bg-gray-800/50 rounded-lg border border-dashed border-gray-700">
              <p className="text-gray-400">No goals yet. Add your first goal to get started!</p>
            </div>
          ) : (
            goals.map((goal) => {
              const totalTrackedDays = goal.completedDays + goal.skippedDays;
              const progress = Math.min(Math.round((goal.completedDays / goal.totalDays) * 100), 100);
              const isDisabled = totalTrackedDays >= goal.totalDays;
              const daysRemaining = Math.max(goal.totalDays - totalTrackedDays, 0);

              return (
                <div
                  key={goal._id}
                  className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-100">{goal.title}</h3>
                    <div className="flex space-x-2">
                      <span className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full">
                        {daysRemaining} days left
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Progress: {progress}%</span>
                      <span>
                        {goal.completedDays} completed / {goal.skippedDays} skipped
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          progress === 100 ? "bg-green-500" : "bg-purple-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                        isDisabled
                          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                          : "bg-green-700 hover:bg-green-600 text-green-100"
                      } transition-colors`}
                      onClick={() => updateGoal(goal._id, goal.completedDays + 1, goal.skippedDays, goal.totalDays)}
                      disabled={isDisabled}
                    >
                      <FiCheck className="mr-2" /> Mark Done
                    </button>

                    <button
                      className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                        isDisabled
                          ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                          : "bg-yellow-700 hover:bg-yellow-600 text-yellow-100"
                      } transition-colors`}
                      onClick={() => updateGoal(goal._id, goal.completedDays, goal.skippedDays + 1, goal.totalDays)}
                      disabled={isDisabled}
                    >
                      <FiSkipForward className="mr-2" /> Skip Day
                    </button>

                    <button
                      className="flex items-center px-4 py-2 bg-red-700 hover:bg-red-600 text-red-100 rounded-lg font-medium transition-colors"
                      onClick={() => deleteGoal(goal._id)}
                    >
                      <FiTrash2 className="mr-2" /> Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Goals;