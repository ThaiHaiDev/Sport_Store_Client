import React, { useContext, useState } from 'react'

import Table from '../../components/Table/Table'
import ModalCategory from './ModalCategory/ModalCategory'
import './Categories.scss'
import AddCategory from './FormCategory/AddCategory'
import { useNavigate } from 'react-router-dom'
import { CategoryContext } from '../../contexts/categoriesContext'
import categoryApi from '../../services/categoryApi'

const customerTableHead = [
    '',
    'Name',
    'Slug',
    'Description',
    'Count Product',
    'Image',
    '',
    ''
]

const renderHead = (item:any, index:number) => <th key={index}>{item}</th>

const Categories = (props: any) => {
    const [onAddCategory, setOnAddCategory] = useState<Boolean>(false)
    const [categoryUpdate, setCategoryUpdate] = useState(null)
    const categoriesContext = useContext(CategoryContext)

    const navigate = useNavigate()

    const renderBody = (item:any, index:any) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.name}</td>
            <td>{item.slug}</td>
            <td>{item.desc}</td>
            <td>{item.countProduct}</td>
            <td>{item.image ? 'false' : 'true'}</td>
            <td onClick={() => handleDeleteCategory(item._id)} className="btn"><img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png" alt='icon__delete' className='icon__btn'/></td>
            <td onClick={() => handleUpdateCategory(item)} className="btn"><img src="https://img.icons8.com/color/48/000000/edit--v1.png" alt='icon__update' className='icon__btn'/></td>
        </tr>
    )

    const handleDeleteCategory = (idCate: string) => {
        categoryApi.deleteCategory(idCate).then(() => {
            categoriesContext?.setCategoryList(
                categoriesContext?.categoryList.filter((cate:any) => {
                    return cate._id !== idCate;
                }),
            )
            navigate('/')
        })
    }

    const handleUpdateCategory = async(cate: any) => {
        await setCategoryUpdate(cate)
        setOnModal(true)
    }

    const [onModal, setOnModal] = useState(false)

    const handleSetModal = () => {
        setOnModal(false)
    }

    return (
        <div>
            <div className='header__category'>
                <h2 className="page-header">
                    Categories
                </h2>
                <button className='btn__add-category' onClick={() => setOnAddCategory(!onAddCategory)}>
                    <p className='icon'>{onAddCategory ? '' : '+'}</p>
                    <p className='text'>{onAddCategory ? 'List categories' : 'Add category'}</p>
                </button>
            </div>
            {categoryUpdate && <ModalCategory open={onModal} onClick={handleSetModal} dataUpdate={categoryUpdate} />}
            {!onAddCategory ? <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item:any, index:any) => renderHead(item, index)}
                                bodyData={props.data}
                                renderBody={(item:any, index:any) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div> : <AddCategory />}
        </div>
    )
}

export default Categories