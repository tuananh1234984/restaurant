package com.restaurent.restaurant_app.dto;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EmployeeDTO {
    private Long id;
    private String code;
    private String fullname;
    private String email;
    private String address;
    private String phone;
    private String dob;
    private String birthplace;
    private String cmnd;
    private String cmndDate;
    private String cmndPlace;
    private String gender;
    private String position;
    private String dergee;
    private String marial;
    private String avatarUrl;
}
