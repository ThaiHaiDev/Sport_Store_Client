import { Route, Routes } from "react-router-dom"
import Signin from "../pages/AuthPage/Signin/Signin"
import Signup from "../pages/AuthPage/Signup/Signup"
import { Fragment } from 'react';
import publicRouter from "./path";

const RouteAuth = () => {
    // console.log(publicRouter)
    return (
        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            {publicRouter.test.map((route:any, index:any) => {
                const Page = route.component;
                let Layout = Fragment;
                return (
                    <Route key={index} path={route.path} element={
                        <Layout>
                            <Page />
                        </Layout>
                    } />
                )
            })}
        </Routes>
    );
}

export default RouteAuth