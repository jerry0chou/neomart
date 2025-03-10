import React, {useEffect, useState} from 'react';
import {ShoppingCartOutlined, SettingOutlined, BellOutlined} from '@ant-design/icons';
import {Avatar} from "antd";

export default function Navbar() {
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
                    <SettingOutlined className="ml-2 text-xl"/>
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