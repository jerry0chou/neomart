import {useNavigate} from "react-router-dom";
import Navbar from "../components/NavBar.tsx";
import {useEffect} from "react";


interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    // const navigate = useNavigate()
    useEffect(()=>{
        // const token = localStorage.getItem('token')
        // if(!token || token.length == 0){
        //     navigate('/login')
        //     return
        // }
    }, [])

    return (
        <div className="flex h-screen">
            {/* Main Content */}
            <div className="flex flex-col flex-1 min-w-0">
                {/* Header */}
                <Navbar />
                {/* Page Content */}
                <div className="flex-1 p-6 overflow-y-auto ">{children}</div>
            </div>
        </div>
    );

}
export default MainLayout;