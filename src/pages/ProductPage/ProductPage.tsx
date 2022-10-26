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
                    <div className="row" style={{width: '100%'}}>
                        <div className="col-3" style={{ height: '100vh', background: 'red' }}></div>
                        <div className="col-9">
                            <SectionBody>
                                {relatedProducts.map((item: any, index: number) => (
                                    <ProductCard
                                        key={index}
                                        img01={item.image01}
                                        img02={item.image02}
                                        name={item.title}
                                        price={Number(item.price)}
                                        slug={item.slug}
                                    />
                                ))}
                            </SectionBody>
                        </div>
                    </div>
                </Section>
            </div>
        </div>
    );
};

export default ProductPage;
