import React from "react";
import EmployeeTable from "../componens/EmployeeTable";
import Clock from "../componens/Clock";
import "../style/main.css";

const EmployeeManagement = () => {
    return (
        <main className="app-content">
            <div className="app-title">
                <ul className="app-breadcrumb breadcrumb">
                    <li className="breadcrumb-item active"><b>Danh sách nhân viên</b></li>
                </ul>
                <div id="clock"><Clock /></div>
            </div>
            <EmployeeTable />
        </main>
    );
};

export default EmployeeManagement;