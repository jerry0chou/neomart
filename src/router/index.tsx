import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth.tsx";
import Error from "../pages/Error.tsx";
import MainLayout from "./MainLayout.tsx";
import Home from "../pages/Home.tsx";
import NotFound from "../pages/NotFound.tsx";
import Cart from "../pages/Cart.tsx";
import ProductDetail from "../pages/ProductDetail.tsx";

export default function NeoRouter(){
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/error" element={<Error/>}/>
                {/* - using wildcard path as suggested by the error */}
                <Route path="/*"
                       element={<MainLayout>
                           <Routes>
                               <Route path="/" element={<Home/>}/>
                               <Route path="/cart" element={<Cart/>}/>
                               <Route path="/product/:productId" element={<ProductDetail/>}/>
                           </Routes>
                       </MainLayout>}
                />

                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}