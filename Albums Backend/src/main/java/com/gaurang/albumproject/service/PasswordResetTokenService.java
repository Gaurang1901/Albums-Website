package com.gaurang.albumproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaurang.albumproject.model.PasswordResetToken;
import com.gaurang.albumproject.repository.PasswordResetTokenRepository;

@Service
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    public void deleteToken(PasswordResetToken token) {
        passwordResetTokenRepository.delete(token);
    }

    public PasswordResetToken findByToken(String token){
        return passwordResetTokenRepository.findByToken(token);
    }

}
