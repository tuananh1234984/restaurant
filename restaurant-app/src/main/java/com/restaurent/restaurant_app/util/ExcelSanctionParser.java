package com.restaurent.restaurant_app.util;

import com.restaurent.restaurant_app.dto.SanctionDTO;
import org.apache.poi.ss.usermodel.*;
import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelSanctionParser {
    public static List<SanctionDTO> parse(InputStream is) throws Exception {
        List<SanctionDTO> sanctions = new ArrayList<>();
        Workbook workbook = null;
        try {
            workbook = WorkbookFactory.create(is);
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            if (rows.hasNext()) rows.next(); // Bỏ qua header

            while (rows.hasNext()) {
                Row row = rows.next();
                SanctionDTO dto = new SanctionDTO();
                dto.setId(getCellIntValue(row.getCell(0)));
                dto.setFullname(getCellStringValue(row.getCell(1)));
                dto.setDob(getCellStringValue(row.getCell(2)));
                dto.setPosition(getCellStringValue(row.getCell(3)));
                dto.setReason(getCellStringValue(row.getCell(4)));
                dto.setStatus(getCellStringValue(row.getCell(5)));
                sanctions.add(dto);
            }
        } finally {
            if (workbook != null) {
                workbook.close();
            }
        }
        return sanctions;
    }

    // Thêm phương thức tiện ích để lấy giá trị String từ Cell
    private static String getCellStringValue(Cell cell) {
        if (cell == null) return null;
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf(cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                // Trả về giá trị đã tính toán thay vì công thức
                FormulaEvaluator evaluator = cell.getSheet().getWorkbook().getCreationHelper().createFormulaEvaluator();
                CellValue cellValue = evaluator.evaluate(cell);
                switch (cellValue.getCellType()) {
                    case STRING:
                        return cellValue.getStringValue();
                    case NUMERIC:
                        return String.valueOf(cellValue.getNumberValue());
                    case BOOLEAN:
                        return String.valueOf(cellValue.getBooleanValue());
                    default:
                        return "";
                }
            case BLANK:
                return "";
            default:
                return "";
        }
    }

    // Thêm phương thức tiện ích để lấy giá trị int từ Cell
    private static Integer getCellIntValue(Cell cell) {
        if (cell == null) return null;
        switch (cell.getCellType()) {
            case NUMERIC:
                return (int) cell.getNumericCellValue();
            case STRING:
                try {
                    return Integer.parseInt(cell.getStringCellValue());
                } catch (NumberFormatException e) {
                    return null;
                }
            default:
                return null;
        }
    }
}
