import React from "react";
import "./main.css";

const Header = () => {
    return (
        <>
        <title>Danh sách nhân viên | Quản trị admin</title>
        <body onLoad="time()" className="app sidebar-mini rtl">
            <header className="app-header">
                <a className="app-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hidden"></a>
                <ul className="app-nav">
                    <li><a className="app-nav__item" href="index.html"><i className="bx bx-log-out bx-rotate-180"></i></a></li>
                </ul>
            </header>
        </body>
        </>
    );
};

export default Header;