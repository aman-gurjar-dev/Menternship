import { FaUserCircle } from "react-icons/fa";

const ProfileLeft = ({ active, setActive }) => {
  const menuItems = ["Account", "Password", "Security", "Settings", "Log out"];

  return (
    <div className="w-64 p-4 text-white relative z-10">
      <div className="flex flex-col items-center mb-6">
        <FaUserCircle size={50} className="text-gray-400" />
        <h2 className="mt-2 text-lg font-semibold">User Name</h2>
      </div>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item}
            className={`p-2 cursor-pointer ${
              active === item
                ? "text-white bg-purple-600 rounded-md"
                : "text-gray-300"
            }`}
            onClick={() => setActive(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileLeft;
