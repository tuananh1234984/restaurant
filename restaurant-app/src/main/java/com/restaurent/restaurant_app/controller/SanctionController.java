package com.restaurent.restaurant_app.controller;

import com.restaurent.restaurant_app.dto.SanctionDTO;
import com.restaurent.restaurant_app.model.Sanction;
import com.restaurent.restaurant_app.service.SanctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.io.InputStream;
import com.restaurent.restaurant_app.util.ExcelSanctionParser;
import org.springframework.http.HttpStatus;

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


    @DeleteMapping("/sanction/all")
    public ResponseEntity<?> deleteAllSanctions() {
        sanctionService.deleteAll();
        return ResponseEntity.ok("Đã xóa tất cả các dữ liệu xử phạt");
    }

    @DeleteMapping("/sanction/{id}")
    public void deleteSanction(@PathVariable Long id) {
        sanctionService.deleteSanction(id);
    }

    @PostMapping("/sanction/upload")
    public ResponseEntity<?> uploadSanctionFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("File is empty");
        }
        try (InputStream is = file.getInputStream()) {
            List<SanctionDTO> sanctions = ExcelSanctionParser.parse(is); // Bạn cần tự viết class này
            sanctionService.createAllSanctions(sanctions); // Thêm hàm này vào service
            return ResponseEntity.ok("Upload thành công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi xử lý file: " + e.getMessage());
        }
    }
}
