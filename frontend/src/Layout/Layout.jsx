import Routers from "../Routes/routes"
import LeftSideBar from "../components/LeftBar";
import TopBar from "../components/TopBar";

const Layout = () => {
    return (
        <>
            <div className="flex max-lg:flex-col text-grey-1 min-h-screen bg-gray-900">
                <LeftSideBar />
                <div className="flex-1 flex flex-col">
                    <TopBar />
                    <div className="flex-1 p-4 text-white ">
                        <Routers />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout