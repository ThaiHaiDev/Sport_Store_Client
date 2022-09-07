import './ModalCategory.scss';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { AddCategoryResquest, UpdateCategoryResponse } from '../../../share/models/category';
import categoryApi from '../../../services/categoryApi';
import { CategoryContext } from '../../../contexts/categoriesContext';

interface ModalCategoryUserProps {
    open: boolean;
    onClick: () => void;
    dataUpdate: any;
}

const ModalCategory = (props: ModalCategoryUserProps) => {
    const [name, setName] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [countProduct, setCountProduct] = useState<number>(0);

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState<any>('');
    const [selectedFile, setSelectedFile] = useState<File>();

    const navigate = useNavigate();
    const categoryContext = useContext(CategoryContext);
    console.log(props.dataUpdate)

    useEffect(() => {
        setName(props.dataUpdate.name);
        setDesc(props.dataUpdate.desc);
        setCountProduct(props.dataUpdate.countProduct);
        setPreviewSource(props.dataUpdate.image);
    }, [props.dataUpdate]);

    
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

    const Update = (key:any, data:any) => {
        if(categoryContext?.categoryList.length) {
            for (var i = 0; i < categoryContext?.categoryList.length; i++) {
                if (categoryContext?.categoryList[i]._id === key) {
                    // Delete user cũ
                    categoryContext?.setCategoryList(
                        categoryContext?.categoryList.filter((user:any) => {
                            return user._id !== key;
                        }),
                    )
    
                    // Add user new update
                    categoryContext?.setCategoryList([data, ...categoryContext.categoryList])
                    break;
                }
            }
        }
    }


    // Submit
    const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetForm = event.target as HTMLFormElement;
        if (previewSource === '') {
            if (!selectedFile) return;
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                const dataCateNew : AddCategoryResquest = {
                    name,
                    desc,
                    image: reader.result,
                    countProduct
                };

                categoryApi
                .updateCategory(dataCateNew, props?.dataUpdate._id)
                .then(() => {
                    resetForm.reset();
                    Update(props?.dataUpdate._id, dataCateNew)
                    alert('Update success');
                    navigate('/')
                })
                .catch((error: AxiosError<UpdateCategoryResponse>) => {
                    alert(error.response?.data);
                });
            }
        } else {
            const dataCateNew : AddCategoryResquest = {
                name,
                desc,
                image: previewSource,
                countProduct
            };
            
            categoryApi
                .updateCategory(dataCateNew, props?.dataUpdate._id)
                .then(() => {
                    resetForm.reset();
                    Update(props?.dataUpdate._id, dataCateNew)
                    alert('Update success');
                    navigate('/')
                })
                .catch((error: AxiosError<UpdateCategoryResponse>) => {
                    alert(error.response?.data);
                });
        }
    };

    return (
        <div className={`modalCategory ${props.open ? 'open' : ''}`}>
            <div className="modalCategory-container">
                <div className="modalCategory-close" onClick={() => props.onClick()}>
                    <i className="ti-close">x</i>
                </div>

                <header className="modalCategory-header">
                    <i className="ti-bag" style={{ paddingRight: '10px' }}></i>
                    Update
                </header>

                <div className="modalCategory-body">
                    <form onSubmit={submitFormHandler}>
                        <label className="modalCategory-label">Name category</label>
                        <input
                                className="modalCategory-input"
                                type="text"
                                id="name"
                                placeholder="Name category"
                                autoFocus
                                onChange={nameChangeHandler}
                                value={name}
                                required
                            />

                        <label className="modalCategory-label">Description</label>
                        <input
                                className="modalCategory-input"
                                type="text"
                                id="desc"
                                placeholder="Description"
                                onChange={descChangeHandler}
                                value={desc}
                                required
                            />

                        <label className="modalCategory-label">Count product</label>
                        <input
                                className="modalCategory-input"
                                type="text"
                                id="countProduct"
                                placeholder="Count product"
                                onChange={countProductChangeHandler}
                                value={countProduct}
                                required
                            />

                        <div className='role__choose'>
                            <label className="modalCategory-label">Image: </label>
                            <input
                                id="fileInput"
                                type="file"
                                name="image"
                                onChange={handleFileInputChange}
                                value={fileInputState}
                                className="form-input"
                            />

                            {previewSource && <img src={previewSource} alt="chosen" style={{ height: '150px', width: '150px' }} />}
                        </div>

                        <button className="pay-btn" type="submit">
                            Update
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ModalCategory;
