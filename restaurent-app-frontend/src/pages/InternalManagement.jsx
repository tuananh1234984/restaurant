import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SanctionForm from "../componens/SanctionForm";
import SanctionTable from "../componens/SanctionTable";
import Clock from "../componens/Clock";
import axios from "axios";

const InternalManagement = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [data, setData] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const tableRef = useRef(null);
    const fileInputRef = useRef(null); // Thêm ref cho input file

    // Lấy dữ liệu từ backend khi load trang
    useEffect(() => {
        axios.get("http://localhost:8080/api/auth/sanction").then(res => setData(res.data));
    }, []);

    // Khi thêm mới thành công, cập nhật bảng
    const handleAddSanction = (newSanction) => {
        setData(prev => [newSanction, ...prev]);
        setShowForm(false); // Ẩn form sau khi thêm
    };

    const handleLinkClick = () => {
        setShowForm(true); // Hiện form khi bấm "Tạo mới"
        setIsFixed(true);
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const sheetName = workbook.SheetNames[0];;
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            setData(jsonData);
        };
        reader.readAsBinaryString(file);
    };

    const handlePrint = () => {
        if (!tableRef.current) {
            alert("Không tìm thấy bảng dữ liệu để in!");
            return;
        }
        const printContents = tableRef.current.outerHTML;
        const printWindow = window.open("", "", "height=600,width=800");
        printWindow.document.write("<html><head><title>Print</title>");
        printWindow.document.write('<link rel="stylesheet" href="/path/to/your/table/styles.css">');
        printWindow.document.write("</head><body>");
        printWindow.document.write(printContents);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    };

    const handleCopy = () => {
        const text = data.map(row => Object.values(row).join("\t")).join("\n");
        navigator.clipboard.writeText(text).then(() => {
            alert("Đã sao chép vào clipboard");
        });
    };

    const handleExportExcel = () => {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet);
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const file = new Blob([excelBuffer], {type: "application/actet-stream"});
        saveAs(file, "data.xlsx");
    };

    const handleExportPDF = async () => {
        const canvas = await html2canvas(tableRef.current);
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProgs = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProgs.height * pdfWidth) / imgProgs.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("data.pdf");
    }

    const handleDeleteAll = () => {
        if (window.confirm("Bạn có chắc muốn xóa tất cả không?")){
            setData([]);
        }
    };

    // Sửa lại hàm này: chỉ trigger click vào input file
    const handleUploadClick = () => {
        fileInputRef.current.click();
    };
        
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
                                    <button className="btn btn-add btn-sm" onClick={handleLinkClick} title="Thêm">
                                        <i className="fas fa-plus"></i>Tạo mới
                                    </button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-delete btn-sm nhap-tu-file" type="button" title="Nhập" onClick={handleUploadClick}>
                                        <i className="fas fa-file-upload"></i>Tải từ file
                                    </button>
                                    {/* Input file ẩn */}
                                    <input
                                        type="file"
                                        accept=".xlsx, .xls"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleUpload}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-delete btn-sm print-file" type="button" title="In" onClick={handlePrint}>
                                        <i className="fas fa-print"></i>In dữ liệu
                                    </button>
                                </div> 
                                <div className="col-sm-2">
                                    <button className="btn btn-delete btn-sm print-file js-testareaccopybtn" type="button" title="Sao chép" onClick={handleCopy}>
                                        <i className="fas fa-copy"></i>Sao chép
                                    </button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-excel btn-sm" type="button" title="Xuất Excel" onClick={handleExportExcel}>
                                        <i className="fas fa-file-excel"></i>Xuất Excel
                                    </button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-delete btn-sm pdf-file" type="button" title="Xuất PDF" onClick={handleExportPDF}>
                                        <i className="fas fa-file-pdf"></i>Xuất PDF
                                    </button>
                                </div>
                                <div className="col-sm-2">
                                    <button className="btn btn-delete btn-sm" type="button" title="Xóa tất cả" onClick={handleDeleteAll}>
                                        <i className="fas fa-trash-alt"></i>Xóa tất cả
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Chỉ render form khi showForm = true */}
            {showForm && (
                <SanctionForm onSubmit={handleAddSanction} />
            )}
            <SanctionTable tableRef={tableRef} data={data} />
        </main>
    );
};

export default InternalManagement;