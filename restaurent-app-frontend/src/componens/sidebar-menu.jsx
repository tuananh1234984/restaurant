import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../style/main.css";

const SidebarMenu = () => {
    const [user, setUser] = useState(null);
    const fileInputRef =  useRef(null);
    const [isFixed, setIsFixed] = useState(false);

    const handleLinkClick = () => {
        setIsFixed(true);
    }
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    useEffect(() => {
        if (user && user.username) {
            axios.get(`http://localhost:8080/api/auth/user/avatar?username=${user.username}`, {responseType: "arraybuffer"})
                .then(res => {
                    const blob = new Blob([res.data], {type: "image/jpeg"});
                    setUser(pre => ({...pre, avatar: URL.createObjectURL(blob)}));
                })
                .catch(() => {});
        }
    }, [user]);

    const handleAvatarChange = async (event) => {
        const file = event.target.file[0];
        if (!file || !user) return;
        const formData = new FormData();
        formData.append("file", file)
        formData.append("username", user.username);
        await axios.post("http://localhost:8080/api/auth/user/avatar", formData);
        const newAvatar = URL.createObjectURL(file);
        const updatedUser = {...user, avatar: newAvatar};
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };
    return (
        <>
        <div className="app-sidebar__overlay" data-toggel="sidebar"></div>
        <aside className={isFixed ? "app-sidebar fixed" : "app-sidebar"} >
            <div className="app-sidebar__user">
                <img
                  className="app-sidebar__user-avatar"
                  src={user?.avatar || "https://ui-avatars.com/api/?name=User&background=ddd&color=555"}
                  alt="User"
                  style={{width: "50px", cursor: "pointer", objectFit: "cover", borderRadius: "50%"}}
                  onClick={() => fileInputRef.current.click()}
                  title="Đổi ảnh đại diện"
                />
                <input type="file" accept="image/*" ref={fileInputRef} style={{display: "none"}} onChange={handleAvatarChange}></input>
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
                <li><Link className="app-menu_item " to="/InternalManagement" onClick={handleLinkClick}><i className="app-menu_icon bx bx-run"></i>
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