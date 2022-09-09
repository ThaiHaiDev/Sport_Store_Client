import AboutPage from "../pages/AboutPage/AboutPage"
import HomePage from "../pages/HomePage/HomePage"

const publicRouter = {
    test: [
        { path: '/', component: HomePage },
        { path: '/about', component: AboutPage },
    ]
}

export default publicRouter