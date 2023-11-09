import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from "Pages/Home";
import Login from "Pages/Login";
import Signup from "Pages/Signup";
import Dashboard from "Pages/Dashboard";
import {Layout} from 'Features/ui'
import { Provider as ReduxProvider, useSelector } from "react-redux";
import {store} from "App/store";
import { ThemeProvider } from "./Theme";
//render Header on all routes
//render Home at the root route
const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
            <Route path="/" element={<Dashboard/>} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
 </>
));

const App = () => {
    return (
            <ReduxProvider store={store}>
                    <ThemeProvider>
                        <RouterProvider router={router}/>
                    </ThemeProvider>
            </ReduxProvider>
    );
}

export default App;
