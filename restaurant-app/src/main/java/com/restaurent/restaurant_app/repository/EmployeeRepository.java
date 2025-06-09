package com.restaurent.restaurant_app.repository;

import com.restaurent.restaurant_app.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
