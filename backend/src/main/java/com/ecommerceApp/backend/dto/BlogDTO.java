package com.ecommerceApp.backend.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BlogDTO {
    private String id;
    private String image;
    private String name;
    private String description;
}
