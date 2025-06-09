package com.restaurent.restaurant_app.service.impl;

import com.restaurent.restaurant_app.dto.EmployeeDTO;
import com.restaurent.restaurant_app.model.Employee;
import com.restaurent.restaurant_app.repository.EmployeeRepository;
import com.restaurent.restaurant_app.service.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class EmployeeServiceimp implements EmployeeService {
    private final EmployeeRepository repo;

    @Override
    public Employee createEmployee(EmployeeDTO dto) {
        Employee emp = new Employee();
        emp.setCode(dto.getCode());
        emp.setFullname(dto.getFullname());
        emp.setEmail(dto.getEmail());
        emp.setAddress(dto.getAddress());
        emp.setPhone(dto.getPhone());
        emp.setDob(dto.getDob());
        emp.setBirthplace(dto.getBirthplace());
        emp.setCmnd(dto.getCmnd());
        emp.setCmndDate(dto.getCmndDate());
        emp.setCmndPlace(dto.getCmndPlace());
        emp.setGender(dto.getGender());
        emp.setPosition(dto.getPosition());
        emp.setDergee(dto.getDergee());
        emp.setMarial(dto.getMarial());
        emp.setAvatarUrl(dto.getAvatarUrl());
        return repo.save(emp);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    @Override
    public Employee updateEmployeeById(Long id, EmployeeDTO dto) {
        Employee emp = repo.findById(id).orElseThrow();
        
        emp.setCode(dto.getCode());
        emp.setFullname(dto.getFullname());
        emp.setEmail(dto.getEmail());
        emp.setAddress(dto.getAddress());
        emp.setPhone(dto.getPhone());
        emp.setDob(dto.getDob());
        emp.setBirthplace(dto.getBirthplace());
        emp.setCmnd(dto.getCmnd());
        emp.setCmndDate(dto.getCmndDate());
        emp.setCmndPlace(dto.getCmndPlace());
        emp.setGender(dto.getGender());
        emp.setPosition(dto.getPosition());
        emp.setDergee(dto.getDergee());
        emp.setMarial(dto.getMarial());
        emp.setAvatarUrl(dto.getAvatarUrl());
        return repo.save(emp);
    }

    @Override
    public void deleteEmployee(Long id) {
        repo.deleteById(id);
    }

    @Override
    public void deleteAll() {
        repo.deleteAll();
    }

    @Override
    public void createAllEmployees(List<EmployeeDTO> employees) {
        for (EmployeeDTO dto : employees) {
            createEmployee(dto);
        }
    }
}
