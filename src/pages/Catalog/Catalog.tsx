import React, { useCallback, useState, useEffect, useRef } from 'react';

import productData from '../../assets/JsonData/products';
import category from '../../assets/JsonData/category';
import colors from '../../assets/JsonData/product-color';
import size from '../../assets/JsonData/product-size';
import InfinityList from '../../components/InfinityList/InfinityList';
import CheckBox from '../../components/CheckBox/CheckBox';

import './Catalog.scss';
const Catalog = () => {
    const initFilter:any = {
        category: [],
        color: [],
        size: [],
    };

    const productList = productData.getAllProducts();

    const [products, setProducts] = useState<any>(productList);

    const [filter, setFilter] = useState<any>(initFilter);

    const filterSelect = (type:any, checked:any, item:any) => {
        if (checked) {
            switch (type) {
                case 'CATEGORY':
                    setFilter({ ...filter, category: [...filter.category, item.categorySlug] });
                    break;
                case 'COLOR':
                    setFilter({ ...filter, color: [...filter.color, item.color] });
                    break;
                case 'SIZE':
                    setFilter({ ...filter, size: [...filter.size, item.size] });
                    break;
                default:
            }
        } else {
            switch (type) {
                case 'CATEGORY':
                    const newCategory = filter.category.filter((e:any) => e !== item.categorySlug);
                    setFilter({ ...filter, category: newCategory });
                    break;
                case 'COLOR':
                    const newColor = filter.color.filter((e:any) => e !== item.color);
                    setFilter({ ...filter, color: newColor });
                    break;
                case 'SIZE':
                    const newSize = filter.size.filter((e:any) => e !== item.size);
                    setFilter({ ...filter, size: newSize });
                    break;
                default:
            }
        }
    };

    const clearFilter = () => setFilter(initFilter);

    const updateProducts = useCallback(() => {
        let temp = productList;

        if (filter.category.length > 0) {
            temp = temp.filter((e) => filter.category.includes(e.categorySlug));
        }

        if (filter.color.length > 0) {
            temp = temp.filter((e) => {
                const check = e.colors.find((color) => filter.color.includes(color));
                return check !== undefined;
            });
        }

        if (filter.size.length > 0) {
            temp = temp.filter((e) => {
                const check = e.size.find((size) => filter.size.includes(size));
                return check !== undefined;
            });
        }

        setProducts(temp);
    }, [filter, productList]);

    useEffect(() => {
        updateProducts();
    }, [updateProducts]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filterRef = useRef<HTMLInputElement | null>(null);

    const showHideFilter = () => filterRef.current?.classList.toggle('active');

    console.log(products)

    return (
            <div className="catalog">
                <div className="catalog__filter" ref={filterRef}>
                    <div className="catalog__filter__close" onClick={() => showHideFilter()}>
                        <i className="bx bx-left-arrow-alt"></i>
                    </div>
                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">danh mục sản phẩm</div>
                        <div className="catalog__filter__widget__content">
                            {category.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('CATEGORY', input.checked, item)}
                                        checked={filter.category.includes(item.categorySlug)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">màu sắc</div>
                        <div className="catalog__filter__widget__content">
                            {colors.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('COLOR', input.checked, item)}
                                        checked={filter.color.includes(item.color)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__title">kích cỡ</div>
                        <div className="catalog__filter__widget__content">
                            {size.map((item, index) => (
                                <div key={index} className="catalog__filter__widget__content__item">
                                    <CheckBox
                                        label={item.display}
                                        onChange={(input) => filterSelect('SIZE', input.checked, item)}
                                        checked={filter.size.includes(item.size)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="catalog__filter__widget">
                        <div className="catalog__filter__widget__content">
                            <button onClick={clearFilter}>
                                xóa bộ lọc
                            </button>
                        </div>
                    </div>
                </div>
                <div className="catalog__filter__toggle">
                    <button onClick={() => showHideFilter()}>
                        bộ lọc
                    </button>
                </div>
                <div className="catalog__content">
                    <InfinityList data={products} />
                </div>
            </div>
    );
};

export default Catalog;
