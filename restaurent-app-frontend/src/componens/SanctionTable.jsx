import React, { useState, useEffect } from "react";
import "../style/main.css";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SanctionTable = ({ tableRef, data }) => {
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedSanction, setSelectedSanction] = useState(null);

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = data
        ? data.filter(row =>
            (row.fullname || "").toLowerCase().includes(search.toLowerCase()) ||
            (row.position || "").toLowerCase().includes(search.toLowerCase()) ||
            (row.reason || "").toLowerCase().includes(search.toLowerCase()) ||
            (row.status || "").toLowerCase().includes(search.toLowerCase())
        )
        : [];

    // Hiển thị theo số danh mục đã chọn
    const pagedData = filteredData.slice(0, pageSize);

    // Hàm sửa thông tin
    const editSanction = (sanction) => {
        setSelectedSanction(sanction);
        setShowEditModal(true);
    };

    // Hàm xử lý lưu thông tin đã sửa
    const handleEditSave = async (updatedSanction) => {
        try {
            // Chỉ gửi các trường cần thiết
            const payload = {
                id: updatedSanction.id,
                fullname: updatedSanction.fullname,
                dob: updatedSanction.dob,
                position: updatedSanction.position,
                reason: updatedSanction.reason,
                status: updatedSanction.status
            };
            await axios.put(
                `http://localhost:8080/api/auth/sanction/${updatedSanction.id}`,
                payload,
                { withCredentials: true }
            );
            setShowEditModal(false);
            setSelectedSanction(null);
            window.location.reload();
        } catch (error) {
            alert("Cập nhật thất bại: " + (error.response?.data?.message || error.message));
        }
    };

    // Hàm đóng modal
    const handleEditCancel = () => {
        setShowEditModal(false);
        setSelectedSanction(null);
    };


    const deleteSanction = (id) => {
        if (!id) {
            alert("ID không hợp lệ!");
            return;
        }
        axios.delete(`http://localhost:8080/api/auth/sanction/${id}`, { withCredentials: true })
            .then(response => {
                // Xử lý cập nhật lại bảng dữ liệu nếu cần
                window.location.reload(); // hoặc gọi hàm fetch lại data nếu có
            })
            .catch(error => {
                console.error("Error deleting sanction:", error);
                alert("Xóa thất bại: " + (error.response?.data?.message || error.message));
            });
    };

    // Badge màu cho tình trạng
    const getStatusBadge = (status) => {
        if (status === "Sa thải") return <span className="badge badge-danger" style={{background: "#ffd6d6", color: "#e74c3c", borderRadius: 6, padding: "4px 12px"}}>Sa thải</span>;
        if (status === "Khóa tài khoản") return <span className="badge badge-warning" style={{background: "#f7f7b6", color: "#7f8c1f", borderRadius: 6, padding: "4px 12px"}}>Khóa tài khoản</span>;
        return <span className="badge badge-secondary">{status}</span>;
    };

    return (
        <div className="tile">
            <div className="row mb-2">
                <div className="col-sm-6">
                    <label>
                        Hiện
                        <select
                            className="form-control form-control-sm d-inline-block mx-2"
                            style={{ width: 80 }}
                            value={pageSize}
                            onChange={e => setPageSize(Number(e.target.value))}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                        danh mục
                    </label>
                </div>
                <div className="col-sm-6 text-right">
                    <label>
                        Tìm kiếm:
                        <input
                            type="search"
                            className="form-control form-control-sm d-inline-block ml-2"
                            style={{ width: "auto" }}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </label>
                </div>
            </div>
            <table ref={tableRef} className="table table-hover table-bordered dataTable" >
                <thead>
                    <tr>
                        <th className="sorting_asc" style={{width: "13px"}}><input type="checkbox" /></th>
                        <th className="sorting_asc">Họ và Tên</th>
                        <th className="sorting_asc">Ngày sinh</th>
                        <th className="sorting_asc">Chức vụ</th>
                        <th className="sorting_asc">Lý do cấm</th>
                        <th className="sorting_asc">Tình trạng</th>
                        <th className="sorting_asc">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedData && pagedData.length > 0 ? (
                        pagedData.map((row, idx) => (
                            <tr key={idx}>
                                <td><input type="checkbox" /></td>
                                <td>{row.fullname}</td>
                                <td>{row.dob || row.birthDate}</td>
                                <td>{row.position}</td>
                                <td>{row.reason}</td>
                                <td>{getStatusBadge(row.status)}</td>
                                <td>
                                    <button
                                        className="btn-action delete"
                                        title="Xóa"
                                        onClick={() => deleteSanction(row.id)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                    </button>
                                    <button
                                        className="btn-action edit"
                                        title="Sửa"
                                        onClick={() => editSanction(row)}
                                    >
                                        <i className="fa fa-edit"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={7}>Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                Hiện {pagedData.length} / {filteredData.length} danh mục phù hợp
            </div>

            {/* Modal sửa thông tin */}
            {showEditModal && selectedSanction && (
                <div className="modal" style={{
                    display: "block",
                    background: "rgba(0,0,0,0.3)",
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 9999
                }}>
                    <div className="modal-dialog" style={{ marginTop: 100 }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Sửa thông tin xử phạt</h5>
                                <button type="button" className="close" onClick={handleEditCancel}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <EditSanctionForm
                                sanction={selectedSanction}
                                onSave={handleEditSave}
                                onCancel={handleEditCancel}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SanctionTable;

// Thêm component EditSanctionForm phía dưới cùng file này
function EditSanctionForm({ sanction, onSave, onCancel }) {
    const [form, setForm] = useState({
        fullname: sanction.fullname || "",
        dob: sanction.dob || sanction.birthDate || "",
        position: sanction.position || "",
        reason: sanction.reason || "",
        status: sanction.status || "",
        id: sanction.id // giữ lại id nếu có
    });

    useEffect(() => {
        setForm({
            fullname: sanction.fullname || "",
            dob: sanction.dob || sanction.birthDate || "",
            position: sanction.position || "",
            reason: sanction.reason || "",
            status: sanction.status || "",
            id: sanction.id
        });
    }, [sanction]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="modal-body">
                <div className="form-group">
                    <label>Họ và Tên</label>
                    <input
                        name="fullname"
                        className="form-control"
                        value={form.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Ngày sinh</label>
                    <input
                        name="dob"
                        className="form-control"
                        value={form.dob}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Chức vụ</label>
                    <input
                        name="position"
                        className="form-control"
                        value={form.position}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Lý do cấm</label>
                    <input
                        name="reason"
                        className="form-control"
                        value={form.reason}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Tình trạng</label>
                    <select
                        name="status"
                        className="form-control"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="">Chọn tình trạng</option>
                        <option value="Sa thải">Sa thải</option>
                        <option value="Khóa tài khoản">Khóa tài khoản</option>
                        <option value="Khác">Khác</option>
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Hủy</button>
                <button type="submit" className="btn btn-primary">Lưu</button>
            </div>
        </form>
    );
}