import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import EmployeeForm from "../componens/EmployeeFrom";
import EmployeeTable from "../componens/EmployeeTable";
import Clock from "../componens/Clock";
import axios from "axios";
import "../style/main.css";

const EmployeeManagement = () => {
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isFixed, setIsFixed] = useState(false);
    const tableRef = useRef(null);
    const fileInputRef = useRef(null);

    // Lấy dữ liệu từ backend khi load trang
    useEffect(() => {
        axios.get("http://localhost:8080/api/auth/employee").then(res => setData(res.data));
    }, []);

    // Thêm mới nhân viên
    const handleAddEmployee = (newEmp) => {
        setData(prev => [newEmp, ...prev]);
        setShowForm(false);
    };

    // Xóa tất cả nhân viên
    const handleDeleteAll = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa tất cả nhân viên?")) {
            try {
                await axios.delete("http://localhost:8080/api/auth/employee/all");
                setData([]);
                alert("Đã xóa tất cả nhân viên thành công!");
            } catch (error) {
                alert("Xóa thất bại!");
            }
        }
    };

    // Nhập từ file Excel
    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setData(jsonData); // Hiển thị ngay dữ liệu lên bảng

            // Gửi file lên backend để lưu vào database (nếu backend hỗ trợ)
            const formData = new FormData();
            formData.append("file", file);
            axios.post("http://localhost:8080/api/auth/employees/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            }).then(res => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setData(res.data);
                }
            }).catch(() => {
                alert("Tải file lên thất bại!");
            });
        };
        reader.readAsBinaryString(file);
    };

    // Xuất Excel
    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
        XLSX.writeFile(workbook, "employees.xlsx");
    };

    // Xuất PDF
    const handleExportPDF = async () => {
        if (!tableRef.current) return;
        const canvas = await html2canvas(tableRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
        pdf.save("employees.pdf");
    };

    // In dữ liệu
    const handlePrint = () => {
        if (!tableRef.current) return;
        const printContents = tableRef.current.outerHTML;
        const printWindow = window.open("", "", "height=600,width=800");
        printWindow.document.write("<html><head><title>Print</title></head><body>");
        printWindow.document.write(printContents);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    // Sao chép
    const handleCopy = () => {
        const text = data.map(row => Object.values(row).join("\t")).join("\n");
        navigator.clipboard.writeText(text).then(() => {
            alert("Đã sao chép vào clipboard");
        });
    };

    // Hiển thị
    return (
        <main className={`app-content ${isFixed ? "fixed" : ""}`}>
            <div className="app-title">
                <ul className="app-breadcrumb breadcrumb side">
                    <li className="breadcrumb-item"><b>Quản lý nhân viên</b></li>
                    {showForm && <li className="breadcrumb-item"><span>Tạo mới</span></li>}
                </ul>
                <div id="clock"><Clock /></div>
            </div>
            {showForm ? (
                <EmployeeForm
                    onSubmit={handleAddEmployee}
                    onCancel={() => { setShowForm(false); setIsFixed(false); }}
                />
            ) : (
                <div className="row">
                    <div className="col-md-12">
                        <div className="tile">
                            <div className="tile-body">
                                <div className="row element-button">
                                    <div className="col-sm-2">
                                        <button className="btn btn-add btn-sm" onClick={() => { setShowForm(true); setIsFixed(true); }}>
                                            <i className="fas fa-plus"></i>Tạo mới
                                        </button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-delete btn-sm nhap-tu-file" type="button" onClick={() => fileInputRef.current.click()}>
                                            <i className="fas fa-file-upload"></i>Tải từ file
                                        </button>
                                        <input type="file" accept=".xlsx, .xls" ref={fileInputRef} style={{ display: "none" }} onChange={handleUpload} />
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-delete btn-sm print-file" type="button" onClick={handlePrint}>
                                            <i className="fas fa-print"></i>In dữ liệu
                                        </button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-delete btn-sm print-file js-testareaccopybtn" type="button" onClick={handleCopy}>
                                            <i className="fas fa-copy"></i>Sao chép
                                        </button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-excel btn-sm" type="button" onClick={handleExportExcel}>
                                            <i className="fas fa-file-excel"></i>Xuất Excel
                                        </button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-delete btn-sm pdf-file" type="button" onClick={handleExportPDF}>
                                            <i className="fas fa-file-pdf"></i>Xuất PDF
                                        </button>
                                    </div>
                                    <div className="col-sm-2">
                                        <button className="btn btn-delete btn-sm" type="button" onClick={handleDeleteAll}>
                                            <i className="fas fa-trash-alt"></i>Xóa tất cả
                                        </button>
                                    </div>
                                </div>
                                <EmployeeTable tableRef={tableRef} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default EmployeeManagement;