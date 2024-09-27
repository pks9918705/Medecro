import { createBrowserRouter } from "react-router-dom";
import { Register } from "../components/NewComponets/Register";
import Patient from "../components/NewComponets/Patient";
import { Home } from "../Home";
// import Doctor from "../components/NewComponets/Doctor.jsx";
import DoctorHome from "../components/NewComponets/DoctorHome.jsx";
import FileUpload from "../components/NewComponets/Upload";
import {Video} from "../components/NewComponets/Video/Video";
import { VideoIndex } from "../components/NewComponets/Video/Index";


export const routes = createBrowserRouter([
  { path: "/register", element: <Register /> },
  { path: "/patient", element: <Patient /> },
  // { path: "/doctor", element: <Doctor /> },
  { path: "/doctor", element: <DoctorHome /> },
  { path: "/file", element: <FileUpload /> },
  { path: "/", element: <Home /> }, // Default route if no path matches
  { path: "/video", element: <Video /> }, // Default route if no path matches
  { path: "/room/:roomId", element: <VideoIndex /> },  

]);
