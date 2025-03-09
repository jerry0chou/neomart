import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "../pages/Auth.tsx";
import Error from "../pages/Error.tsx";
import MainLayout from "./MainLayout.tsx";
import Home from "../pages/Home.tsx";
import NotFound from "../pages/NotFound.tsx";

export default function NeoRouter(){
    return (
        <Router>
            <Routes>
                <Route path="/auth" element={<Auth/>}/>
                <Route path="/error" element={<Error/>}/>
                {/* MainLayout中的路由 */}
                <Route path="/"
                       element={<MainLayout>
                           <Routes>
                               <Route path="/" element={<Home/>}/>
                               {/* 其他需要MainLayout的路由 */}
                           </Routes>
                       </MainLayout>}
                />
                {/* 404路由放在最外层的最后 */}
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    )
}