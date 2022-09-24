import { Link } from 'react-router-dom';
import './ProductCard.scss';

import numberWithCommas from '../../utils/numberWithCommas';
import { useDispatch } from 'react-redux';
import ButtonCart from '../ButtonCart/ButtonCart';

const ProductCard = (props: any) => {
    const dispatch = useDispatch();

    return (
        <div className="product-card">
            <Link to={`/catalog/${props.slug}`}>
                <div className="product-card__image">
                    <img src={props.thumbnail} alt="" />
                    <img src={props.pictures} alt="" />
                </div>
                <h3 className="product-card__name">{props.name}</h3>
                <div className="product-card__price">
                    {numberWithCommas(props.price)}
                    <span className="product-card__price__old">
                        <del>{numberWithCommas(399000)}</del>
                    </span>
                </div>
            </Link>
            <div className="product-card__btn">
                <ButtonCart size="sm" icon="bx bx-cart" animate={true}>
                    chọn mua
                </ButtonCart>
            </div>
        </div>
    );
};

export default ProductCard;
