import Home from "./assets/Components/Home";
import About_page from "./assets/Components/About_page";
import Contact_us from "./assets/Components/Contact_us";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Explore from "./assets/Components/Explore";
import Explore_now from "./assets/Components/Explore_now";
// import Background from "./assets/Components/Background";
import Chat from "./assets/Components/Chat";
import Register from "./assets/Components/Authentication/Register";
import Login from "./assets/Components/Authentication/Login";
import OTP from "./assets/Components/Authentication/OTP";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Explore_more",
    element: <Explore />,
  },
  {
    path: "/Explore_web",
    element: <Explore_now />,
  },
  {
    path: "/About",
    element: <About_page />,
  },
  {
    path: "/Contact",
    element: <Contact_us />,
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
    path:"/OTP",
    element:<OTP/>
  }
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
