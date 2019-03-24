package com.burnnotice.burnnotice.Controllers;


import com.burnnotice.burnnotice.Models.User;
import com.burnnotice.burnnotice.Repositories.OnlyNames;
import com.burnnotice.burnnotice.Repositories.UserRepository;
import com.burnnotice.burnnotice.util.Password;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@SessionAttributes("user")
public class LoginController {

    private final UserRepository userDao;

    public LoginController(UserRepository userDao) {
        this.userDao = userDao;
    }

    @RequestMapping("/api/login")
    public void checkUser(@RequestParam("sap") String sap, @RequestParam("password") String password, HttpServletRequest request) {
        HttpSession session = request.getSession();
        User comparingUser = userDao.getUserBySap(sap);

        if(Password.check(password, comparingUser.getPassword())) {
            session.setAttribute("authUser", comparingUser);
        } else {
            throw new RuntimeException("invalid entry");
        }
    }

    @RequestMapping("/api/logout")
    public void checkoutUser(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();
    }
    @GetMapping("/api/all-users")
    public Iterable<OnlyNames> sendAllUsers(){
        return userDao.findAllByChiefFalse();
    }

    @PostMapping("/api/edit-profile")
    public void editProfile(@RequestBody User editedUser){
        User dbUser = userDao.findOne(editedUser.getId());
        dbUser.setFirstName(editedUser.getFirstName());
        dbUser.setLastName(editedUser.getLastName());
        dbUser.setEmail(editedUser.getEmail());
        userDao.save(dbUser);
    }
}


