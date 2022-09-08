import { useState } from 'react';
import NavbarCustomer from '../../components/NavbarCustomer/NavbarCustomer';
import './HomePage.scss';
import InfoProductHome from './InfoProductHome/InfoProductHome';
import ListProductImageHome from './ListProductImageHome/ListProductImageHome';

const HomePage = () => {
    const [active, setActive] = useState<Boolean>(false)
    return (
        <div className="home__page">
            <NavbarCustomer />
            <div className={active ? 'active slider' : 'slider'}>
                <div className="row fullheight">
                    <div className="col-6 fullheight">
                        <InfoProductHome />
                    </div>

                    <div className="col-6 fullheight img-col bg-blue">
                        <ListProductImageHome />
                    </div>
                </div>

                 {/* SLIDE CONTROL  */}
                <div id="slide-control" className="slide-control">
                    <div className="slide-control-item" onClick={() => setActive(!active)}>
                        <img src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/zoomx-vaporfly-next-running-shoe-4Q5jfG.png" alt="placeholderimage" />
                    </div>
                    <div className="slide-control-item">
                        <img src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/zoom-fly-3-mens-running-shoe-XhzpPH.png" alt="placeholderimage" />
                    </div>
                    <div className="slide-control-item">
                        <img src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/air-max-alpha-tr-3-mens-training-shoe-0C1CV7.png" alt="placeholderimage" />
                    </div>
                    <div className="slide-control-item">
                        <img src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/air-zoom-superrep-mens-hiit-class-shoe-ZWLnJW (1).png" alt="placeholderimage" />
                    </div>
                </div>
                {/* END SLIDE CONTROL  */}
            </div>
        </div>
    );
};

export default HomePage;
