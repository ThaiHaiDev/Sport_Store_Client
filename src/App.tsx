import { useSelector } from 'react-redux';
import './App.scss';
import LayoutAdmin from './pages/LayoutAdmin/LayoutAdmin';
import RouteAuth from './routes';
import { RootState} from './redux/store'
import HomePage from './pages/HomePage/HomePage';

function App() {
    // const user = useSelector((state: RootState) => state.user)
    return (
        <div className="App">
            {/* {user.current.isAdmin === 'admin' ? <LayoutAdmin /> : <RouteAuth />} */}
            <HomePage />
        </div>
    );
}

export default App;
