package com.restaurent.restaurant_app.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sanction")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Sanction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String fullname;
    private String dob;
    private String position;
    private String reason;
    private String status;

}