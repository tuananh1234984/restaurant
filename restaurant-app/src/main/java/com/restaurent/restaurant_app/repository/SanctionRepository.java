package com.restaurent.restaurant_app.repository;
import com.restaurent.restaurant_app.model.Sanction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SanctionRepository extends JpaRepository<Sanction, Long> {
} 
