import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from "react";
import config from "../../utils/config";

const ProfileRight = ({ active }) => {
  const navigate = useNavigate();

  // User data state (simplified)
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    bio: "",
    role: "User",
    phone: "",
    college: ""
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("You must be logged in!");
          navigate("/Login");
          return;
        }

        const res = await axios.get(`${config.backendUrl}/Profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUserData(res.data.user);
      } catch (err) {
        console.error("Error fetching user data:", err);
        alert("Failed to fetch user data. Try again.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field]
    });
  };

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("token");

      const updatedData = {
        name: userData.name,
        username: userData.username,
        phone: userData.phone,
        college: userData.college,
        role: userData.role,
        bio: userData.bio
      };

      const response = await axios.put(
        `${config.backendUrl}/Profile`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update Failed:", err);
      alert("Failed to update profile. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${config.backendUrl}/changePassword`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Password changed successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      console.error("Password Change Failed:", err);
      alert(err.response?.data?.error || "Failed to change password");
    }
  };

  return (
    <div className="p-6 text-white relative z-10 w-full">
      {active === "Account" && (
        <>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Account Settings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="p-2 text-black rounded bg-gray-300 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleChange}
                className="p-2 text-black rounded bg-gray-300 w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                className="p-2 text-gray-500 rounded bg-gray-400 cursor-not-allowed w-full"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                className="p-2 text-black rounded bg-gray-300 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">College</label>
              <input
                type="text"
                name="college"
                value={userData.college}
                onChange={handleChange}
                className="p-2 text-black rounded bg-gray-300 w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={userData.role}
                onChange={handleChange}
                className="p-2 text-black rounded bg-gray-300 w-full"
              >
                <option value="User">User</option>
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Bio</label>
            <textarea
              name="bio"
              value={userData.bio}
              onChange={handleChange}
              className="w-full p-2 text-black rounded bg-gray-300"
              rows="4"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <button
            onClick={handleUpdate}
            disabled={isUpdating}
            className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer mt-4 hover:bg-purple-700 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </>
      )}

      {active === "Password" && (
        <>
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Change Password</h2>
          <div className="space-y-4 max-w-md">
            {[
              { field: "currentPassword", label: "Current Password" },
              { field: "newPassword", label: "New Password" },
              { field: "confirmPassword", label: "Confirm Password" }
            ].map(({ field, label }) => (
              <div key={field} className="relative">
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={passwords[field]}
                  onChange={handlePasswordChange}
                  className="p-2 text-black rounded bg-gray-300 w-full"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-600"
                  onClick={() => togglePasswordVisibility(field)}
                >
                  {showPassword[field] ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleChangePassword}
            className="bg-purple-600 text-white px-4 py-2 rounded cursor-pointer mt-4 hover:bg-purple-700"
          >
            Update Password
          </button>
        </>
      )}
    </div>
  );
};

export default ProfileRight;