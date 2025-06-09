import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../style/main.css";

const EmployeeTable = () => {
    const [employees, setEmployees] = useState([]);
    const [search, setSearch] = useState("");
    const [pageSize, setPageSize] = useState(10);

    // Lấy dữ liệu nhân viên từ backend khi load trang
    useEffect(() => {
        axios.get("http://localhost:8080/api/auth/employee")
            .then(res => setEmployees(res.data))
            .catch(() => setEmployees([]));
    }, []);

    // Lọc dữ liệu theo từ khóa tìm kiếm
    const filtered = employees.filter(emp =>
        (emp.fullname || "").toLowerCase().includes(search.toLowerCase()) ||
        (emp.position || "").toLowerCase().includes(search.toLowerCase()) ||
        (emp.address || "").toLowerCase().includes(search.toLowerCase())
    );

    const pagedData = filtered.slice(0, pageSize);

    // Xử lý xóa nhân viên
    const deleteEmployee = (id) => {
        if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
            axios.delete(`http://localhost:8080/api/auth/employee/${id}`)
                .then(() => window.location.reload());
        }
    };

    const deleteAllEmployees = () => {
        if (window.confirm("Bạn có chắc muốn xóa tất cả nhân viên?")) {
            axios.delete("http://localhost:8080/api/auth/employee/all")
                .then(() => window.location.reload());
        }
    };

    return (
        <div className="tile">
            <div className="row element-button">
                <div className="col-sm-2">
                    <button className="btn btn-add btn-sm" title="Thêm"><i className="fas fa-plus"></i> Tạo mới nhân viên</button>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-delete btn-sm nhap-tu-file" title="Thêm"><i className="fas fa-file-upload"></i>Tải từ file</button>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-delete btn-sm print-file" title="Thêm"><i className="fas fa-print"></i>In dữ liệu</button>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-delete btn-sm print-file js-testareaccopybtn" title="Thêm"><i className="fas fa-copy"></i>Sao chép</button>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-excel btn-sm" title="Thêm"><i className="fas fa-file-excel"></i>Xuất excel</button>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-delete btn-sm pdf-file" title="Thêm"><i className="fas fa-file-pdf"></i>Xuất PDF</button>
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-delete btn-sm" title="Thêm" onClick={deleteAllEmployees}><i className="fas fa-trash-alt"></i>Xóa tất cả</button>
                </div>
            </div>
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
                        </select>
                        nhân viên
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
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>ID nhân viên</th>
                        <th>Họ và tên</th>
                        <th>Ảnh thẻ</th>
                        <th>Địa chỉ</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>SĐT</th>
                        <th>Chức vụ</th>
                        <th>Tính năng</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedData.length > 0 ? pagedData.map((emp, idx) => (
                        <tr key={emp.id || idx}>
                            <td><input type="checkbox" /></td>
                            <td>{emp.code || emp.id}</td>
                            <td>{emp.fullname}</td>
                            <td>
                                <img className="img-card-person" src={emp.avatarUrl || "/img-anhthe/default.jpg"} alt="" style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }} />
                            </td>
                            <td>{emp.address}</td>
                            <td>{emp.dob}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.phone}</td>
                            <td>{emp.position}</td>
                            <td>
                                <button className="btn btn-primary btn-sm trash" title="Xóa" onClick={() => deleteEmployee(emp.id)}>
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                                <button className="btn btn-primary btn-sm edit" title="Sửa">
                                    <i className="fas fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={10}>Không có dữ liệu</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div>
                Hiện {pagedData.length} / {filtered.length} nhân viên phù hợp
            </div>
        </div>
    );
};

export default EmployeeTable;