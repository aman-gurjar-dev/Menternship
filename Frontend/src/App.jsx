import { useState } from "react";
import "./App.css";
import Registration from "./components/Registration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Registration /> },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Profile",
    element: <Profile />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
