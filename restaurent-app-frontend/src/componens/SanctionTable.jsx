import React, { useState } from "react";
import "../style/main.css";
import axios from "axios";
import '@fortawesome/fontawesome-free/css/all.min.css';

const SanctionTable = ({ tableRef, data }) => {
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filteredData = data
        ? data.filter(row =>
            (row.name || "").toLowerCase().includes(search.toLowerCase()) ||
            (row.position || "").toLowerCase().includes(search.toLowerCase()) ||
            (row.reason || "").toLowerCase().includes(search.toLowerCase()) ||
            (row.status || "").toLowerCase().includes(search.toLowerCase())
        )
        : [];

    // Hiển thị theo số danh mục đã chọn
    const pagedData = filteredData.slice(0, pageSize);

    const deleteSanction = (id) => {
        if (!id) {
            alert("ID không hợp lệ!");
            return;
        }
        axios.delete(`http://localhost:8080/api/auth/sanction/${id}`, { withCredentials: true })
            .then(response => {
                // Xử lý cập nhật lại bảng dữ liệu nếu cần
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
                                <td>{row.name}</td>
                                <td>{row.birthday || row.birthDate}</td>
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
                                        // onClick={...} // Thêm hàm sửa nếu có
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
        </div>
    );
};

export default SanctionTable;