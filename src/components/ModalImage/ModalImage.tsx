import './ModalImage.scss';
interface SetModal {
    on: boolean;
    onClick: (value: boolean) => void
}

const ModalImage = (props: SetModal) => {
    return (
        <div id="modal" className={props.on ? 'modal on' : 'modal'}>
            <span id="modal-close" className="close" onClick={() => {props.onClick(false)}}>&times;</span>
            <img id="modal-content" className="modal-content" src='https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/zoomx-vaporfly-next-running-shoe-4Q5jfG-1.jpg' alt='s'/>
            <div className="more-images">
                <div className="more-images-item">
                    <img src='https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/zoomx-vaporfly-next-running-shoe-4Q5jfG-1.jpg' alt='s' className="img-preview" />
                </div>
                <div className="more-images-item">
                    <img src='https://raw.githubusercontent.com/ThaiHaiDev/StoreImage/main/Sport_store/zoomx-vaporfly-next-running-shoe-4Q5jfG-1.jpg' alt='s' className="img-preview" />
                </div>
            </div>
        </div>
    )
}

export default ModalImage