package com.example.backend.service;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static class OtpData {

        String otp;
        LocalDateTime expiryTime;

        OtpData(String otp, LocalDateTime expiryTime) {
            this.otp = otp;
            this.expiryTime = expiryTime;
        }
    }

    private Map<String, OtpData> otpStorage = new ConcurrentHashMap<>();


    // Generate OTP
    public String generateOtp(String email) {

        String otp = String.format("%06d", new Random().nextInt(999999));

        LocalDateTime expiry = LocalDateTime.now().plusMinutes(2);

        otpStorage.put(email, new OtpData(otp, expiry));

        return otp;
    }


    // Validate OTP
    public boolean validateOtp(String email, String otp) {

        OtpData data = otpStorage.get(email);

        if (data == null) {
            return false;
        }

        if (LocalDateTime.now().isAfter(data.expiryTime)) {
            otpStorage.remove(email);
            return false;
        }

        if (data.otp.equals(otp)) {
            otpStorage.remove(email);
            return true;
        }

        return false;
    }
}