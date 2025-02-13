import Home from "./assets/Components/Home/Home";
import About_page from "./assets/Components/About/About_page";
import Contact_us from "./assets/Components/Contact/Contact_us";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Explore from "./assets/Components/Explore/Explore";
import Explore_now from "./assets/Components/Explore/Explore_now";
import Chat from "./assets/Components/Chat/Chat";
import Register from "./assets/Components/Authentication/Register";
import Login from "./assets/Components/Authentication/Login";
import OTP from "./assets/Components/Authentication/OTP";
import ForgotPassword from "./assets/Components/Authentication/ForgotPassword";
import Profile from "./assets/Components/Profile/Profile";
import effect from "./assets/Images/Ellipse 1.png";
import { Navbar } from "./assets/Components/Navigation/Navbar";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/Explore_more",
    element: (
      <>
        <Navbar />
        <Explore />
      </>
    ),
  },
  {
    path: "/Explore_web",
    element: (
      <>
        <Navbar />
        <Explore_now />
      </>
    ),
  },
  {
    path: "/About",
    element: (
      <>
        <Navbar />
        <About_page />
      </>
    ),
  },
  {
    path: "/Contact",
    element: (
      <>
        <Navbar />
        <Contact_us />
      </>
    ),
  },
  {
    path: "/Chat_now",
    element: <Chat />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/OTP",
    element: <OTP />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
]);

function App() {
  return (
    <div className="h-screen bg-[#1A171E] text-white min-w-screen relative overflow-hidden">
      <RouterProvider router={router} />
      <div>
        <img
          src={effect}
          alt="Effect"
          className="absolute max-w-4xl -bottom-96 -left-90 z-0"
        />
        <img
          src={effect}
          alt="Effect"
          className="absolute max-w-5xl -bottom-96 -right-90 z-0"
        />
      </div>
    </div>
  );
}

export default App;
