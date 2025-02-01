import Home from "./assets/Components/Home";
import About_page from "./assets/Components/About_page";
import Contact_us from "./assets/Components/Contact_us";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // children:[
    //   {
    //     path:"StartNow",
    //   },{},{}
    // ]
  },
  {
    path: "/About",
    element: <About_page />,
  },
  {
    path: "/Contact",
    element: <Contact_us />,
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
