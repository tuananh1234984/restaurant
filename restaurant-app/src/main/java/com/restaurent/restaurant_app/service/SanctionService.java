package com.restaurent.restaurant_app.service;

import java.util.List;
import com.restaurent.restaurant_app.dto.SanctionDTO;
import com.restaurent.restaurant_app.model.Sanction;

public interface SanctionService {
    Sanction createSanction(SanctionDTO dto);
    void createAllSanctions(List<SanctionDTO> sanctions);
    List<Sanction> getAllSanction();
    void deleteSanction(Long id);
    Sanction updateSanction(Long id, SanctionDTO dto);
    // Tải tất cả dữ liệu xử phạt
    void deleteAll();

}


