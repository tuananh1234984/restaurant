import React, { useState, useRef} from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SanctionTable from "../componens/SanctionTable";
import Clock from "../componens/Clock";


const InternalManagement = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [data, setData] = useState([]);
    const tableRef = useRef(null);
    const fileInputRef = useRef(null); // Thêm ref cho input file

    const handleLinkClick = () => {
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
                                    <Link className="btn btn-add btn-sm" to="/SanctionForm" onClick={handleLinkClick} title="Thêm"><i className="fas fa-plus"></i>Tạo mới</Link>
                                </div>
                                <div className="col-sm-2">
                                    {/* Nút bấm sẽ trigger input file */}
                                    <a className="btn btn-delete btn-sm nhap-tu-file" type="button" title="Nhập" onClick={handleUploadClick}>
                                        <i className="fas fa-file-upload"></i>Tải từ file
                                    </a>
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
                                    <a className="btn btn-delete btn-sm print-file" type="button" title="In" onClick={handlePrint}><i className="fas fa-print"></i>In dữ liệu</a>
                                </div> 
                                <div className="col-sm-2">
                                    <a className="btn btn-delete btn-sm print-file js-testareaccopybtn" type="button" title="Sao chép" onClick={handleCopy}><i className="fas fa-copy"></i>Sao chép</a>
                                </div>
                                <div className="col-sm-2">
                                    <a className="btn btn-excel btn-sm" type="button" title="Xuat Excel" onClick={handleExportExcel}><i className="fas fa-file-excel"></i>Xuất Excel</a>
                                </div>
                                <div className="col-sm-2">
                                    <a className="btn btn-delete btn-sm pdf-file" type="button" title="In" onClick={handleExportPDF}><i className="fas fa-file-pdf"></i>Xuat PDF</a>
                                </div>
                                <div className="col-sm-2">
                                    <a className="btn btn-delete btn-sm" type="button" title="Xóa tất cả" onClick={handleDeleteAll}><i className="fas fa-trash-alt"></i>Xóa tất cả</a>
                                </div>
                            </div>
                            <div id="sampleTable-wrapper" className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                <div className="row">
                                    <div className="col-sm-12 col-md-6">
                                        <div className="dataTables_length" id="sampleTable_length">
                                            <label>
                                                "Hiện"
                                                <select className="sampleTable_length" aria-controls="sampleTable" class="form-control form-control-sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                "danh mục"
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="sol-sm-12">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SanctionTable tableRef={tableRef} data={data} />
        </main>
    );
};

export default InternalManagement;