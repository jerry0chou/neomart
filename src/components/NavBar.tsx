import React from 'react';
import {ShoppingCartOutlined, SettingOutlined, BellOutlined} from '@ant-design/icons';
import {Avatar} from "antd";

export default function Navbar() {
    return (
        <header className="bg-white p-4 flex items-center justify-between border-b">
            <div className="flex items-center">
                <div className="text-4xl font-bold text-stone-800">
                    <ShoppingCartOutlined />
                    <span className="ml-1">NEOMART</span>
                </div>
            </div>

            <div className="flex items-center space-x-4 mr-2">
                <div className="flex items-center">
                    <Avatar style={{ backgroundColor: '#f6edf9', color: '#fe16c7', fontSize: '20px' }} size="large">P</Avatar>
                    <span className="ml-3">Hello, Jerry</span>
                    <SettingOutlined className="ml-2 text-2xl"/>
                </div>
                <BellOutlined className="text-2xl"/>
                {/*<div className="flex items-center">*/}
                {/*    <img src="/api/placeholder/24/16" alt="Canadian flag" className="mr-1" />*/}
                {/*    <span>EN</span>*/}
                {/*</div>*/}
            </div>
        </header>
    );
}