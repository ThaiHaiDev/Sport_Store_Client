interface SetModal {
    onClick: (value: boolean) => void;
    listImg?: any
}

const ListProductImageHome = (props: SetModal) => {
    
    return (
        <div className="product-image">
            {/* Product image  */}
            <div className="product-image">
                <div className="img-wrapper right-to-left">
                    <div className="bounce">
                        <img
                            src={props.listImg.thumbnail}
                            alt="placeholderimage"
                        />
                    </div>
                </div>
            </div>
            {/* End product image */}

            {/* Product more images */}
            <div className="more-images">
                <div className="more-images-item bottom-up" onClick={() => props.onClick(true)}>
                    <img
                        src={props.listImg.picture_item_1}
                        alt="placeholderimage"
                    />
                </div>
                <div className="more-images-item bottom-up">
                    <img
                        src={props.listImg.picture_item_2}
                        alt="placeholderimage"
                    />
                </div>
                <div className="more-images-item bottom-up">
                    <img
                        src={props.listImg.picture_item_3}
                        alt="placeholderimage"
                    />
                </div>
                <div className="more-images-item bottom-up">
                    <img
                        src={props.listImg.picture_item_4}
                        alt="placeholderimage"
                    />
                </div>
            </div>
            {/* End product more images */}

        </div>
    );
};

export default ListProductImageHome;
