import React, {useEffect, useState} from "react";
import "../style/main.css";
import axios from "axios";

const SanctionTable = ({ tableRef, data }) => {
    const deleteSanction = (id) => {
        // Implement the logic for deleting a sanction, e.g., making an API call
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
        <table ref={tableRef} className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th><input type="checkbox"/></th>
                    <th>Họ và Tên</th>
                    <th>Ngày sinh</th>
                    <th>chức vụ</th>
                    <th>Lý do cấm</th>
                    <th>Tình trạng</th>
                    <th>Chức năng</th>
                </tr>
            </thead>
            <tbody>
                {data && data.length > 0 ? (
                    data.map((row, idx) => (
                        <tr key={idx}>
                            <td><input type="checkbox"/></td>
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
    </div>
    );
};

export default SanctionTable;