import AboutPage from "../pages/AboutPage/AboutPage"
import HomePage from "../pages/HomePage/HomePage"

const publicRouter = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
]

export { publicRouter }