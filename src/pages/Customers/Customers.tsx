import React, { useState } from 'react'

import Table from '../../components/Table/Table'

import customerList from '../../assets/JsonData/customers-list.json'
import Modal from '../../components/Modal/Modal'

const customerTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total orders',
    'total spend',
    'location',
    '',
    ''
]

const renderHead = (item:any, index:number) => <th key={index}>{item}</th>


const Customers = () => {
    const renderBody = (item:any, index:any) => (
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.total_orders}</td>
            <td>{item.total_spend}</td>
            <td>{item.location}</td>
            <td onClick={() => alert(`Delete ${item.id}`)} className="btn">X</td>
            <td onClick={() => {setOnModal(true)}} className="btn">U</td>
        </tr>
    )

    const [onModal, setOnModal] = useState(false)

    const handleSetModal = () => {
        setOnModal(false)
    }

    return (
        <div>
            <h2 className="page-header">
                customers
            </h2>
            <Modal open={onModal} onClick={handleSetModal}/>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item:any, index:any) => renderHead(item, index)}
                                bodyData={customerList}
                                renderBody={(item:any, index:any) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Customers
