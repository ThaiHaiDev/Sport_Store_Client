import React, { useContext, useState } from 'react'

import Table from '../../components/Table/Table'
import ModalProduct from './ModalProduct/ModalProduct'
import './Products.scss'
import AddProduct from './FormProduct/AddProduct'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../../contexts/productsContext'
import productApi from '../../services/productApi'

const customerTableHead = [
    '',
    'Name',
    'Slug',
    'Desc',
    'Videoid',
    'Quantity',
    'Price',
    'OutOfStock',
    '',
    ''
]

const renderHead = (item:any, index:number) => <th key={index}>{item}</th>

const Products = (props: any) => {
    const [onAddProduct, setOnAddProduct] = useState<Boolean>(false)
    const [productUpdate, setProductUpdate] = useState(null)
    const productContext = useContext(ProductContext)

    const navigate = useNavigate()

    const renderBody = (item:any, index:any) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.name}</td>
            <td>{item.slug}</td>
            <td>{item.desc}</td>
            <td>{item.videoid  ? 'false' : 'true'}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
            <td>{item.isOutOfStock}</td>
            <td onClick={() => handleDeleteProduct(item._id)} className="btn"><img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png" alt='icon__delete' className='icon__btn'/></td>
            <td onClick={() => handleUpdateProduct(item)} className="btn"><img src="https://img.icons8.com/color/48/000000/edit--v1.png" alt='icon__update' className='icon__btn'/></td>
        </tr>
    )

    const handleDeleteProduct = (idProduct: string) => {
        productApi.deleteProduct(idProduct).then(() => {
            productContext?.setProductList(
                productContext?.productList.filter((product:any) => {
                    return product._id !== idProduct;
                }),
            )
            navigate('/')
        })
    }

    const handleUpdateProduct = async(product: any) => {
        await setProductUpdate(product)
        setOnModal(true)
    }

    const [onModal, setOnModal] = useState(false)

    const handleSetModal = () => {
        setOnModal(false)
    }

    return (
        <div>
            <div className='header__product'>
                <h2 className="page-header">
                    Products
                </h2>
                <button className='btn__add-product' onClick={() => setOnAddProduct(!onAddProduct)}>
                    <p className='icon'>{onAddProduct ? '' : '+'}</p>
                    <p className='text'>{onAddProduct ? 'List Products' : 'Add product'}</p>
                </button>
            </div>
            {productUpdate && <ModalProduct open={onModal} onClick={handleSetModal} dataUpdate={productUpdate} />}
            {!onAddProduct ? <div className="row">
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
            </div> : <AddProduct />}
        </div>
    )
}

export default Products