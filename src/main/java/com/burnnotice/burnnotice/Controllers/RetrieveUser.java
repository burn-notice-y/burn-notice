package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class RetrieveUser {

    @GetMapping("/api/logged-user")
    public User sendUsers(HttpServletRequest request){
        HttpSession session = request.getSession();
        if (session.getAttribute("authUser") != null){
            return (User) session.getAttribute("authUser");
        }
        return null;
    }
}






