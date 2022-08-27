import './Modal.scss'

const Modal = (props:any) => {
    return (
        <div className={`modal ${props.open ? 'open' : ''}`}>
            <div className="modal-container">
                <div className="modal-close" onClick={()=> props.onClick()}>
                    <i className="ti-close">x</i>
                </div>

                <header className="modal-header">
                    <i className="ti-bag" style={{ paddingRight: '10px' }}></i>
                    Update
                </header>

                <div className="modal-body">
                    <label className="modal-label">
                        <i className="ti-shopping-cart"></i>
                        Tickets, $15 per person
                    </label>
                    <input id="quantity" type="text" className="modal-input" placeholder="How many?" />

                    <label className="modal-label">
                        <i className="ti-email"></i>
                        Send To
                    </label>
                    <input id="emailid" type="email" className="modal-input" placeholder="Enter email" />

                    <button className="pay-btn">PAY</button>
                </div>

                <div className="modal-footer">
                    <div className="content-footer">
                        {/* <p>
                            Need <a href="">help?</a>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
