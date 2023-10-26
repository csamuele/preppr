import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Signup from "Pages/Signup";
import Dashboard from "Pages/Dashboard";
import {Header} from 'Features/ui'
import { Provider } from "react-redux";
import {store} from "App/store";
//render Header on all routes
//render Home at the root route
const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Header />}>
            <Route path="/" element={<Dashboard/>} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
 </>
));
const App = () => {
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}

export default App;
