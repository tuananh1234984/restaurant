package com.restaurent.restaurant_app.util;

import com.restaurent.restaurant_app.dto.EmployeeDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ExcelEmployeeParser {

    public static List<EmployeeDTO> parse(InputStream is) {
        List<EmployeeDTO> employees = new ArrayList<>();
        try (Workbook workbook = new XSSFWorkbook(is)) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            // Đọc header
            if (rows.hasNext()) rows.next();

            while (rows.hasNext()) {
                Row row = rows.next();
                EmployeeDTO emp = new EmployeeDTO();

                emp.setCode(getCellString(row, 0));
                emp.setFullname(getCellString(row, 1));
                emp.setEmail(getCellString(row, 2));
                emp.setAddress(getCellString(row, 3));
                emp.setPhone(getCellString(row, 4));
                emp.setDob(getCellString(row, 5));
                emp.setBirthplace(getCellString(row, 6));
                emp.setCmnd(getCellString(row, 7));
                emp.setCmndDate(getCellString(row, 8));
                emp.setCmndPlace(getCellString(row, 9));
                emp.setGender(getCellString(row, 10));
                emp.setPosition(getCellString(row, 11));
                emp.setDergee(getCellString(row, 12));
                emp.setMarial(getCellString(row, 13));
                emp.setAvatarUrl(getCellString(row, 14));

                employees.add(emp);
            }
        } catch (Exception e) {
            throw new RuntimeException("Lỗi đọc file Excel: " + e.getMessage(), e);
        }
        return employees;
    }

    private static String getCellString(Row row, int idx) {
        Cell cell = row.getCell(idx, Row.MissingCellPolicy.CREATE_NULL_AS_BLANK);
        cell.setCellType(CellType.STRING);
        return cell.getStringCellValue().trim();
    }
}
