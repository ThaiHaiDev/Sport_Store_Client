import React, { ChangeEvent, useContext } from 'react'

import './Navbar.scss'

import { Link } from 'react-router-dom'

import Dropdown from '../Dropdown/Dropdown'

import ThemeMenu from '../Thememenu/Thememenu'

import notifications from '../../assets/JsonData/notification.json'

import user_menu from '../../assets/JsonData/user_menus.json'
import { SearchContext } from '../../contexts/searchContext'

const curr_user = {
    display_name: 'Hai Nguyen',
    image: 'https://avatars.githubusercontent.com/u/85157423?v=4'
}

const renderNotificationItem = (item: any, index: any) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserToggle = (user:any) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)

const renderUserMenu =(item:any, index:any) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const Topnav = () => {
    const searchContext = useContext(SearchContext);

    const searchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        searchContext?.setSearchText(event.currentTarget?.value);
    };
    
    return (
        <div className='topnav'>
            <div className="topnav__search">
                <input type="text" placeholder='Search here...' onChange={searchChangeHandler}/>
                <i className='bx bx-search'></i>
            </div>
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item:any, index:any) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='12'
                        contentData={notifications}
                        renderItems={(item:any, index:any) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    <ThemeMenu/>
                </div>
            </div>
        </div>
    )
}

export default Topnav
