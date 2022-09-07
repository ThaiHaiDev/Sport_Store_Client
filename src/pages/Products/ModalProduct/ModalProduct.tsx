import './ModalProduct.scss';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { CategoryContext } from '../../../contexts/categoriesContext';
import { ProductContext } from '../../../contexts/productsContext';
import { AddProductResquest, UpdateProductResponse } from '../../../share/models/product';
import productApi from '../../../services/productApi';

interface ModalProductUserProps {
    open: boolean;
    onClick: () => void;
    dataUpdate: any;
}

const ModalProduct = (props: ModalProductUserProps) => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [videoid, setVideoid] = useState<string>('');
    const [quantity, setQuantity] = useState<number>();
    const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState<any>('');
    const [selectedFile, setSelectedFile] = useState<File>();

    const navigate = useNavigate();

    const categoryContext = useContext(CategoryContext);
    const productContext = useContext(ProductContext);

    useEffect(() => {
        setName(props.dataUpdate.name);
        setDesc(props.dataUpdate.desc);
        setVideoid(props.dataUpdate.videoid);
        setQuantity(props.dataUpdate.quantity);
        setPrice(props.dataUpdate.price);
        setCategory(props.dataUpdate.category._id);
        setCategoryName(props.dataUpdate.category.name);
        setPreviewSource(props.dataUpdate.thumbnail);
    }, [props.dataUpdate]);

    const changeCategoryHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget?.value);
    };

    const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget?.value);
    };

    const descChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.currentTarget?.value);
    };

    const videoidChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setVideoid(event.currentTarget?.value);
    };

    const quantityChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setQuantity(parseInt(event.currentTarget?.value));
    };

    const priceChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(parseInt(event.currentTarget?.value));
    };

    const previewFile = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            previewFile(file);
            setSelectedFile(file);
            setFileInputState(event.target.value);
        }
    };

    const Update = (key: any, data: any) => {
        if (productContext?.productList.length) {
            for (var i = 0; i < productContext?.productList.length; i++) {
                if (productContext?.productList[i]._id === key) {
                    // Delete product cũ
                    productContext?.setProductList(
                        productContext?.productList.filter((product: any) => {
                            return product._id !== key;
                        }),
                    );

                    // Add user new update
                    productContext?.setProductList([data, ...productContext?.productList]);
                    break;
                }
            }
        }
    };

    // Submit
    const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetForm = event.target as HTMLFormElement;
        if (previewSource === '') {
            if (!selectedFile) return;
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                const dataProductNew: AddProductResquest = {
                    name,
                    desc,
                    thumbnail: reader.result,
                    videoid,
                    quantity,
                    price,
                    category,
                };
                console.log(dataProductNew)

                productApi
                    .updateProduct(dataProductNew, props?.dataUpdate._id)
                    .then(() => {
                        resetForm.reset();
                        Update(props?.dataUpdate._id, dataProductNew);
                        alert('Update success');
                        navigate('/');
                    })
                    .catch((error: AxiosError<UpdateProductResponse>) => {
                        alert(error.response?.data);
                    });
            };
        } else {
            const dataProductNew: AddProductResquest = {
                name,
                desc,
                thumbnail: previewSource,
                videoid,
                quantity,
                price,
                category,
            };
            console.log(dataProductNew)

            productApi
                .updateProduct(dataProductNew, props?.dataUpdate._id)
                .then(() => {
                    resetForm.reset();
                    Update(props?.dataUpdate._id, dataProductNew);
                    alert('Update success');
                    navigate('/');
                })
                .catch((error: AxiosError<UpdateProductResponse>) => {
                    alert(error.response?.data);
                });
        }
    };

    return (
        <div className={`ModalProduct ${props.open ? 'open' : ''}`}>
            <div className="ModalProduct-container">
                <div className="ModalProduct-close" onClick={() => props.onClick()}>
                    <i className="ti-close">x</i>
                </div>

                <header className="ModalProduct-header">
                    <i className="ti-bag" style={{ paddingRight: '10px' }}></i>
                    Update
                </header>

                <div className="ModalProduct-body">
                    <form onSubmit={submitFormHandler}>
                        <label className="ModalProduct-label">Name product</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="name"
                            placeholder="Name product"
                            autoFocus
                            onChange={nameChangeHandler}
                            required
                            value={name}
                        />

                        <label className="ModalProduct-label">Description</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="description"
                            placeholder="Description"
                            onChange={descChangeHandler}
                            required
                            value={desc}
                        />

                        <label className="ModalProduct-label">Videoid</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="videoid"
                            placeholder="Videoid"
                            onChange={videoidChangeHandler}
                            required
                            value={videoid}
                        />

                        <label className="ModalProduct-label">Quantity</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="quantity"
                            placeholder="Quantity"
                            onChange={quantityChangeHandler}
                            required
                            value={quantity}
                        />

                        <label className="ModalProduct-label">Price</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="price"
                            placeholder="Price"
                            onChange={priceChangeHandler}
                            required
                            value={price}
                        />

                        <label className="role__choose">Category</label>
                        <select name="role" className="ModalProduct-label" onChange={changeCategoryHandler}>
                            <option value={category}>{categoryName}</option>
                            {categoryContext?.categoryList.map((cate: any) => (
                                <option value={cate._id} key={cate._id}>
                                    {cate.name}
                                </option>
                            ))}
                        </select>
                        <input
                            id="fileInput"
                            type="file"
                            name="image"
                            onChange={handleFileInputChange}
                            value={fileInputState}
                            className="form-input"
                        />

                        {previewSource && (
                            <img src={previewSource} alt="chosen" style={{ height: '150px', width: '150px' }} />
                        )}

                        <button className="pay-btn" type="submit">
                            PAY
                        </button>
                    </form>
                </div>

                <div className="ModalProduct-footer">
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

export default ModalProduct;
