import React from "react";
import {ShoppingCartOutlined} from "@ant-design/icons";

export default function Cart(){
    return (
        <div className="ml-4 relative">
            <ShoppingCartOutlined className="text-4xl"/>
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
        </div>
    )
}