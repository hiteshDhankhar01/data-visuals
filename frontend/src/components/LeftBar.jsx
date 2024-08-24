
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


// "use client"

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import { navLinks } from "../../lib/constants";

// const LeftSideBar = () => {
//     const pathname = usePathname();

//     return (
//         <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
//             <img src="https://www.shutterstock.com/image-vector/increasing-stocks-icon-trendy-logo-600nw-1255577029.jpg" alt="logo" className="h-4 w-4 object-contain" />

//             <div className="flex flex-col gap-12">
//                 {navLinks.map((link) => (
//                     <Link
//                         href={link.url}
//                         key={link.label}
//                         className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : "text-grey-1"
//                             }`}
//                     >
//                         {link.icon} <p>{link.label}</p>
//                     </Link>
//                 ))}
//             </div>

            
//         </div>
//     );
// };

// export default LeftSideBar;
