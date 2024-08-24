
import { NavLink} from "react-router-dom";
import { navLinks } from "../lib/constants";
import logo from '../../public/logo.png'


const LeftSideBar = () => {
    return (
        <div className="h-screen left-0 top-0 sticky p-6 px-8 flex flex-col gap-8 bg-gray-800 shadow-lg rounded-r-md max-lg:hidden">
            <h2 className="flex items-center text-white font-bold text-xl border-b-2 rounded-md p-2">
    <img
        src={logo}
        alt="logo"
        className="h-12 w-12 object-contain mr-3"
    />
    Data Visuals
</h2>


    
        <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
                <NavLink
                    to={link.url}
                    key={link.label}
                    className={({ isActive }) =>
                        `flex items-center gap-4 p-3 rounded-lg transition-colors duration-300 ${
                            isActive ? "bg-blue-500 text-white" : "text-gray-300 hover:bg-blue-200 hover:text-gray-900"
                        }`
                    }
                >
                    <span className="text-xl">{link.icon}</span>
                    <p className="text-lg font-semibold">{link.label}</p>
                </NavLink>
            ))}
        </div>
    </div>
    
    
    );
};

export default LeftSideBar;