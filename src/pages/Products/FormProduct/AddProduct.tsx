import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './AddProduct.scss';
import { AxiosError } from 'axios';
import { CategoryContext } from '../../../contexts/categoriesContext';
import { AddProductResquest } from '../../../share/models/product';
import productApi from '../../../services/productApi';
import { ProductContext } from '../../../contexts/productsContext';

const AddProduct = () => {
    const [name, setName] = useState<string>('')
    const [desc, setDesc] = useState<string>('')
    const [videoid, setVideoid] = useState<string>('')
    const [quantity, setQuantity] = useState<number>()
    const [price, setPrice] = useState<number>();
    const [category, setCategory] = useState<string>('');
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState<any>('');
    const [selectedFile, setSelectedFile] = useState<File>();

    const categoryContext = useContext(CategoryContext);
    const productContext = useContext(ProductContext);
    
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

    // Submit 
    const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetForm = event.target as HTMLFormElement;
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
                category
            };
            console.log(dataProductNew)
            productApi.addProduct(dataProductNew)
            .then((data) => {
                productContext?.setProductList([...productContext.productList, data])
                resetForm.reset();
                setFileInputState('')
                setPreviewSource('')
                alert('Add success')
            })
            .catch((error: AxiosError<any>) => {
                alert(error.response?.data?.message)
            })
        };
        reader.onerror = () => {
            alert('Add product failured');
        };
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card__body">
                        <p className="tittle__add">Please enter full product information</p> <br /> <hr /> <br /> <br />
                        <form onSubmit={submitFormHandler}>
                            <input
                                className="input_add-user"
                                type="text"
                                id="name"
                                placeholder="Name product"
                                autoFocus
                                onChange={nameChangeHandler}
                                required
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="description"
                                placeholder="Description"
                                onChange={descChangeHandler}
                                required
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="videoid"
                                placeholder="Videoid"
                                onChange={videoidChangeHandler}
                                required
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="quantity"
                                placeholder="Quantity"
                                onChange={quantityChangeHandler}
                                required
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="price"
                                placeholder="Price"
                                onChange={priceChangeHandler}
                                required
                            />

                            <label className="select__role">Category</label>
                            <select name="role" className="select" onChange={changeCategoryHandler}>
                                <option value=''>------</option>
                                {categoryContext?.categoryList.map((cate: any) => (<option value={cate._id} key={cate._id}>{cate.name}</option>))}
                            </select>
                            <input
                                id="fileInput"
                                type="file"
                                name="image"
                                onChange={handleFileInputChange}
                                value={fileInputState}
                                className="form-input"
                                required
                            />

                            {previewSource && <img src={previewSource} alt="chosen" style={{ height: '150px', width: '150px' }} />}

                            <br /> <br />
                            <button className='btn-save' type="submit">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
