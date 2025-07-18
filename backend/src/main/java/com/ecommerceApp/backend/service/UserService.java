package com.ecommerceApp.backend.service;

import com.ecommerceApp.backend.config.JwtUtil;
import com.ecommerceApp.backend.dto.ApiResponse;
import com.ecommerceApp.backend.dto.LoginResponse;
import com.ecommerceApp.backend.entity.User;
import com.ecommerceApp.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    @Autowired
    private EmailService emailService;

    // ✅ Register User + Send OTP
    public ResponseEntity<ApiResponse> register(User request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "User already exists with this email"));
        }

        request.setPassword(encoder.encode(request.getPassword()));

        if (request.getRoles() == null || request.getRoles().isEmpty()) {
            request.setRoles(Set.of("ROLE_USER"));
        }

        String otp = String.format("%06d", new Random().nextInt(999999));
        request.setOtp(otp);
        request.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        request.setVerified(false);

        userRepository.save(request);
        emailService.sendOtpEmail(request.getEmail(), "Verify Your Email", otp);

        return ResponseEntity.ok(new ApiResponse(true, "Registered. Please verify OTP sent to email."));
    }

    // ✅ Login User (No OTP check)
    public ResponseEntity<LoginResponse> login(String loginField, String password) {
        Optional<User> userOpt = userRepository.findByUserName(loginField);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(loginField);
        }

        if (userOpt.isEmpty() || !encoder.matches(password, userOpt.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(null, null, null, "Invalid credentials"));
        }

        User user = userOpt.get();

        if (!user.isVerified()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(null, null, null, "Account not verified. Please check your email."));
        }


        // ✅ Skip OTP check — allow login regardless of verification status
        String token = jwtUtil.generateToken(user.getUserName());

        return ResponseEntity.ok(new LoginResponse(
                user.getUserName(),
                user.getId().toHexString(),
                token,
                "Login successful"
        ));
    }

    public ResponseEntity<ApiResponse> verifyOtp(String email, String otp) {
        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();

            if (otp != null &&
                    user.getOtp() != null &&
                    otp.trim().equals(user.getOtp().trim()) &&
                    user.getOtpExpiry() != null &&
                    user.getOtpExpiry().isAfter(LocalDateTime.now())) {

                user.setVerified(true);
                // 🛑 Don't clear OTP or expiry here
                userRepository.save(user);

                return ResponseEntity.ok(new ApiResponse(true, "OTP verified successfully."));
            }
        }

        return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid or expired OTP."));
    }


    // ✅ OTP Verification
//    public ResponseEntity<ApiResponse> verifyOtp(String email, String otp) {
//        Optional<User> userOpt = userRepository.findByEmail(email);
//
//        if (userOpt.isPresent()) {
//            User user = userOpt.get();
//
//            if (otp.equals(user.getOtp()) && user.getOtpExpiry().isAfter(LocalDateTime.now())) {
//                user.setVerified(true);
//                user.setOtp(null);
//                user.setOtpExpiry(null);
//                userRepository.save(user);
//
//                return ResponseEntity.ok(new ApiResponse(true, "OTP verified successfully."));
//            }
//        }
//
//        return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid or expired OTP."));
//    }

    public ResponseEntity<ApiResponse> resendOtp(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email not found"));
        }

        User user = userOpt.get();
        String otp = String.format("%06d", new Random().nextInt(999999));
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        emailService.sendOtpEmail(email, "Resend OTP", otp);
        return ResponseEntity.ok(new ApiResponse(true, "OTP resent successfully."));
    }

    public ResponseEntity<ApiResponse> forgotPassword(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email not found"));
        }

        User user = userOpt.get();
        String otp = String.format("%06d", new Random().nextInt(999999));
        user.setOtp(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        emailService.sendOtpEmail(email, "Reset Password OTP", otp);
        return ResponseEntity.ok(new ApiResponse(true, "OTP sent to email for password reset."));
    }


    public ResponseEntity<ApiResponse> resetPassword(String email, String otp, String newPassword, String confirmPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Email not found"));
        }

        User user = userOpt.get();

        // 🚫 Check if passwords match
        if (newPassword == null || confirmPassword == null || !newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, "Passwords do not match."));
        }

        // ✅ Check OTP validity
        if (user.getOtp() != null &&
                otp != null &&
                otp.trim().equals(user.getOtp().trim()) &&
                user.getOtpExpiry() != null &&
                user.getOtpExpiry().isAfter(LocalDateTime.now())) {

            user.setPassword(encoder.encode(newPassword));
            user.setOtp(null);
            user.setOtpExpiry(null);
            userRepository.save(user);

            return ResponseEntity.ok(new ApiResponse(true, "Password reset successfully."));
        }

        return ResponseEntity.badRequest().body(new ApiResponse(false, "Invalid or expired OTP."));
    }

}
