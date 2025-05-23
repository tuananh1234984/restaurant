import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "jquery-ui/ui/widgets/datepicker";
import "../utils/util.css";
import "../style/login.css";
import team from "../assets/images/team.jpg";

function Login() {
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    const validate = async () => {
        if (username === '' || password === ''){
            window.alert("Vui lòng nhập đầy đủ thông tin");
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
            const result = isJson ? await response.json() : {};
            if (response.ok) {
                window.alert("✅ " + result.message);
                navigate("/HomePage");
            }else{
                const message = result.message || `Lỗi ${response.status} : ${response.statusText}`;
                window.alert("❌ " + message);
            }
        }catch (error){
            console.error("login error", error);
            window.alert("Lỗi kết nối server")
        }
    };
//show - hide mật khẩu
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
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
                            <div className="wrap-input100 validate-input">
                                <input className="input100" type="text" placeholder="Tài khoản quản trị" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                                <span className="focus-input100"></span>
                                <span className="symbol-input100">
                                    <i className="bx bx-user"></i>
                                </span>
                            </div>
                            <div className="wrap-input100 validate-input">
                                <input autoComplete="off" className="input100" type={passwordVisible ? "text" : "password"} placeholder="Mật khẩu" name="password" value={password} onChange={e => setPassword(e.target.value)} />
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
                        {/* Footer  */}
                        <div className="text-center p-t-70 txt2">
                            Phần mềm quản lý bán hàng  <i className="far fa-copyright" aria-hidden="true"></i>
                            {new Date().getFullYear()}{" "}
                            <a className="txt2" href="https://www.facebook.com/hoangphamit" target="_blank" rel="noreferrer">
                                Facebook
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;