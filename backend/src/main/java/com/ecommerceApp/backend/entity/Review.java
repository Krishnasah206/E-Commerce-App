package com.ecommerceApp.backend.entity;

import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {
    private String customerId;
    private String reviewText;
    private LocalDate date;
}

