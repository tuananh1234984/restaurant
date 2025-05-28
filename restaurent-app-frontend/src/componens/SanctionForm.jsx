import React, { useState } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import "../style/main.css";

const DEFAULT_STATUSES = ["Sa thải", "Khóa tài khoản"];

const SanctionForm = ({ onSubmit, onCancel }) => {
    const [form, setForm] = useState({
        fullname: '',
        dob: '',
        position: '',
        reason: '',
        status: '',
    });
    const [statuses, setStatuses] = useState(DEFAULT_STATUSES);
    const [showModal, setShowModal] = useState(false);
    const [newStatus, setNewStatus] = useState('');

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/sanction", form);
            if (onSubmit) onSubmit(res.data);
            setForm({
                fullname: '',
                dob: '',
                position: '',
                reason: '',
                status: '',
            });
        } catch (error) {
            alert("Lưu thất bại!");
        }
    };

    const handleAddStatus = (e) => {
        e.preventDefault();
        if (newStatus && !statuses.includes(newStatus)) {
            setStatuses([...statuses, newStatus]);
            setForm({ ...form, status: newStatus });
        }
        setNewStatus('');
        setShowModal(false);
    };

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <h3 className="tile-title">Tạo mới danh sách nội bộ</h3>
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <button
                                        className="btn btn-add btn-sm"
                                        type="button"
                                        onClick={() => setShowModal(true)}
                                    >
                                        <b>
                                            <i className="fas fa-folder-plus"></i>
                                            Tạo tình trạng mới
                                        </b>
                                    </button>
                                </div>
                            </div>
                            <form className="row" onSubmit={handleSubmit}>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Họ và tên</label>
                                    <input className="form-control" type="text" name="fullname" value={form.fullname} onChange={handleChange}/>
                                </div>
                                <div className="form-group col-md-4">
                                    <label className="control-label">Ngày sinh</label>
                                    <input className="form-control" type="date" name="dob" value={form.dob} onChange={handleChange}/>
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
                                    <select
                                        className="form-control"
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        <option value="">-- Chọn tình trạng --</option>
                                        {statuses.map((status, idx) => (
                                            <option key={idx} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                            <div className="tile-footer mt-3">
                                <button className="btn btn-save" type="button" onClick={handleSubmit}>Lưu lại</button>
                                <button className="btn btn-cancel" type="button" onClick={onCancel}>Hủy bỏ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Đặt modal ở ngoài cùng, không lồng trong .row hay .tile */}
            {showModal && ReactDOM.createPortal(
                <>
                    <div
                        className="modal fade show"
                        tabIndex={-1}
                        style={{
                            display: "block",
                            zIndex: 1051, // Đảm bảo cao hơn backdrop
                            paddingRight: "15px",
                        }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <h5>Tạo tình trạng mới</h5>
                                        </div>
                                        <div className="form-group col-md-12">
                                            <label className="control-label">Nhập tình trạng</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={newStatus}
                                                onChange={e => setNewStatus(e.target.value)}
                                                required
                                                autoFocus
                                            />
                                        </div>
                                        <div className="form-group col-md-12 mt-2">
                                            <button className="btn btn-save" type="button" onClick={handleAddStatus}>Lưu lại</button>
                                            <button className="btn btn-cancel ms-2" type="button" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="modal-backdrop fade show"
                        style={{ zIndex: 1050 }}
                    ></div>
                </>,
                document.body
            )}
        </>
    );
};

export default SanctionForm;