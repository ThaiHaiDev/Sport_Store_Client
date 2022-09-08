import { Route, Routes } from "react-router-dom"
import Signin from "../pages/AuthPage/Signin/Signin"
import Signup from "../pages/AuthPage/Signup/Signup"
import { publicRouter } from "./path";
import { Fragment } from 'react';

const RouteAuth = () => {
    return (
        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            {publicRouter.map((route:any, index:any) => {
                const Page = route.component;
                let Layout = Fragment;
                return (
                    <Route key={index} path={route.path} element={<Page />} />
                )
            })}
        </Routes>
    );
}

export default RouteAuth