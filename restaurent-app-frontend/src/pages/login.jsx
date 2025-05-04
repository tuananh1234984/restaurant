import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "jquery-ui/ui/widgets/datepicker";
import "../utils/util.css";
import "../style/login.css";
import team from "../assets/images/team.jpg";

function Login() {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigate = useNavigate();
    const validate = async () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password-field").value;

        if (username === '' || password === ''){
            window.alert("Vui lòng đăng nhập đầy đủ thông tin");
            return;
        }
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
                credentials: "include",
            });
            const isJson = response.headers.get("content-type")?.includes("application/json");
            const result = isJson ? await response.json() : null;
            if (response.ok) {
                window.alert("✅ " + result.message);
                navigate("/HomePage");
            }else{
                window.alert("❌ " + result.message);
            }
        }catch (error){
            console.error(error);
            window.alert("Lỗi kết nối server")
        }
    };
//show - hide mật khẩu
    const togglePasswordVisibility= () => {
        setPasswordVisible(!passwordVisible);
        const passwordField = document.getElementById("password-field");
        if (passwordField.type === "password") {
            passwordField.type = "text";
        } else {
            passwordField.type = "password";
        }
    }

    return(
        <>
        <title>Đăng nhập quản trị | Website quản trị v3.0</title>
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100">
                    <div className="login100-pic js-tilt" data-tilt>
                        <img src={team} alt="Team" />
                    </div>
                    {/* Tiêu đề  */}
                    <form className="login100-form validate-form">
                        <span className="login100-form-title">
                            <b>ĐĂNG NHẬP HỆ THỐNG POS</b>
                        </span>
                        {/* FORM INPUT TÀI KHOẢN VÀ PASSWORD  */}
                        <form action="">
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" placeholder="Tài khoản quản trị" name="username" id="username"/>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="bx bx-user"></i>
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <input autoComplete="off" className="input100" type={passwordVisible ? "text" : "password"} placeholder="Mật khẩu" name="password" id="password-field"/>
                                <span onClick={togglePasswordVisibility} className="bx fa-fw bx-hide field-icon click-eye"></span>
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="bx bx-key"></i>
                                </span>
                            </div>
                            {/* ĐĂNG NHẬP  */}
                            <div className="container-login100-form-btn">
                                <input type="button" className="login100-form-btn" value="Đăng nhập" onClick={validate}/>
                            </div>
                            {/* LINK TÌM MẬT KHẨU  */}
                            <div className="text-right p-t-12">
                                <Link className="txt2" to={"/forgot-password"}>
                                    Bạn quên mật khẩu?
                                </Link>
                            </div>
                        </form>
                        {/* Footer  */}
                        <div className="text-center p-t-70 txt2">
                            Phần mềm quản lý bán hàng  <i className="far fa-copyright" aria-hidden="true"></i>
                            {new Date().getFullYear()}{" "}
                            <a className="txt2" href="https://www.facebook.com/hoangphamit" target="_blank" rel="noreferrer"></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;