package com.example.backend.controller;
import com.example.backend.service.OtpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/otp")
@CrossOrigin(origins = "http://localhost:3000")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private JavaMailSender mailSender;


    // Generate OTP and Send Email
    @PostMapping("/generate")
    public ResponseEntity<?> generateOtp(@RequestBody Map<String, String> request) {

        try {

            String email = request.get("email");

            String otp = otpService.generateOtp(email);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Email Verification OTP");
            message.setText("Your OTP is: " + otp + "\nThis OTP is valid for 2 minutes.");

            mailSender.send(message);

            return ResponseEntity.ok("OTP Sent Successfully");

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest().body("Error sending OTP");
        }
    }


    // Verify OTP
    @PostMapping("/verify")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String, String> request) {

        String email = request.get("email");
        String otp = request.get("otp");

        boolean valid = otpService.validateOtp(email, otp);

        if (valid) {
            return ResponseEntity.ok("OTP Verified");
        } else {
            return ResponseEntity.badRequest().body("Invalid or Expired OTP");
        }
    }
}