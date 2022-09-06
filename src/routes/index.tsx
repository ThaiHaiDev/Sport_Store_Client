import { Route, Routes } from "react-router-dom"
import Signin from "../pages/AuthPage/Signin/Signin"
import Signup from "../pages/AuthPage/Signup/Signup"

const RouteAuth = () => {
    return (
        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
}

export default RouteAuth