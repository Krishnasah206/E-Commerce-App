package com.ecommerceApp.backend.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private ObjectId id;

    @NonNull
    @Indexed(unique = true)
    private String userName;

    private String email;

    @NonNull
    private String password;

    @Builder.Default
    private Set<String> roles = new HashSet<>(); // ROLE_USER, ROLE_ADMIN
}

