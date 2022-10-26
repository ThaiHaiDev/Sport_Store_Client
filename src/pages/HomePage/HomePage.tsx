import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ModalImage from '../../components/ModalImage/ModalImage';
import PolicyCard from '../../components/PolicyCard/PolicyCard';
import ProductCard from '../../components/ProductCard/ProductCard';
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section';
import newsOnTopApi from '../../services/newsontopApi';
import productApi from '../../services/productApi';
import { ProductResponse } from '../../share/models/product';
import policy from '../../utils/policy';
import './HomePage.scss';
import InfoProductHome from './InfoProductHome/InfoProductHome';
import ListProductImageHome from './ListProductImageHome/ListProductImageHome';

const HomePage = () => {
    const [dataNews, setDataNews] = useState([]);
    const [dataPopular, setDataPopular] = useState<ProductResponse[]>([]);
    const [active, setActive] = useState<boolean>(false);
    const [findIndex, setFindIndex] = useState<number>(0);
    const [onModal, setOnModal] = useState<boolean>(false);

    const handleSlideChange = (index: number) => {
        setActive(false);
        setFindIndex(index);
    };

    useEffect(() => {
        setTimeout(() => setActive(true), 500);
        setTimeout(() => handleSlideChange(findIndex === 1 ? 0 : findIndex + 1), 10000);
    }, [findIndex]);

    useEffect(() => {
        // Lưu ý phải cho () để hàm async chạy ngay để không lỗi
        (async () => {
            try {
                const data = await newsOnTopApi.getAllNewsOnTop();
                const productPopular = await productApi.getAllProducts();
                setDataNews(data);
                setDataPopular(productPopular.slice(0, 4));
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const hanldeSetOnModal = (value: boolean) => {
        setOnModal(value);
    };

    return (
        <div className="home__page">
            <div className={active ? 'active slider' : 'slider'}>
                {dataNews?.map((data: any, index: any) => {
                    if (index === findIndex) {
                        return (
                            <div className="row fullheight" key={data._id}>
                                <div className="col-6 fullheight">
                                    <InfoProductHome info={data} />
                                </div>

                                <div className={`col-6 fullheight img-col bg-${data.bgColor}`}>
                                    <ListProductImageHome listImg={data} onClick={hanldeSetOnModal} />
                                </div>
                            </div>
                        );
                    }
                    return <div key={index}></div>;
                })}

                {/* SLIDE CONTROL  */}
                <div id="slide-control" className="slide-control">
                    {dataNews?.map((data: any, index: any) => {
                        if (index === findIndex) {
                            return (
                                <div className="slide-control-item active" onClick={() => handleSlideChange(index)}>
                                    <img src={data.thumbnail} alt="placeholderimage" />
                                </div>
                            );
                        }
                        return (
                            <div className="slide-control-item" onClick={() => handleSlideChange(index)}>
                                <img src={data.thumbnail} alt="placeholderimage" />
                            </div>
                        );
                    })}
                </div>
                {/* END SLIDE CONTROL  */}
            </div>

            <ModalImage on={onModal} onClick={hanldeSetOnModal} />

            {/* Policy  */}
            <div className="policy">
                <Section>
                    <SectionBody>
                        {policy.map((item, index) => (
                            <div className="col-policy">
                                <Link key={index} to="/policy">
                                    <PolicyCard name={item.name} description={item.description} icon={item.icon} />
                                </Link>
                            </div>
                        ))}
                    </SectionBody>
                </Section>
            </div>
            {/* End policy  */}

            {/* best selling section */}
            <div className="product__card">
                <Section>
                    <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
                    <SectionBody>
                        <div className="row">
                            {dataPopular?.map((item: any, index: any) => (
                                <div className="col-3 col-md-4 col-sm-6 ">
                                    <ProductCard
                                        key={index}
                                        thumbnail={item.thumbnail}
                                        pictures={item.pictures}
                                        name={item.name}
                                        price={Number(item.price)}
                                        slug={item.slug}
                                    />
                                </div>
                            ))}
                        </div>
                    </SectionBody>
                </Section>
            </div>
            {/* end best selling section */}

            {/* Footer  */}
            <Footer />
        </div>
    );
};

export default HomePage;
