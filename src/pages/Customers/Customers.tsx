import React, { useContext, useState } from 'react'

import Table from '../../components/Table/Table'
import Modal from './ModalCustomer/Modal'
import userApi from '../../services/userApi'
import './Customers.scss'
import AddCustomer from './FormCustomer/AddCustomer'
import { UserContext } from '../../contexts/usersContext'
import { useNavigate } from 'react-router-dom'

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
    const [onAddUser, setOnAddUser] = useState<Boolean>(false)
    const [userUpdate, setUserUpdate] = useState(null)
    const userContext = useContext(UserContext)

    const navigate = useNavigate()

    const renderBody = (item:any, index:any) => (
        <tr key={index}>
            <td>{index}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.status ? 'false' : 'true'}</td>
            <td>{item.isAdmin}</td>
            <td onClick={() => handleDeleteUser(item._id)} className="btn"><img src="https://img.icons8.com/plasticine/100/000000/filled-trash.png" alt='icon__delete' className='icon__btn'/></td>
            <td onClick={() => handleUpdateUser(item)} className="btn"><img src="https://img.icons8.com/color/48/000000/edit--v1.png" alt='icon__update' className='icon__btn'/></td>
        </tr>
    )

    const handleDeleteUser = (idUser: string) => {
        userApi.deleteUser(idUser).then(() => {
            userContext?.setUserList(
                userContext?.userList.filter((user:any) => {
                    return user._id !== idUser;
                }),
            )
            navigate('/')
        })
    }

    const handleUpdateUser = async(user: any) => {
        await setUserUpdate(user)
        setOnModal(true)
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
            {userUpdate && <Modal open={onModal} onClick={handleSetModal} dataUpdate={userUpdate} />}
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