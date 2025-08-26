package com.ecommerceApp.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

//    public void sendOtpEmail(String toEmail, String subject, String otp) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setSubject(subject);
//        message.setText("Your OTP is: " + otp);
//        mailSender.send(message);
//    }

    public void sendOtpEmail(String toEmail, String subject, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);

        String emailText = "Hello,\n\n"
                + "We received a request to verify your account on Trendify.\n\n"
                + "🔑 Your One-Time Password (OTP) is: " + otp + "\n\n"
                + "⚠️ This OTP is valid for the next 10 minutes only. Please do not share it with anyone for security reasons.\n\n"
                + "If you did not request this verification, please ignore this email.\n\n"
                + "Best Regards,\n"
                + "The Trendify Security Team\n";

        message.setText(emailText);
        mailSender.send(message);
    }

}

