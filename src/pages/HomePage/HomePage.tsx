import { useEffect, useState } from 'react';
import ModalImage from '../../components/ModalImage/ModalImage';
import NavbarCustomer from '../../components/NavbarCustomer/NavbarCustomer';
import newsOnTopApi from '../../services/newsontopApi';
import './HomePage.scss';
import InfoProductHome from './InfoProductHome/InfoProductHome';
import ListProductImageHome from './ListProductImageHome/ListProductImageHome';

const HomePage = () => {
    const [dataNews, setDataNews] = useState([]) 
    const [active, setActive] = useState<boolean>(false)
    const [findIndex, setFindIndex] = useState<number>(0)
    const [onModal, setOnModal] = useState<boolean>(false)

    const handleSlideChange = (index: number) => {
        setActive(false)
        setFindIndex(index)
    }

    useEffect(() => {
        setTimeout(() => setActive(true), 500);
        setTimeout(() => handleSlideChange(findIndex === 1 ? 0 : findIndex + 1), 10000)
    }, [findIndex])

    useEffect(() => {
        // Lưu ý phải cho () để hàm async chạy ngay để không lỗi
        (async () => {
            try {
                const data = await newsOnTopApi.getAllNewsOnTop()
                setDataNews(data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const hanldeSetOnModal = (value: boolean) => {
        setOnModal(value)
    }

    return (
        <div className="home__page">
            <NavbarCustomer />
            <div className={active ? 'active slider' : 'slider'}>
                {dataNews?.map((data:any, index:any) => {
                    if(index === findIndex) {
                        return (
                            <div className="row fullheight" key={data._id}>
                                <div className="col-6 fullheight">
                                    <InfoProductHome info={data} />
                                </div>
            
                                <div className={`col-6 fullheight img-col bg-${data.bgColor}`}>
                                    <ListProductImageHome listImg={data} onClick={hanldeSetOnModal} />
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={index}></div>
                    )
                })}

                 {/* SLIDE CONTROL  */}
                <div id="slide-control" className="slide-control">
                    <div className="slide-control-item" onClick={() => handleSlideChange(0)}>
                        <img src="https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/zoomx-vaporfly-next-running-shoe-4Q5jfG.png" alt="placeholderimage" />
                    </div>
                    <div className="slide-control-item" onClick={() => handleSlideChange(1)}>
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
            <ModalImage on={onModal} onClick={hanldeSetOnModal} />
        </div>
    );
};

export default HomePage;
