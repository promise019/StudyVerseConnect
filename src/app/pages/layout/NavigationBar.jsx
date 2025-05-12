import { NavLink } from "react-router";

export default function NavigationBar(){
    return (
        <nav className="navigation w-full sticky top-1">

                <NavLink to='buddies' className={({isActive})=> isActive ? 'nav-active nav' : 'nav-not-acitve nav'}>
                    find buddies
                </NavLink>

                <NavLink to='AI_tutor' className={({isActive})=> isActive ? 'nav-active nav' : 'nav-not-acitve nav'}>
                    AI Tutor
                </NavLink>

                <NavLink to='friend_lists' className={({isActive})=> isActive ? 'nav-active nav' : 'nav-not-acitve nav'}>
                    Friends
                </NavLink>

                <NavLink to='groups' className={({isActive})=> isActive ? 'nav-active nav' : 'nav-not-acitve nav'}>
                    Groups
                </NavLink>

            </nav>

    )
}