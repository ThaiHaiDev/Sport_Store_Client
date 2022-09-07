import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './AddCategory.scss';
import { AxiosError } from 'axios';
import { CategoryContext } from '../../../contexts/categoriesContext';
import { AddCategoryResquest } from '../../../share/models/category';
import categoryApi from '../../../services/categoryApi';

const AddCategory = () => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [countProduct, setCountProduct] = useState<number>(0);

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState<any>('');
    const [selectedFile, setSelectedFile] = useState<File>();

    const categoryContext = useContext(CategoryContext);

    const nameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget?.value);
    };

    const descChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setDesc(event.currentTarget?.value);
    };

    const countProductChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCountProduct(parseInt(event.currentTarget?.value));
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
            const dataCategoryNew: AddCategoryResquest = {
                name,
                desc,
                countProduct,
                image: reader.result
            };
            categoryApi.addCategory(dataCategoryNew)
            .then((data) => {
                categoryContext?.setCategoryList([...categoryContext.categoryList, data])
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
            alert('Add category failured');
        };
       
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card__body">
                        <p className="tittle__add">Please enter full category information</p> <br /> <hr /> <br /> <br />
                        <form onSubmit={submitFormHandler}>
                            <input
                                className="input_add-category"
                                type="text"
                                id="name"
                                placeholder="Name category"
                                autoFocus
                                onChange={nameChangeHandler}
                                required
                            />
                            <input
                                className="input_add-category"
                                type="text"
                                id="desc"
                                placeholder="Description"
                                onChange={descChangeHandler}
                                required
                            />
                            <input
                                className="input_add-category"
                                type="text"
                                id="countProduct"
                                placeholder="Count product"
                                onChange={countProductChangeHandler}
                                required
                            />
                            <label className="select__role">Image</label>
                            <input
                                id="fileInput"
                                type="file"
                                name="image"
                                onChange={handleFileInputChange}
                                value={fileInputState}
                                className="form-input"
                            />

                            {previewSource && <img src={previewSource} alt="chosen" style={{ height: '150px', width: '150px' }} />}

                            <br /> <br />

                            <button className="btn-save" type="submit">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
