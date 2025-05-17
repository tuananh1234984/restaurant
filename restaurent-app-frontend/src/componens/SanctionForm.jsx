import React, { useState} from "react";
import axios from "axios";
import "../style/main.css";

const SanctionForm = ({ onSubmit }) => {
    const [form, setForm] = useState({
        name: '',
        birthday: '',
        position: '',
        reason: '',
        status: '',
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi dữ liệu lên backend
            const res = await axios.post("/api/auth/sanction", form);
            if (onSubmit) onSubmit(res.data); // Truyền dữ liệu vừa lưu về cho component cha
            setForm({
                name: '',
                birthday: '',
                position: '',
                reason: '',
                status: '',
            });
        } catch (error) {
            alert("Lưu thất bại!");
        }
    };

    return(
        <main className="app-content">
            <div className="app-title">
                <ul className="app-breadcrumb breadcrumb">
                    <li className="breadcrumb-item">Quản lý nội bộ</li>
                    <li className="breadcrumb-item"><a href="#">Tạo mới</a></li>
                </ul>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Tạo mới danh sách nội bộ</h3>
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <button className="btn btn-add btn-sm">
                                        <b><i className="fas fa-folder-plus"></i>Tạo tình trạng mới</b>
                                    </button>
                                </div>
                            </div>
                            <form className="row" onSubmit={handleSubmit}>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Họ và tên</label>
                                    <input className="form-control" type="text" name="name" value={form.name} onChange={handleChange}/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Ngày sinh</label>
                                    <input className="form-control" type="date" name="birthday" value={form.birthday} onChange={handleChange}/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Chức vụ</label>
                                    <select className="form-control" type="text" name="position" value={form.position} onChange={handleChange}>
                                        <option value="">-- Chọn chức vụ --</option>
                                        <option>Bán hàng</option>
                                        <option>Tư vấn</option>
                                        <option>Dịch vụ</option>
                                        <option>Thu ngân</option>
                                        <option>Quản kho</option>
                                        <option>Bảo trì</option>
                                        <option>Kiểm hàng</option>
                                        <option>Bảo vệ</option>
                                        <option>Tạp vụ</option>
                                    </select>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Nhập lý do</label>
                                    <textarea className="form-control" rows="4" name="reason" value={form.reason} onChange={handleChange}></textarea>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Tình trạng</label>
                                    <select className="form-control" name="status" value={form.status} onChange={handleChange}>\
                                        <option value="">-- Chọn tình trạng --</option>
                                        <option>Sa thải</option>
                                        <option>Khóa tài khoản</option>
                                    </select>
                                </div>
                            </form>
                            <div className="tile-footer mt-3">
                                <button className="btn btn-save" type="button" onClick={handleSubmit}>Lưu lại</button>
                                <button className="btn btn-cancel" type="button">Hủy bỏ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SanctionForm;