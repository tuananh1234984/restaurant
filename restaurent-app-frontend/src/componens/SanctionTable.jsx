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
        axios.delete(`/api/sanctions/${id}`)
            .then(response => {
                console.log("Sanction deleted successfully:", response.data);
                // Optionally, refresh the data or update the UI
            })
            .catch(error => {
                console.error("Error deleting sanction:", error);
            });
    };

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <div className="dataTables_length" id="sampleTable_length"> 
                        <label>
                            Hiện
                            <select
                                className="form-control form-control-sm"
                                name="sampleTable_length"
                                aria-controls="sampleTable"
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
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="dataTables_filter" id="sampleTable_filter">
                        <label>
                            Tìm Kiếm:
                                <input
                                    type="search"
                                    className="form-control form-control-sm"
                                    aria-controls="sampleTable"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                />
                        </label>
                    </div>
                </div>
            </div>
            <table ref={tableRef} className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Họ và Tên</th>
                        <th>Ngày sinh</th>
                        <th>chức vụ</th>
                        <th>Lý do cấm</th>
                        <th>Tình trạng</th>
                        <th>Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedData && pagedData.length > 0 ? (
                        pagedData.map((row, idx) => (
                            <tr key={idx}>
                                <td><input type="checkbox" /></td>
                                <td>{row.name}</td>
                                <td>{row.birthDate}</td>
                                <td>{row.position}</td>
                                <td>{row.reason}</td>
                                <td>
                                    <span className={`badge ${row.status === 'Sa thải' ? 'bg-danger' : 'bg-success'}`}>{row.status}</span>
                                </td>
                                <td>
                                    <button className="btn btn-primary btn-sm" onClick={() => deleteSanction(row.id)}>Xóa</button>
                                    <button className="btn btn-primary btn-sm">Sửa</button>
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