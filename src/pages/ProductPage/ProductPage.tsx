import NavbarCustomer from '../../components/NavbarCustomer/NavbarCustomer';
import ProductCard from '../../components/ProductCard/ProductCard';
import Section, { SectionBody, SectionTitle } from '../../components/Section/Section';

import productData from '../../assets/JsonData/products';

const ProductPage = () => {
    const relatedProducts = productData.getProducts(8);
    return (
        <div>
            <NavbarCustomer />
            <div style={{ marginTop: '100px' }}>
                <Section>
                    <SectionTitle>Khám phá thêm</SectionTitle>
                    <div className="row" style={{ width: '100%' }}>
                        <div className="col-3" style={{ height: '100vh', background: 'red' }}></div>
                        <div className="col-9">
                            <SectionBody>
                                <div className="row" style={{margin: '0'}}>
                                    {relatedProducts.map((item: any, index: number) => (
                                        <div className="col-4 col-md-4 col-sm-6">
                                            <ProductCard
                                                key={index}
                                                thumbnail="http://res.cloudinary.com/dx77zmhpz/image/upload/v1664035655/sport_store/rijevyrrpfkanyux5wvb.jpg"
                                                img02={item.image02}
                                                name={item.title}
                                                price={Number(item.price)}
                                                slug={item.slug}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </SectionBody>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default ProductPage;
