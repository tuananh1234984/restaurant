import React, {useRef, useState} from "react";
import "../style/main.css";
import {useForm} from "react-hook-form";
import axios from "axios";

const EmployeeForm = ({onSubmit, onCancel}) => {
    const [from, setForm] = useState({
        id:"",
        fullname:"",
        email: "",
        address: "",
        phone: "",
        dob:"",
        birthplace:"",
        cmnd:"",
        cmndDate:"",
        cmndPlace:"",
        gender:"",
        position:"",
        degree:"",
        marial:"",
        avatar:"",
        avartarUrl:"",
    });

    const fileInputRef = useRef();

    const handleChange = (e) => {
        const {name, value, type, files} = e.target;
        if (type === "file" && files[0]) {
            setForm((prev) => ({
                ...prev,
                avatar: files[0],
                avartarUrl: URL.createObjectURL(files[0])
            }));
        }else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/auth/employee", from, { withCredentials: true });
            alert("Thêm nhân viên thành công!");
            if (onSubmit) onSubmit(from);
        } catch (error) {
            alert("Lỗi khi thêm nhân viên!");
        }
    };
    return (
        <main className="app-content">
            <div className="app-tile">
                <ul className="app-breadcrumb breadcrumb">
                    <li className="breadcrumb-item active">Danh sách nhân viên</li>
                    <li className="breadcrumb-item">
                        <a href="#">Thêm nhân viên</a>
                    </li>
                </ul>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Tạo mới nhân viên</h3>
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <button className="btn btn-primary"
                                        type="button"
                                        onClick={() => alert("Chức năng tạo chức vụ mới")}
                                    >
                                        <b>
                                            <i className="fas fa-foder-plus"></i>Tạo chức vụ mới
                                        </b>
                                    </button>
                                </div>
                            </div>
                            <from className="row" onSubmit={handleSubmit}>
                                <div className="form-group col-md-4">
                                    <label className="control-label">ID nhân viên</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="id"
                                        value={from.id}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Họ và tên</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="fullname"
                                        value={from.fullname}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Địa chỉ email</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        name="email"
                                        value={from.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Địa chỉ thường trú</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="address"
                                        value={from.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Số điện thoại</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="phone"
                                        value={from.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Ngày sinh</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="dob"
                                        value={from.dob}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">nơi sinh</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="birthplace"
                                        value={from.birthplace}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Số CMND</label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="cmnd"
                                        value={from.cmnd}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Ngày cấp</label>
                                    <input
                                        className="form-control"
                                        type="date"
                                        name="cmndDate"
                                        value={from.cmndDate}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Nơi cấp</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        name="cmndPlace"
                                        value={from.cmndPlace}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Giới Tính</label>
                                    <select
                                        className="form-control"
                                        name="gender"
                                        value={from.gender}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Chọn giới tính--</option>
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Chức vụ</label>
                                    <select
                                        className="form-control"
                                        name="position"
                                        value={from.position}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Chọn chức vụ--</option>
                                        <option>bán hàng</option>
                                        <option>Tư vấn</option>
                                        <option>Dịch vụ</option>
                                        <option>Thu ngân</option>
                                        <option>Quản kho</option>
                                        <option>Bảo trì</option>
                                        <option>Kiểm hàng</option>
                                        <option>Bảo vệ</option>
                                        <option>tạp vụ</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Bằng cấp</label>
                                    <select
                                        className="form-control"
                                        name="degree"
                                        value={from.degree}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Chọn bằng cấp--</option>
                                        <option>Tốt nghiệp Đại Học</option>
                                        <option>Tốt nghiệp Cao Đẳng</option>
                                        <option>Tốt nghiệp Phổ thông</option>
                                        <option>Chưa tốt nghiệp</option>
                                        <option>Không bằng cấp</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-3">
                                    <label className="control-label">Tình trạng hôn nhân</label>
                                    <select
                                        className="form-control"
                                        name="marial"
                                        value={from.marial}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">--Chọn tình trạng hôn nhân--</option>
                                        <option>Độc thân</option>
                                        <option>Đã kết hôn</option>
                                        <option>Góa</option>
                                        <option>Khác</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="control-label">Ảnh 3x4 nhân viên</label>
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        onChange={handleChange}
                                    />
                                    {from.avartarUrl && (
                                        <div type={{marginTop: "10px"}}>
                                            <img
                                            src={from.avartarUrl}
                                            alt="Thummb"
                                            height={120}
                                            style={{borderRadius: 8, border: "1px solid #ccc"}}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm ml-2"
                                                onClick={() => 
                                                    setForm((prev) => ({
                                                        ...prev,
                                                        avatar: null,
                                                        avartarUrl: "",
                                                    }))
                                                }
                                            >
                                                Xóa ảnh
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="col-12 mt-3">
                                    <button className="btn btn-save" type="submit">
                                        Lưu lại
                                    </button>
                                    <button className="btn btn-cancel ml-2" type="button" onClick={onCancel}>
                                        Hủy bỏ
                                    </button>
                                </div>
                            </from>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EmployeeForm;