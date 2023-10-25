import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Signup from "Pages/Signup";
import Dashboard from "Pages/Dashboard";
import {Header} from 'Features/ui'
//render Header on all routes
//render Home at the root route
const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Header />}>,
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Route>
));
const App = () => {
    return (
        <RouterProvider router={router}/>
    );
}

export default App;
