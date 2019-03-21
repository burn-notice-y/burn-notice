package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.LoggedInUser;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
public class RetrieveUser {

    private final UserRepository userDao;

    public RetrieveUser(UserRepository userDao){
        this.userDao = userDao;
    }

    @GetMapping("/api/logged-user")
    public LoggedInUser sendUsers(HttpServletRequest request){
        HttpSession session = request.getSession();
        if (session.getAttribute("authUser") != null){
            User loggedInUser = (User) session.getAttribute("authUser");
            return userDao.findUserBySap(loggedInUser.getSap());
        }
        return null;
    }
}






