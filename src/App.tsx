import { useState } from 'react';
import './App.scss';
import LayoutAdmin from './pages/LayoutAdmin/LayoutAdmin';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import RouteAuth from './routes';

function App() {
    const [test, setTest] = useState(true)
    return (
        <div className="App">
            {test ? <RouteAuth /> : <LayoutAdmin />}
        </div>
    );
}

export default App;
