import React, { useState} from "react";
import { Link } from "react-router-dom";
import SanctionTable from "../componens/SanctionTable";
import Clock from "../componens/Clock";


const InternalManagement = () => {
    const [file, setFile] = useState(null);
    const [isFixed, setIsFixed] = useState(false);
        const handleLinkClick = () => {
            setIsFixed(true);
        }

    //file upload from local
        
    return (
        <main className={`app-content ${isFixed ? "fixed" : ""}`}>
            <div className="app-title">
                <ul className="app-breadcrumb breadcrumb side">
                    <li className="breadcrumb-item active"><b>Quản lý nội bộ</b></li>
                </ul>
                <div id="clock"><Clock /></div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="tile">
                        <div className="tile-body">
                            <div className="row element-button">
                                <div className="col-sm-2">
                                    <Link className="btn btn-add btn-sm" to="/SanctionForm" onClick={handleLinkClick} title="Thêm"><i className="fas fa-plus"></i>Tạo mới</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SanctionTable />
        </main>
    );
};

export default InternalManagement;