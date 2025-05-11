import React, {useEffect, useState} from "react";
import "../style/main.css";
import axios from "axios";

const SanctionTable = () => {
    const [sanction, setSanction] = useState([]);

    useEffect(() => {
        fetchSanctions();
    }, []);

    const fetchSanctions = async () => {
        const response = await axios.get('http://localhost:8080/api/auth/SanctionForm');
        setSanction(response.data);
    };

    const deleteSanction = async (id) => {
        await axios.delete(`http://localhost:8080/api/auth/sanction/${id}`);
        fetchSanctions();
    };

    return (
        <table className="table table-hover table-bordered">
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
                {sanction.map((s, idx) => (
                    <tr key={idx}>
                        <td><input type="checkbox"/></td>
                        <td>{s.name}</td>
                        <td>{s.birthDate}</td>
                        <td>{s.position}</td>
                        <td>{s.reason}</td>
                        <td>
                            <span className={`badge ${s.status === 'Sa thải' ? 'bg-danger' : 'bg-success'}`}>{s.status}</span>
                        </td>
                        <td>
                            <button className="btn btn-primary btn-sm" onClick={() => deleteSanction(s.id)}>Xóa</button>
                            <button className="btn btn-primary btn-sm">Sửa</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SanctionTable;