

const InfoProductHome = (props: any) => {
    return (
        <div className="product-info">
            <div className="info-wrapper">
                <div className="product-price left-to-right">
                    <span>$</span>{props.info.price}
                </div>
                <div className="product-name left-to-right">
                    <h2>{props.info.name}</h2>
                </div>
                <div className="product-size left-to-right">
                    <h3>Size</h3>
                    <div className="size-wrapper">
                        <div className="active">35</div>
                        <div>36</div>
                        <div>37</div>
                        <div>38</div>
                        <div>39</div>
                        <div>40</div>
                    </div>
                </div>
                <div className="product-color left-to-right">
                    <h3>Colors</h3>
                    <div className="color-wrapper">
                        <div className="color active">
                            <div className="bg-red"></div>
                        </div>
                        <div className="color">
                            <div className="bg-blue"></div>
                        </div>
                        <div className="color">
                            <div className="bg-white"></div>
                        </div>
                    </div>
                </div>
                <div className="product-desc left-to-right">
                    <p>{props.info.desc}</p>
                </div>
                <div className="btn-cart__home left-to-right">
                    <button>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default InfoProductHome;
