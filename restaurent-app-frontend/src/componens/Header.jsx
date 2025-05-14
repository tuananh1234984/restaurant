import React, { useEffect} from "react";
import "../style/main.css";

const Header = () => {

    useEffect(() => {
        if (typeof window.time === "function") {
            window.time();
        }
    }, []);

    //Hàm toggle sidebar
    const toggleSidebar = () => {
        document.body.classList.toggle("sidebar-opened");
    };
    return (
        <>
        <title>Danh sách nhân viên | Quản trị admin</title>
        <header className="app-header">
            <button className="app-sidebar__toggle" onClick={toggleSidebar} data-toggle="sidebar" aria-label="Hidden Siderbar"></button>
            <ul className="app-nav">
                <li><a className="app-nav__item" href="index.html"><i className="bx bx-log-out bx-rotate-180"></i></a></li>
            </ul>
        </header>
        </>
    );
};

export default Header;