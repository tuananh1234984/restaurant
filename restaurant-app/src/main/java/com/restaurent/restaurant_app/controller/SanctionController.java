package com.restaurent.restaurant_app.controller;

import com.restaurent.restaurant_app.dto.SanctionDTO;
import com.restaurent.restaurant_app.model.Sanction;
import com.restaurent.restaurant_app.service.SanctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequiredArgsConstructor

public class SanctionController {
    private final SanctionService sanctionService;

    @PostMapping("/sanction")
    public Sanction createSanction(@RequestBody SanctionDTO dto) {
        return sanctionService.createSanction(dto);
    }

    @GetMapping("/sanction")
    public List<Sanction> getAllSanction() {
        return sanctionService.getAllSanction();
    }

    @PutMapping("/sanction/{id}")
    public Sanction updateSanction(@PathVariable Long id, @RequestBody SanctionDTO dto) {
        return sanctionService.updateSanction(id, dto);
    }

    @DeleteMapping("/sanction/{id}")
    public void deleteSanction(@PathVariable Long id) {
        sanctionService.deleteSanction(id);
    }
}
