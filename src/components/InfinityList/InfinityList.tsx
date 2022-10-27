import { useRef, useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import './InfinityList.scss';

interface InfinityData {
    data: [];
}

const InfinityList = (props: any) => {
    const perLoad = 6; // items each load

    const listRef = useRef<HTMLInputElement | null>(null);

    const [data, setData] = useState<any>([]);

    const [load, setLoad] = useState<boolean>(true);

    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        setData(props.data.slice(0, perLoad));
        setIndex(1);
    }, [props.data]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            // if (listRef && listRef.current) {
            //     if (window.scrollY + window.innerHeight >= listRef.current.clientHeight + listRef.current.offsetTop + 200) {
            //         console.log("bottom reach")
            //         setLoad(true)
            //     }
            // }
            console.log(window.scrollY)
        })
    }, [listRef])

    useEffect(() => {
        const getItems = () => {
            const pages = Math.floor(props.data.length / perLoad);
            const maxIndex = props.data.length % perLoad === 0 ? pages : pages + 1;

            if (load && index <= maxIndex) {
                const start = perLoad * index;
                const end = start + perLoad;

                setData(data.concat(props.data.slice(start, end)));
                setIndex(index + 1);
            }
        };
        getItems();
        setLoad(false);
    }, [load, index, data, props.data]);

    return (
        <div ref={listRef}>
            <div className="row">
                {data?.map((item: any, index: number) => (
                    <div className="col-4">
                        <ProductCard
                            key={index}
                            thumbnail={item.image01}
                            img02={item.image02}
                            name={item.title}
                            price={Number(item.price)}
                            slug={item.slug}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfinityList;
