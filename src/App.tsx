import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import RoutesCustom from './components/Routes';
import Sidebar from './components/Sidebar/Sidebar';
import globalSlice from './redux/globalSlice';
import { RootState } from './redux/store';

function App() {
    const dispatch = useDispatch();
    const themeReducer = useSelector((state: RootState) => state.global)

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode')

        const colorClass = localStorage.getItem('colorMode')

        dispatch(globalSlice.actions.setMode(themeClass))

        dispatch(globalSlice.actions.setColor(colorClass))
    }, [dispatch])

    return (
            <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                <Sidebar />
                <div className="layout__content">
                        <Navbar />
                        <div className="layout__content-main">
                            <RoutesCustom />
                        </div>
                </div>
            </div>
    );
}

export default App;
