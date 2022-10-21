import { useSelector } from 'react-redux';
import './App.scss';
import LayoutAdmin from './pages/LayoutAdmin/LayoutAdmin';
import RouteAuth from './routes';
import { RootState} from './redux/store'
import LayoutCustomer from './pages/LayoutCustomer/LayoutCustomer';

function App() {
    const user = useSelector((state: RootState) => state.user)
    return (
        <div className="App">
            {user.current.isAdmin === 'admin' && user.current ? <LayoutAdmin /> : <RouteAuth />}
            {/* <LayoutCustomer /> */}
        </div>
    );
}

export default App;
