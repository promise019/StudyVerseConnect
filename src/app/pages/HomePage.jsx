import { NavLink, Outlet } from "react-router";
import NavigationBar from "./layout/NavigationBar";

export default function HomePage() {

    return (
        <div className="h-[fit-content] px-3 py-10 space-y-8 lightmode md:px-30 lg:px-[10%] lg:space-x-10  ">
            <h1 className="text-transparent bg-gradient-to-r from-gray-400 via-blue-600 to-blue-900 bg-clip-text
              font-bold text-3xl text-center md:text-4xl lg:text-6xl
            ">
                Dive In & Connect
            </h1>

            <NavigationBar/>

            <Outlet/>
        </div>
    )
}