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
import ProtectedRoute from "./utils/ProtectedRoute"; // ✅ Import the Protected Route
import UserDashboard from "./assets/Components/Dashboard/UserDashboard"
import Resources from "./assets/Components/Resource/Resource";
import YtResource from "./assets/Components/Resource/YtResource";
import LearningResource from "./assets/Components/Resource/LearningResource";
import EbookResource from "./assets/Components/Resource/EbookResource";
import PdfResource from "./assets/Components/Resource/PdfResource";
import RoadmapResource from "./assets/Components/Resource/RoadmapResource";
import Goals from "./assets/Components/Goals/Goals";
import ExploreMentor from "./assets/Components/ExploreMentor/ExploreMentor";
import Mymentor from "./assets/Components/Mentor/Mymentor";
import ChatPage from "./assets/Components/Chat/ChatPage";
import ChatPageWrapper from "./assets/Components/Chat/ChatPageWrapper";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import StudentProfileForMentors from "./pages/StudentProfileForMentors";
import MentorProfileForStudents from "./pages/MentorProfileForStudents";
import MentorLogin from "./assets/Components/Mentor/Auth/MentorLogin";
import MentorRegister from "./assets/Components/Mentor/Auth/MentorRegister";
import MentorDashboard from "./assets/Components/Mentor/Dashboard/MentorDashboard";

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
    path: "/Explore_now",
    element: (
      <>
        <Navbar />
        <Explore_now />
      </>
    ),
  },
  {
    path: "/Explore_ai",
    element: (
      <>
        <Navbar />
        <Explore_now />
      </>
    ),
  },
  {
    path: "/Explore_ds",
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
    path: "/Registermentor",
    element: <MentorRegister />,
  },
  {
    path: "/Loginmentor",
    element: <MentorLogin />,
  },

  {
    path: "/OTP",
    element: <OTP />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/studentProfileForMentor",
    element:(
      <ProtectedRoute>
      <StudentProfileForMentors />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/mentorProfileForStudent",
    element:(
      <ProtectedRoute>
      <MentorProfileForStudents />,
      </ProtectedRoute>
    ),
  },
  {
  path: "/mentor-dashboard",
  element: (
    <ProtectedRoute>
      <MentorDashboard />
    </ProtectedRoute>
  )
},
  {
    path: "/UserDashboard",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "", // Default route for UserDashboard
        element: <h2 className="text-center text-white">Welcome to Dashboard</h2>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "usergoals",
        element: <Goals />
      },
      {
        path: "chat_now",
        element: <Chat />,
      },
      {
        path: "resource",
        element: <Resources />,
      },
      {
        path: "mymentor",
        element: <Mymentor />
      },
      {
        path: "message", // This is the corrected line
        element: <ChatPageWrapper />,
      },
      {
        path: 'explorementor',
        element: <ExploreMentor />
      },
    ],
  },
  {
    path: "learningResources/:resourceType", // Dynamic route for YT & other resources
    element: <LearningResource />,
  },
  {
    path: "mentordashboard/:id", // ✅ Correct (relative path)
    element: <MentorDashboard />
  },


  {
    path: 'explorementor',
    element: <ExploreMentor />
  },
  {
    path: "learningResources/ytResource/:topic", // ✅ Route for YouTube Resources
    element: <YtResource />,
  },
  {
    path: "learningResources/Ebook/:topic", // ✅ Route for Ebook Resources
    element: <EbookResource />,
  },
  {
    path: "learningResources/pdf/:topic", // ✅ Route for PDF Resources
    element: <PdfResource />
  },
  {
    path: "/learningResources/roadmap/:topic",
    element: <RoadmapResource />,
  },
  {
    path: "/mentor-dashboard/messages",
    element: <ChatPageWrapper />,
  }

]);



function App() {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-[#1A171E] text-white relative overflow-hidden">
          <RouterProvider router={router} />
        </div>

        <CopilotKit publicApiKey="ck_pub_386cadf26332be4af7eb573c5163e3cb">
          <CopilotSidebar
            labels={{
              title: "Sidebar Assistant",
              initial: "How can I help you today?"
            }}
            instructions="Your product deserves an AI sidekick"
          />
        </CopilotKit>
      </body>
    </html>
  );
}

export default App;
