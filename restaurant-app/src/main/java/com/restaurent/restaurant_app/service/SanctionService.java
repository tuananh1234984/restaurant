package com.restaurent.restaurant_app.service;

import com.restaurent.restaurant_app.dto.SanctionDTO;
import com.restaurent.restaurant_app.model.Sanction;

import java.util.List;

public interface SanctionService {
    Sanction createSanction(SanctionDTO dto);
    List<Sanction> getAllSanction();
    void deleteSanction(Long id);
    Sanction updateSanction(Long id, SanctionDTO dto);
}
