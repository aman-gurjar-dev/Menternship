import React from "react";

const ProfileRight = ({ active }) => {
  return (
    <div className="p-6 text-white relative z-10">
      {active === "Account" && (
        <>
          <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 text-black rounded bg-gray-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-2 text-black rounded bg-gray-300"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-2 text-black rounded bg-gray-300"
            />
            <input
              type="tel"
              placeholder="Phone No."
              className="p-2 text-black rounded bg-gray-300"
            />
            <input
              type="text"
              placeholder="College Name"
              className="p-2 text-black rounded bg-gray-300"
            />
            <input
              type="text"
              placeholder="Role"
              className="p-2 text-black rounded bg-gray-300"
            />
          </div>
          <textarea
            placeholder="Bio.."
            className="w-full mt-4 p-2 text-black rounded bg-gray-300"
          ></textarea>
          <div className="flex mt-4 space-x-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              Update
            </button>
            <button className="text-white px-4 py-2 border border-gray-400 rounded">
              Cancel
            </button>
          </div>
        </>
      )}

      {active === "Password" && (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-4">Change Password</h2>
          <div className="grid gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="p-2 text-black rounded bg-gray-300"
            />
            <input
              type="password"
              placeholder="New Password"
              className="p-2 text-black rounded bg-gray-300"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="p-2 text-black rounded bg-gray-300"
            />
          </div>
          <div className="flex mt-4 space-x-4">
            <button className="bg-purple-600 text-white px-4 py-2 rounded">
              Update
            </button>
            <button className="text-white px-4 py-2 border border-gray-400 rounded">
              Cancel
            </button>
          </div>
        </>
      )}

      {active === "Log out" && (
        <>
          <h1>LogOut Successful</h1>
        </>
      )}
    </div>
  );
};

export default ProfileRight;
