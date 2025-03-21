import React, {useEffect, useState} from 'react';
import {ShoppingCartOutlined, SettingOutlined, BellOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';
import {Avatar, Dropdown} from "antd";
import {useNavigate} from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate()
    // Define the items for the dropdown menu
    const items = [
        {
            key: '1',
            label: 'Profile',
            icon: <UserOutlined />,
            onClick: () => console.log('Profile clicked')
        },
        {
            key: '2',
            label: 'Settings',
            icon: <SettingOutlined />,
            onClick: () => console.log('Settings clicked')
        },
        {
            type: 'divider'
        },
        {
            key: '3',
            label: 'Logout',
            icon: <LogoutOutlined />,
            onClick: () => {
                localStorage.removeItem('email');
                localStorage.removeItem('access_token');
                navigate('/auth')
                // Add any logout logic here
                console.log('Logout clicked');
            }
        }
    ];
    const [email, setEmail] = useState('');
    useEffect(() => {
        const mail = localStorage.getItem('email');
        setEmail(mail || '');
    }, [])
    return (
        <header className="bg-white p-3 flex items-center justify-between border-b">
            <div className="flex items-center">
                <div className="text-xl font-bold text-stone-800">
                    <ShoppingCartOutlined />
                    <span className="ml-1">NEOMART</span>
                </div>
            </div>

            <div className="flex items-center space-x-4 mr-2">
                <div className="flex items-center">
                    <Avatar style={{ backgroundColor: '#f6edf9', color: '#fe16c7', fontSize: '18px' }} size="large">J</Avatar>
                    <span className="ml-3">Hello, {email}</span>
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']}>
                        <SettingOutlined className="ml-2 text-xl cursor-pointer"/>
                    </Dropdown>
                </div>
                <BellOutlined className="text-xl"/>
                {/*<div className="flex items-center">*/}
                {/*    <img src="/api/placeholder/24/16" alt="Canadian flag" className="mr-1" />*/}
                {/*    <span>EN</span>*/}
                {/*</div>*/}
            </div>
        </header>
    );
}