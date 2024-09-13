package com.gaurang.albumproject.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(originPatterns = {"https://digitalphotoalbum.vercel.app/","http://localhost:3000"}, maxAge = 3600) 
public class HomeController {

    @GetMapping("/api/v1")
    public String demo(){
        return "Hello From Gaurang!";
    }

    
}
