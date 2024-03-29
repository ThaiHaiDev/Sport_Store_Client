import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import './Sidebar.scss';

import logo from '../../assets/images/inside-sport-logo.png';

import SidebarItem from './SidebarItem';

import SidebarData from '../../utils/sidebarData';

const Sidebar = (props: any) => {
    const location = useLocation();
    const activeItem = SidebarData.All.findIndex((item) => item.route === location.pathname);
    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <img src={logo} alt="company logo" />
            </div>

            <p className="sub__header">Overview</p>
            {SidebarData.Overview.map((item, index) => (
                <Link to={item.route} key={item.id}>
                    <SidebarItem title={item.display_name} icon={item.icon} active={item.id === activeItem} />
                </Link>
            ))}

            <p className="sub__header">Manage</p>
            {SidebarData.Manage.map((item, index) => (
                <Link to={item.route} key={item.id}>
                    <SidebarItem title={item.display_name} icon={item.icon} active={item.id === activeItem} />
                </Link>
            ))}

            <p className="sub__header">Setting</p>
            {SidebarData.Setting.map((item, index) => (
                <Link to={item.route} key={item.id}>
                    <SidebarItem title={item.display_name} icon={item.icon} active={item.id === activeItem} />
                </Link>
            ))}
        </div>
    );
};

export default Sidebar;
