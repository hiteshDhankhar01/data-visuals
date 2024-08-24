import {
    ChartNoAxesCombined,
    LayoutDashboard,
    ShoppingBag,
    UsersRound,
} from "lucide-react";

export const navLinks = [
    {
        url: "/",
        icon: <LayoutDashboard />,
        label: "Dashboard",
    },
    {
        url: "/sales",
        icon: <ChartNoAxesCombined />,
        label: "Sales",
    },

    {
        url: "/orders",
        icon: <ShoppingBag />,
        label: "Orders",
    },
    {
        url: "/customers",
        icon: <UsersRound />,
        label: "Customers",
    },
];


