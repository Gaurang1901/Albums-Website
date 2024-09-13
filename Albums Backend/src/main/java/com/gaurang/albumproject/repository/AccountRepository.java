package com.gaurang.albumproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaurang.albumproject.model.Account;


public interface AccountRepository extends JpaRepository<Account, Long>{

    Optional<Account> findByEmail(String email);
    
}
