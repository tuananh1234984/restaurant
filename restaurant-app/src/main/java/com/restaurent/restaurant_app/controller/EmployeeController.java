package com.restaurent.restaurant_app.controller;

import com.restaurent.restaurant_app.dto.EmployeeDTO;
import com.restaurent.restaurant_app.model.Employee;
import com.restaurent.restaurant_app.service.EmployeeService;
import com.restaurent.restaurant_app.util.ExcelEmployeeParser;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/auth/employees")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor

public class EmployeeController {
    private final EmployeeService employeeService;

    @PostMapping
    public Employee createEmployee(@RequestBody EmployeeDTO dto) {
        return employeeService.createEmployee(dto);
    }

    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PutMapping("/{id}")
    public Employee updateEmployeeById(@PathVariable Long id, @RequestBody EmployeeDTO dto) {
        return employeeService.updateEmployeeById(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAll() {
        employeeService.deleteAll();
        return ResponseEntity.noContent().build();
    }

    @PostMapping("api/auth/employees/upload")
    public ResponseEntity<?> uploadEmployeeFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        try (InputStream is = file.getInputStream()) {
            List<EmployeeDTO> employees = ExcelEmployeeParser.parse(is); // Bạn cần tự viết class này
            employeeService.createAllEmployees(employees); // Thêm hàm này vào service
            return ResponseEntity.ok(employeeService.getAllEmployees());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi xử lý file: " + e.getMessage());
        }
    }
}
