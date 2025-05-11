import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "../style/main.css";

const SidebarMenu = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    return (
        <>
        <div className="app-sidebar__overlay" data-toggel="sidebar"></div>
        <aside className="app-sidebar">
            <div className="app-sidebar__user">{user && ( <><img className="app-sidebar__user-avatar" src={user.avatar} alt="User" style={{width: "50px"}}></img></>)}
                <div>
                    <p className="app-sidebar__user-name">{user && user.name}</p>
                    <p className="app-sidebar_user-designation">Chào mừng bạn trở lại</p>
                </div>
            </div>
            <hr/>
            <ul className="app-menu">
                <li><a className="app-menu_item haha" href="index.html"><i className="app-menu_icon bx bx-cart-alt"></i>
                    <span className="app-menu_label">POS Bán Hàng</span></a></li>
                <li><a className="app-menu_item active" href="index.html"><i className="app-menu_icon bx bx-tachometer"></i>
                    <span className="app-menu_label">Bảng điều khiển</span></a></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-id-card"></i>
                    <span className="app-menu_label">Quản lý nhân viên</span></a></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-user-voice"></i>
                    <span className="app-menu_label">Quản lý Khách hàng</span></a></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-purchase-tag-alt"></i>
                    <span className="app-menu_label">Quản lý sản phẩm</span></a></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-task"></i>
                    <span className="app-menu_label">Quản lý đơn hàng</span></a></li>
                <li><Link className="app-menu_item " to={"/InternalManagement"}><i className="app-menu_icon bx bx-run"></i>
                    <span className="app-menu_label">Quản lý nội bộ</span></Link></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-dollar"></i>
                    <span className="app-menu_label">Bảngs kê lương</span></a></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-pie-chart-alt-2"></i>
                    <span className="app-menu_label">Báo cáo doanh thu</span></a></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-calendar-check"></i>
                    <span className="app-menu_label">Lịch công tác</span></a></li>
                <li><a className="app-menu_item " href="index.html"><i className="app-menu_icon bx bx-cog"></i>
                    <span className="app-menu_label">Cài đặt hệ thống</span></a></li>
            </ul>
        </aside>
        </>
    )
};

export default SidebarMenu