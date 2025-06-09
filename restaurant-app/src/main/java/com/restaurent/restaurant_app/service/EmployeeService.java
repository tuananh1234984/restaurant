package com.restaurent.restaurant_app.service;

import java.util.List;

import com.restaurent.restaurant_app.dto.EmployeeDTO;
import com.restaurent.restaurant_app.model.Employee;

public interface EmployeeService {
    Employee createEmployee(EmployeeDTO dto);
    List<Employee> getAllEmployees();
    Employee updateEmployeeById(Long id, EmployeeDTO dto);
    void deleteEmployee(Long id);
    void deleteAll();
    void createAllEmployees(List<EmployeeDTO> employees);
}
