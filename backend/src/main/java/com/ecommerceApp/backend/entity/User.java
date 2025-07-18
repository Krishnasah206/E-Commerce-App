package com.ecommerceApp.backend.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
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

    @NonNull
    private String email;

    @NonNull
    private String phoneNumber;

    @NonNull
    private String password;

    @Builder.Default
    private Set<String> roles = new HashSet<>(); // USER, ADMIN

    @Field("otp")
    private String otp;

    @Field("otpExpiry")
    private LocalDateTime otpExpiry;

    @Field("isVerified")
    private boolean isVerified = false;

}

