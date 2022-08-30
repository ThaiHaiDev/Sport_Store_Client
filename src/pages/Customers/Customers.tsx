import React, { useState } from 'react'

import Table from '../../components/Table/Table'
import Modal from './ModalCustomer/Modal'
import userApi from '../../services/userApi'
import './Customers.scss'
import AddCustomer from './FormCustomer/AddCustomer'

const customerTableHead = [
    '',
    'Fisrt name',
    'Last name',
    'Email',
    'Phone',
    'Status',
    'Role',
    '',
    ''
]

const renderHead = (item:any, index:number) => <th key={index}>{item}</th>

const Customers = (props: any) => {
    const [onAddUser, setOnAddUser] = useState<Boolean>(true)
    const [userUpdate, setUserUpdate] = useState()

    const renderBody = (item:any, index:any) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.status ? 'false' : 'true'}</td>
            <td>{item.isAdmin}</td>
            <td onClick={() => handleDeleteUser(item._id)} className="btn">X</td>
            <td onClick={() => handleUpdateUser(item)} className="btn">U</td>
        </tr>
    )

    const handleDeleteUser = (idUser: string) => {
        userApi.deleteUser(idUser).then(() => {
            alert(`Delete ${idUser}`)
        })
    }

    const handleUpdateUser = (user: any) => {
        setOnModal(true)
        setUserUpdate(user)
    }

    const [onModal, setOnModal] = useState(false)

    const handleSetModal = () => {
        setOnModal(false)
    }

    return (
        <div>
            <div className='header__customer'>
                <h2 className="page-header">
                    customers
                </h2>
                <button className='btn__add-customer' onClick={() => setOnAddUser(!onAddUser)}>
                    <p className='icon'>{onAddUser ? '' : '+'}</p>
                    <p className='text'>{onAddUser ? 'List user' : 'Add user'}</p>
                </button>
            </div>
            <Modal open={onModal} onClick={handleSetModal} dataUpdate={userUpdate} />
            {!onAddUser ? <div className="row">
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
            </div> : <AddCustomer />}
        </div>
    )
}

export default Customers