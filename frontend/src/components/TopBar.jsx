import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { navLinks } from "../lib/constants";
import logo from '../../public/logo.png'

const TopBar = () => {
    const [dropdownMenu, setDropdownMenu] = useState(false);
    const location = useLocation();

    return (
        <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-gray-900 shadow-md lg:hidden rounded-b-lg">
            <h2 className="flex items-center text-white font-bold text-md border-b-2 rounded-md p-1">
    <img
        src={logo}
        alt="logo"
        className="h-8 w-8 object-contain mr-3"
    />
    Data Visuals
</h2>

            <div className="hidden md:flex gap-8 items-center">
                {navLinks.map((link) => (
                    <Link
                        to={link.url}
                        key={link.label}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${location.pathname === link.url
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-blue-200 hover:text-gray-900"
                            }`}
                    >
                        <p className="text-lg font-semibold">{link.label}</p>
                    </Link>
                ))}
            </div>

            <div className="relative flex items-center gap-4">
                <Menu
                    className="text-white cursor-pointer text-2xl md:hidden"
                    onClick={() => setDropdownMenu(!dropdownMenu)}
                />
                {dropdownMenu && (
                    <div className="absolute top-12 right-6 w-48 flex flex-col gap-4 p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                        {navLinks.map((link) => (
                            <Link
                                to={link.url}
                                key={link.label}
                                className={`flex text-white items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-300 ${location.pathname === link.url
                                        ? "bg-blue-600 text-white"
                                        : "text-gray-800 hover:bg-blue-50"
                                    }`}
                            >
                                {link.icon}
                                <p className="text-base font-medium">{link.label}</p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopBar;
