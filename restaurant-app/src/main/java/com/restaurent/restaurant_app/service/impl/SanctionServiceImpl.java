package com.restaurent.restaurant_app.service.impl;

import com.restaurent.restaurant_app.dto.SanctionDTO;
import com.restaurent.restaurant_app.model.Sanction;
import com.restaurent.restaurant_app.repository.SanctionRepository;
import com.restaurent.restaurant_app.service.SanctionService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class SanctionServiceImpl implements SanctionService {
    private final SanctionRepository repository;

    @Override
    public Sanction createSanction(SanctionDTO dto) {
        Sanction sanction = Sanction.builder()
                .fullname(dto.getFullname())
                .dob(dto.getDob())
                .position(dto.getPosition())
                .reason(dto.getReason())
                .status(dto.getStatus())
                .build();
        return repository.save(sanction);
    }
    @Override
    public List<Sanction> getAllSanction() {
        return repository.findAll();
    }
    @Override
    public void deleteSanction(Long id) {
        repository.deleteById(id);
    }
}
