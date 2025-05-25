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

    @Override
    public Sanction updateSanction(Long id, SanctionDTO dto) {
        Sanction sanction = repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Sanction not found"));
        sanction.setFullname(dto.getFullname());
        sanction.setDob(dto.getDob());
        sanction.setPosition(dto.getPosition());
        sanction.setReason(dto.getReason());
        sanction.setStatus(dto.getStatus());
        return repository.save(sanction);
    }

    @Override
    public void deleteAll() {
        repository.deleteAll();
    }

    @Override
    public void createAllSanctions(List<SanctionDTO> sanctions) {
        for (SanctionDTO dto : sanctions) {
            createSanction(dto);
        }
    }
}
