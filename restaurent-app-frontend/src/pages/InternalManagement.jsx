import React from "react";
import SanctionTable from "../componens/SanctionTable";
import Clock from "../componens/Clock";

const InternalManagement = () => {
    return (
        <main className="app-content">
            <div className="app-title">
                <ul className="app-breadcrumb breadcrumb side">
                    <li className="breadcrumb-item active"><b>Quản lý nhân viên</b></li>
                </ul>
                <div id="clock"><Clock /></div>
            </div>
            <SanctionTable />
        </main>
    );
};

export default InternalManagement;