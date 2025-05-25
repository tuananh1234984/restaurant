package com.restaurent.restaurant_app.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class SanctionDTO {
    private String fullname;
    private String dob;
    private String position;
    private String reason;
    private String status;
    private BigDecimal amount; // Thêm trường amount nếu cần thiết
    private String name; // Thêm trường name nếu cần thiết
}
