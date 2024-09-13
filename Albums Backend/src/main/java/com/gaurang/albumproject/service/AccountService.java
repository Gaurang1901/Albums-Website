package com.gaurang.albumproject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gaurang.albumproject.model.Account;
import com.gaurang.albumproject.model.PasswordResetToken;
import com.gaurang.albumproject.repository.AccountRepository;
import com.gaurang.albumproject.repository.PasswordResetTokenRepository;
import com.gaurang.albumproject.util.constants.Authority;

@Service
public class AccountService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    public Account save(Account account) {
        account.setPassword(passwordEncoder.encode(account.getPassword()));
        if (account.getAuthorities() == null) {
            account.setAuthorities(Authority.USER.toString());
        }
        return accountRepository.save(account);

    }

    public List<Account> findall() {

        return accountRepository.findAll();

    }

    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);

    }

    public Optional<Account> findByID(long id) {
        return accountRepository.findById(id);

    }

    public void deleteByID(long id) {
        accountRepository.deleteById(id);
    }

    public void updatePassword(Account account, String password) {
        account.setPassword(passwordEncoder.encode(password));
        accountRepository.save(account);
    }

    public void sendResetPasswordEmail(Account account) {
        String token = UUID.randomUUID().toString();
        Date expiryDate = calculateExpiryDate();

        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setAccount(account);
        passwordResetToken.setToken(token);
        passwordResetToken.setExpiryDate(expiryDate);
        passwordResetTokenRepository.save(passwordResetToken);

        sendEmail(account.getEmail(), "Password Reset Mail",
                "Click the following link to reset your password: http://localhost:3000/reset-password?token="
                        + token);
    }

    private Date calculateExpiryDate() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 10);
        return cal.getTime();
    }

    private void sendEmail(String to, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setTo(to);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);

        javaMailSender.send(mailMessage);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Account> optionaAccount = accountRepository.findByEmail(email);
        if (!optionaAccount.isPresent()) {
            throw new UsernameNotFoundException("Account not found");
        }
        Account account = optionaAccount.get();

        List<GrantedAuthority> grantedAuthoriy = new ArrayList<>();
        grantedAuthoriy.add(new SimpleGrantedAuthority(account.getAuthorities()));
        return new User(account.getEmail(), account.getPassword(), grantedAuthoriy);
    }

}
