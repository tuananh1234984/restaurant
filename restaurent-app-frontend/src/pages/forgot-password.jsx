import React from "react";
import "../utils/util.css";
import "../style/login.css";
import { Link } from "react-router-dom";
import fg from "../assets/images/fg-img.png";

function Forgotpassword () {
    const [email, setEmail] = React.useState("");
    const [setMessage] = React.useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === "") {
            setMessage("Vui lòng nhập email");
        } else {
            console.log("Gửi yêu cầu khôi phục tới: ", email);
            setMessage("Vui lòng kiểm tra email của bạn để khôi phục mật khẩu");
        }
    };

    return (
        <>
            <title>Quên mật khẩu | Website quản trị v3.0</title>
            <div className="limiter">
                <div className="container-login100">
                    <div className="wrap-login100">
                        <div className="login100-pic js-tilt" data-tilt>
                            <img src={fg} alt="Forgot Password" />
                        </div>
                        <form className="login100-form validate-form" onSubmit={handleSubmit}>
                            <span className="login100-form-title">
                                <b>KHÔI PHỤC MẬT KHẨU</b>
                            </span>
                            <form action="custommer.html">
                                <div className="wrap-input100 validate-input" data-validate="Bạn cần đăng nhập đúng thông tin như: ex@abc.xyz">
                                    <input className="input100" type="text" placeholder="Nhập email" name="emailInput" id="emailInput" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <span className="focus-input100"></span>
                                    <span className="symbol-input100">
                                        <i className="bx bx-mail-send"></i>
                                    </span>
                                </div>
                                <div className="container-login100-form-btn">
                                    <input type="button" onClick="return RegexEmail('emailInput')" value="Lấy mật khẩu"/>
                                </div>
                                <div className="text-center p-t-12">
                                    <Link to={"/Login"} className="txt2">
                                        Trở về đăng nhập
                                    </Link>
                                </div>
                            </form>
                            <div className="text-center p-t-70 txt2">
                                Phần mềm quản trị nhà hàng <i className="fa fa-copyright" aria-hidden="true"></i>
                                {new Date().getFullYear()}{" "}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Forgotpassword;